const fs = require('fs');
const path = 'd:\\Mipac Tvet\\Modul ADAS\\i18n.js';
let content = fs.readFileSync(path, 'utf8');

const newTranslations = `
        "Kuiz Penilaian Kendiri": "Self-Assessment Quiz",
        "Rajah Pendawaian Sistem": "System Wiring Diagram",
        "Buku Log Diagnostik": "Diagnostic Log Book",
        "Glosari Automotif Pintar": "Smart Automotive Glossary",
        "Seterusnya: Modul Teori ADAS →": "Next: ADAS Theory Module →",
        "Seterusnya: Rajah Pendawaian →": "Next: Wiring Diagram →",
        "Seterusnya: Buku Log Diagnostik →": "Next: Diagnostic Log Book →",
        "Seterusnya: Kuiz Penilaian Kendiri →": "Next: Self-Assessment Quiz →",
        "Seterusnya: Glosari Automotif Pintar →": "Next: Smart Automotive Glossary →",
        "<i class=\\"fa-solid fa-rotate-left\\"></i> Kembali ke Simulator": "<i class=\\"fa-solid fa-rotate-left\\"></i> Back to Simulator",
        "Borang Pemerhatian Amali (Job Card)": "Practical Observation Form (Job Card)",
        "Nama Pelatih": "Trainee Name",
        "No. Pendaftaran": "Registration No.",
        "Keputusan Pengujian AEB (Ultrasonic)": "AEB (Ultrasonic) Test Results",
        "-- Sila Pilih Keputusan --": "-- Please Select Result --",
        "Berjaya berhenti pada jarak selamat (< 50cm)": "Successfully stopped at safe distance (< 50cm)",
        "Sistem gagal bertindak balas": "System failed to respond",
        "Tindak balas lambat": "Delayed response",
        "Keputusan Pengesanan Papan Tanda (HuskyLens QR)": "Traffic Sign Detection Results (HuskyLens QR)",
        "Jawapan Soalan Refleksi": "Reflection Question Answer",
        "Jana & Cetak Job Card PDF": "Generate & Print Job Card PDF",
        "Padam": "Clear",
        "Cari terma atau singkatan (Cth: AEB, PWM)...": "Search terms or acronyms (e.g., AEB, PWM)...",
        "Sistem bantuan pemandu termaju yang menggunakan sensor dan kamera untuk meningkatkan keselamatan dan kelancaran pemanduan.": "Advanced driver assistance systems using sensors and cameras to improve safety and driving smoothness.",
        "Sistem brek kecemasan automatik yang menghentikan kenderaan jika pengesan mendapati perlanggaran hampir berlaku.": "Autonomous emergency braking system that stops the vehicle if sensors detect an imminent collision.",
        "Sistem pengecaman papan tanda jalan raya. Dalam projek ini, ia disimulasikan menggunakan pengimbas kod QR HuskyLens.": "Traffic sign recognition system. In this project, it is simulated using HuskyLens QR code scanner.",
        "Sistem amaran keluar lorong. Memberi amaran jika kenderaan tersasar dari garisan putih tanpa signal.": "Lane departure warning system. Alerts if the vehicle strays from the white line without a signal.",
        "Pemantauan titik buta. Mengesan kenderaan di kawasan yang tidak kelihatan pada cermin sisi.": "Blind spot monitoring. Detects vehicles in areas not visible in the side mirrors.",
        "'Otak' elektronik kenderaan (seperti Arduino) yang memproses maklumat dari penderia untuk mengawal penggerak mekanikal.": "Electronic 'brain' of the vehicle (e.g. Arduino) that processes sensor info to control mechanical actuators.",
        "Teknik mengawal kuasa elektrik dengan menghidupkan dan mematikan isyarat dengan pantas. Digunakan untuk mengawal kelajuan motor DC.": "Electrical power control technique by rapidly turning signals on and off. Used to control DC motor speed.",
        "Protokol komunikasi berwayar dua pin (SDA & SCL). Digunakan untuk menghantar data penglihatan dari HuskyLens ke ECU.": "Two-wire communication protocol (SDA & SCL). Used to transmit vision data from HuskyLens to ECU.",
        "Anggaran masa sebelum perlanggaran berlaku. Dikira menggunakan formula: TTC = Jarak (m) / Kelajuan (m/s). Jika TTC < 1.0s, AEB diaktifkan.": "Estimated time before collision. Calculated as: TTC = Distance (m) / Speed (m/s). If TTC < 1.0s, AEB is activated.",
        "Rangkaian komunikasi standard kenderaan moden yang membenarkan modul-modul elektronik (ECU) berbeza berhubung antara satu sama lain.": "Standard communication network for modern vehicles allowing different electronic modules (ECU) to communicate.",
`;

const insertIndex = content.indexOf('"en": {') + 7;
if (insertIndex !== 6) {
    content = content.substring(0, insertIndex) + '\n' + newTranslations + content.substring(insertIndex);
    fs.writeFileSync(path, content, 'utf8');
    console.log('Translations successfully updated in i18n.js!');
} else {
    console.log('Could not find translation dictionary in i18n.js');
}
