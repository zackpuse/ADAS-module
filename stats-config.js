/* ==========================================================================
   SMARTLINE QR ROVER - MODUL STATISTIK PdP & GOOGLE SHEETS SYNC
   ========================================================================== */

const ADAS_STORAGE_KEY = 'adas_quiz_records';
const ADAS_SHEET_URL_KEY = 'adas_google_script_url';

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
    const scriptUrl = localStorage.getItem(ADAS_SHEET_URL_KEY);
    if (scriptUrl && scriptUrl.trim().startsWith('http')) {
        try {
            console.log('[Statistik ADAS] Menghantar ke Google Sheets...');
            await fetch(scriptUrl.trim(), {
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

// Tarik data daripada Google Sheets (untuk papan pemuka statistik)
window.tarikDataGoogleSheets = async function(customUrl) {
    const scriptUrl = customUrl || localStorage.getItem(ADAS_SHEET_URL_KEY);
    if (!scriptUrl || !scriptUrl.trim().startsWith('http')) {
        return {
            success: false,
            message: 'URL Google Sheet belum dikonfigurasi.',
            data: getAdasLocalRecords(),
            source: 'local'
        };
    }

    try {
        const response = await fetch(scriptUrl.trim(), {
            method: 'GET',
            headers: { 'Accept': 'application/json' }
        });
        
        if (!response.ok) {
            throw new Error(`HTTP Error: ${response.status}`);
        }
        
        const data = await response.json();
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
        console.warn('Gagal memuat turun dari Google Sheets, menggunakan data tempatan:', err);
        return {
            success: false,
            message: 'Tidak dapat berhubung dengan Google Sheets (' + err.message + '). Memaparkan data tempatan.',
            data: getAdasLocalRecords(),
            source: 'local'
        };
    }
};
