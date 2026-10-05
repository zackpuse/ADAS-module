# 📊 PANDUAN PENTADBIR: SISTEM STATISTIK & KEPUTUSAN KUIZ ADAS

Dokumen ini mengandungi maklumat penting dan pautan capaian rahsia untuk semakan data statistik modul **SmartLine QR Rover (Modul ADAS)**.

---

## 🔗 Pautan Semakan Data & Dashboard Statistik

| Perkara | Pautan Capaian | Keterangan |
| :--- | :--- | :--- |
| **🌐 Laman Statistik Online (GitHub)** | [https://zackpuse.github.io/ADAS-module/stats.html](https://zackpuse.github.io/ADAS-module/stats.html) | Pautan rahsia untuk semakan visual data, graf gred, dan nisbah kelulusan secara online. |
| **💻 Laman Statistik Tempatan (Local)** | [`stats.html`](file:///d:/Mipac%20Tvet/Modul%20ADAS/stats.html) | Buka terus fail ini di browser komputer anda jika bekerja secara offline. |
| **📑 Google Spreadsheet Sebenar** | [Helaian Google Sheets (Klik Sini)](https://docs.google.com/spreadsheets/d/1gm01nOcXAatOD5dQspxTWbU6LhRjodtgNBfP8s6JNCw/edit) | Pangkalan data awan di Google Drive yang mengumpul rekod markah pelajar. |
| **⚙️ Google Apps Script Web App** | [Web App Endpoint (/exec)](https://script.google.com/macros/s/AKfycbwgnDAkEYwn03slsFaVr2HbG3yBVy_VV4Pb5TjuerGJg3JIElmprVNU2oK0MCBrYGAp/exec) | Jambatan API yang menghantar data daripada web browser ke Google Sheets. |
| **📚 Apps Script Library** | [Library URL](https://script.google.com/macros/library/d/1XnUFQ_87xgKe8z5FbCnlAj4eltibgw3CxbcGX6p1WAo6JZ6iHTS19gqa/1) | Rujukan library Apps Script projek. |

---

## 🔒 Keselamatan & Kerahsiaan Pautan
* Pautan ke `stats.html` **TIDAK dipaparkan pada mana-mana menu atau navigasi umum** di laman pelajar (`index.html`).
* Hanya pentadbir/penyelidik yang mempunyai URL di atas sahaja boleh membuka papan pemuka ini.

---

## 📋 Ciri-Ciri Utama di Halaman Statistik (`stats.html`)
1. **Analisis KPI Automatik:**
   - Jumlah calon yang telah selesai menduduki ujian.
   - Kadar kelulusan keseluruhan (% calon capai markah ≥ 75%).
   - Purata markah dan peratusan keseluruhan.
   - Skor tertinggi dan terendah.
2. **Graf Analisis Interaktif (Chart.js):**
   - Taburan skor calon mengikut 4 gred (Perlu Bimbingan, Sederhana, Lulus Baik, Cemerlang).
   - Nisbah Lulus vs Gagal (Doughnut Chart).
3. **Jadual Data Lengkap Calon:**
   - Senarai penuh mengandungi Tarikh & Masa, Nama Calon, Program/Kelas, Markah, Peratus, dan Status Kelulusan.
   - Fungsi Carian Pantas (Search) mengikut nama atau kelas.
   - Penapis status (Semua / Lulus Sahaja / Gagal Sahaja).
4. **Alat Pengurusan Data:**
   - **Eksport CSV / Excel:** Muat turun data untuk laporan penyelidikan atau kajian tindakan TVET.
   - **Cetak Laporan:** Format cetakan kemas untuk laporan fizikal atau simpanan fail PDF.
   - **Hantar Rekod Sedia Ada:** Memuat naik rekod ujian lama yang tersimpan di peranti tempatan ke Google Sheets secara automatik.

---

## 🛠️ Nota Penyelenggaraan
* **Memadam Data Ujian / Rekod Ujian Palsu:**
  Untuk keselamatan, API tidak membenarkan arahan pemadaman dari web. Jika anda ingin memadam mana-mana baris rekod ujian (cth: rekod *testing*), anda boleh memadam baris tersebut secara manual terus di dalam [Google Sheets](https://docs.google.com/spreadsheets/d/1gm01nOcXAatOD5dQspxTWbU6LhRjodtgNBfP8s6JNCw/edit).
