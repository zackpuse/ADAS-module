/* ==========================================================================
   SMARTLINE QR ROVER - MODUL STATISTIK PdP & GOOGLE SHEETS SYNC
   ========================================================================== */

const ADAS_STORAGE_KEY = 'adas_quiz_records';
const ADAS_SHEET_URL_KEY = 'adas_google_script_url';

// URL Google Apps Script Web App Pusat (Boleh diletakkan di sini agar semua peranti pelajar sync automatik)
const ADAS_CENTRAL_GOOGLE_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbwgnDAkEYwn03slsFaVr2HbG3yBVy_VV4Pb5TjuerGJg3JIElmprVNU2oK0MCBrYGAp/exec";

// Dapatkan URL aktif sama ada dari kod atau LocalStorage
function getActiveScriptUrl() {
    if (ADAS_CENTRAL_GOOGLE_SCRIPT_URL && ADAS_CENTRAL_GOOGLE_SCRIPT_URL.trim().startsWith('http')) {
        return ADAS_CENTRAL_GOOGLE_SCRIPT_URL.trim();
    }
    return (localStorage.getItem(ADAS_SHEET_URL_KEY) || '').trim();
}

// Dapatkan rekod dari storan tempatan
function getAdasLocalRecords() {
    try {
        const raw = localStorage.getItem(ADAS_STORAGE_KEY);
        return raw ? JSON.parse(raw) : [];
    } catch (e) {
        console.error('Ralat membaca data statistik:', e);
        return [];
    }
}

// Simpan rekod ke storan tempatan
function saveAdasLocalRecords(records) {
    try {
        localStorage.setItem(ADAS_STORAGE_KEY, JSON.stringify(records));
    } catch (e) {
        console.error('Ralat menyimpan data statistik:', e);
    }
}

// Hantar dan rekod keputusan kuiz
window.rekodKeputusanUjian = async function(record) {
    // 1. Simpan ke storan tempatan terlebih dahulu (segera)
    const records = getAdasLocalRecords();
    records.unshift(record);
    saveAdasLocalRecords(records);
    console.log('[Statistik ADAS] Rekod tempatan disimpan:', record);

    // 2. Hantar ke Google Sheets jika URL telah ditetapkan
    const scriptUrl = getActiveScriptUrl();
    if (scriptUrl && scriptUrl.startsWith('http')) {
        try {
            console.log('[Statistik ADAS] Menghantar ke Google Sheets...');
            await fetch(scriptUrl, {
                method: 'POST',
                mode: 'no-cors',
                headers: {
                    'Content-Type': 'text/plain;charset=utf-8'
                },
                body: JSON.stringify(record)
            });
            console.log('[Statistik ADAS] Berjaya dihantar ke Google Sheets!');
        } catch (err) {
            console.warn('[Statistik ADAS] Ralat penghantaran ke Google Sheets:', err);
        }
    }
};

// Tarik data daripada Google Sheets (dengan pengesahan kata laluan di pelayan)
window.tarikDataGoogleSheets = async function(customUrl, authPassword) {
    const scriptUrl = customUrl || getActiveScriptUrl();
    if (!scriptUrl || !scriptUrl.startsWith('http')) {
        return {
            success: false,
            message: 'URL Google Sheet belum dikonfigurasi.',
            data: getAdasLocalRecords(),
            source: 'local'
        };
    }

    try {
        const savedSessionKey = sessionStorage.getItem('adas_admin_session_key') || '';
        const keyToSend = authPassword || savedSessionKey;
        const separator = scriptUrl.includes('?') ? '&' : '?';
        const finalUrl = keyToSend 
            ? `${scriptUrl.trim()}${separator}auth=${encodeURIComponent(keyToSend)}` 
            : scriptUrl.trim();

        const response = await fetch(finalUrl, {
            method: 'GET',
            headers: { 'Accept': 'application/json' }
        });
        
        if (!response.ok) {
            throw new Error(`HTTP Error: ${response.status}`);
        }
        
        const resJson = await response.json();

        // Semak respons sekatan pelayan Google Apps Script
        if (resJson && resJson.success === false) {
            return {
                success: false,
                message: resJson.error || 'Akses ditolak: Kata laluan pentadbir tidak sah.',
                data: [],
                source: 'google_sheets'
            };
        }

        const data = Array.isArray(resJson) ? resJson : (resJson.data || []);
        if (Array.isArray(data)) {
            // Kemaskini rekod tempatan dengan data terkini dari Google Sheets
            if (data.length > 0) {
                saveAdasLocalRecords(data);
            }
            return {
                success: true,
                message: `Berjaya memuat turun ${data.length} rekod dari Google Sheets.`,
                data: data,
                source: 'google_sheets'
            };
        } else {
            throw new Error('Format data tidak sah');
        }
    } catch (err) {
        console.warn('Gagal berhubung dengan pelayan Google Sheets:', err);
        return {
            success: false,
            message: 'Ralat sambungan pelayan: ' + err.message,
            data: getAdasLocalRecords(),
            source: 'local'
        };
    }
};

// Segerak (push) semua data sedia ada di LocalStorage ke Google Sheets
window.segerakSemuaDataTempatanKeGoogleSheet = async function(onProgress) {
    const records = getAdasLocalRecords();
    const scriptUrl = getActiveScriptUrl();
    if (!scriptUrl || !scriptUrl.startsWith('http')) {
        return { success: false, message: 'URL Google Sheet belum dikonfigurasi.' };
    }
    if (records.length === 0) {
        return { success: false, message: 'Tiada rekod data tempatan untuk disegerakkan.' };
    }

    let successCount = 0;
    // Hantar mengikut urutan lama ke baharu supaya baris di spreadsheet tersusun mengikut masa
    const recordsToPush = [...records].reverse();

    for (let i = 0; i < recordsToPush.length; i++) {
        const r = recordsToPush[i];
        if (typeof onProgress === 'function') {
            onProgress(i + 1, recordsToPush.length);
        }
        try {
            await fetch(scriptUrl, {
                method: 'POST',
                mode: 'no-cors',
                headers: {
                    'Content-Type': 'text/plain;charset=utf-8'
                },
                body: JSON.stringify(r)
            });
            successCount++;
            // Jeda 400ms antara rekod bagi mengelakkan Google Apps Script rate limit
            await new Promise(res => setTimeout(res, 400));
        } catch (err) {
            console.error('Ralat semasa sync rekod ID ' + r.id + ':', err);
        }
    }

    return {
        success: true,
        count: successCount,
        total: recordsToPush.length,
        message: `Berjaya memuat naik ${successCount} daripada ${recordsToPush.length} rekod ke Google Sheets!`
    };
};
