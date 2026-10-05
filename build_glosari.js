const fs = require('fs');
const path = 'd:\\Mipac Tvet\\Modul ADAS\\index.html';
let content = fs.readFileSync(path, 'utf8');

const regex = /(<section id="tab-glosari" class="tab-panel">[\s\S]*?<div class="panel-header">[\s\S]*?<\/div>\s*<\/div>\s*)<div class="card card-glow" style="text-align: center; padding: 40px;">[\s\S]*?<\/div>(\s*<\/section>)/;

const glossaryHTML = `<div class="glosari-container">
                    <!-- Search Bar -->
                    <div style="margin-bottom: 25px; position: relative;">
                        <i class="fa-solid fa-search" style="position: absolute; left: 15px; top: 15px; color: var(--text-muted);"></i>
                        <input type="text" id="glosari-search" placeholder="Cari terma atau singkatan (Cth: AEB, PWM)..." 
                            style="width: 100%; padding: 12px 12px 12px 40px; border-radius: 8px; border: 1px solid var(--border-color); background: var(--bg-dark); color: white; font-size: 1rem;"
                            onkeyup="filterGlosari()">
                    </div>

                    <!-- Glossary Grid -->
                    <div class="glosari-grid" id="glosari-list">
                        
                        <!-- ADAS -->
                        <div class="glosari-card card card-glow" data-term="adas advanced driver assistance systems">
                            <div class="card-header" style="border-bottom: 1px dashed var(--border-color); padding-bottom: 10px;">
                                <h3 style="color: var(--color-cyan); margin: 0;">ADAS</h3>
                                <small style="color: var(--text-muted); font-style: italic;">Advanced Driver Assistance Systems</small>
                            </div>
                            <div class="card-body" style="padding-top: 15px;">
                                <p style="font-size: 0.9rem; color: var(--text-secondary); margin: 0;">Sistem bantuan pemandu termaju yang menggunakan sensor dan kamera untuk meningkatkan keselamatan dan kelancaran pemanduan.</p>
                            </div>
                        </div>

                        <!-- AEB -->
                        <div class="glosari-card card card-glow" data-term="aeb autonomous emergency braking brek">
                            <div class="card-header" style="border-bottom: 1px dashed var(--border-color); padding-bottom: 10px;">
                                <h3 style="color: var(--color-amber); margin: 0;">AEB</h3>
                                <small style="color: var(--text-muted); font-style: italic;">Autonomous Emergency Braking</small>
                            </div>
                            <div class="card-body" style="padding-top: 15px;">
                                <p style="font-size: 0.9rem; color: var(--text-secondary); margin: 0;">Sistem brek kecemasan automatik yang menghentikan kenderaan jika pengesan mendapati perlanggaran hampir berlaku.</p>
                            </div>
                        </div>

                        <!-- TSR -->
                        <div class="glosari-card card card-glow" data-term="tsr traffic sign recognition qr">
                            <div class="card-header" style="border-bottom: 1px dashed var(--border-color); padding-bottom: 10px;">
                                <h3 style="color: var(--color-green); margin: 0;">TSR</h3>
                                <small style="color: var(--text-muted); font-style: italic;">Traffic Sign Recognition</small>
                            </div>
                            <div class="card-body" style="padding-top: 15px;">
                                <p style="font-size: 0.9rem; color: var(--text-secondary); margin: 0;">Sistem pengecaman papan tanda jalan raya. Dalam projek ini, ia disimulasikan menggunakan pengimbas kod QR HuskyLens.</p>
                            </div>
                        </div>

                        <!-- LDW -->
                        <div class="glosari-card card card-glow" data-term="ldw lane departure warning garis">
                            <div class="card-header" style="border-bottom: 1px dashed var(--border-color); padding-bottom: 10px;">
                                <h3 style="color: var(--color-purple); margin: 0;">LDW</h3>
                                <small style="color: var(--text-muted); font-style: italic;">Lane Departure Warning</small>
                            </div>
                            <div class="card-body" style="padding-top: 15px;">
                                <p style="font-size: 0.9rem; color: var(--text-secondary); margin: 0;">Sistem amaran keluar lorong. Memberi amaran jika kenderaan tersasar dari garisan putih tanpa signal.</p>
                            </div>
                        </div>

                        <!-- BSM -->
                        <div class="glosari-card card card-glow" data-term="bsm blind spot monitoring titik buta">
                            <div class="card-header" style="border-bottom: 1px dashed var(--border-color); padding-bottom: 10px;">
                                <h3 style="color: var(--color-cyan); margin: 0;">BSM</h3>
                                <small style="color: var(--text-muted); font-style: italic;">Blind Spot Monitoring</small>
                            </div>
                            <div class="card-body" style="padding-top: 15px;">
                                <p style="font-size: 0.9rem; color: var(--text-secondary); margin: 0;">Pemantauan titik buta. Mengesan kenderaan di kawasan yang tidak kelihatan pada cermin sisi.</p>
                            </div>
                        </div>

                        <!-- ECU -->
                        <div class="glosari-card card card-glow" data-term="ecu electronic control unit mikropengawal arduino">
                            <div class="card-header" style="border-bottom: 1px dashed var(--border-color); padding-bottom: 10px;">
                                <h3 style="color: var(--text-primary); margin: 0;">ECU</h3>
                                <small style="color: var(--text-muted); font-style: italic;">Electronic Control Unit</small>
                            </div>
                            <div class="card-body" style="padding-top: 15px;">
                                <p style="font-size: 0.9rem; color: var(--text-secondary); margin: 0;">'Otak' elektronik kenderaan (seperti Arduino) yang memproses maklumat dari penderia untuk mengawal penggerak mekanikal.</p>
                            </div>
                        </div>

                        <!-- PWM -->
                        <div class="glosari-card card card-glow" data-term="pwm pulse width modulation kelajuan motor">
                            <div class="card-header" style="border-bottom: 1px dashed var(--border-color); padding-bottom: 10px;">
                                <h3 style="color: var(--color-amber); margin: 0;">PWM</h3>
                                <small style="color: var(--text-muted); font-style: italic;">Pulse Width Modulation</small>
                            </div>
                            <div class="card-body" style="padding-top: 15px;">
                                <p style="font-size: 0.9rem; color: var(--text-secondary); margin: 0;">Teknik mengawal kuasa elektrik dengan menghidupkan dan mematikan isyarat dengan pantas. Digunakan untuk mengawal kelajuan motor DC.</p>
                            </div>
                        </div>

                        <!-- I2C -->
                        <div class="glosari-card card card-glow" data-term="i2c inter integrated circuit komunikasi sda scl">
                            <div class="card-header" style="border-bottom: 1px dashed var(--border-color); padding-bottom: 10px;">
                                <h3 style="color: var(--color-green); margin: 0;">I2C</h3>
                                <small style="color: var(--text-muted); font-style: italic;">Inter-Integrated Circuit</small>
                            </div>
                            <div class="card-body" style="padding-top: 15px;">
                                <p style="font-size: 0.9rem; color: var(--text-secondary); margin: 0;">Protokol komunikasi berwayar dua pin (SDA & SCL). Digunakan untuk menghantar data penglihatan dari HuskyLens ke ECU.</p>
                            </div>
                        </div>

                        <!-- TTC -->
                        <div class="glosari-card card card-glow" data-term="ttc time to collision perlanggaran masa formula">
                            <div class="card-header" style="border-bottom: 1px dashed var(--border-color); padding-bottom: 10px;">
                                <h3 style="color: var(--color-red); margin: 0;">TTC</h3>
                                <small style="color: var(--text-muted); font-style: italic;">Time To Collision</small>
                            </div>
                            <div class="card-body" style="padding-top: 15px;">
                                <p style="font-size: 0.9rem; color: var(--text-secondary); margin: 0;">Anggaran masa sebelum perlanggaran berlaku. Dikira menggunakan formula: TTC = Jarak (m) / Kelajuan (m/s). Jika TTC < 1.0s, AEB diaktifkan.</p>
                            </div>
                        </div>

                        <!-- CAN Bus -->
                        <div class="glosari-card card card-glow" data-term="can bus controller area network komunikasi">
                            <div class="card-header" style="border-bottom: 1px dashed var(--border-color); padding-bottom: 10px;">
                                <h3 style="color: var(--color-purple); margin: 0;">CAN Bus</h3>
                                <small style="color: var(--text-muted); font-style: italic;">Controller Area Network</small>
                            </div>
                            <div class="card-body" style="padding-top: 15px;">
                                <p style="font-size: 0.9rem; color: var(--text-secondary); margin: 0;">Rangkaian komunikasi standard kenderaan moden yang membenarkan modul-modul elektronik (ECU) berbeza berhubung antara satu sama lain.</p>
                            </div>
                        </div>

                    </div>
                </div>

                <style>
                    .glosari-grid {
                        display: grid;
                        grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
                        gap: 20px;
                    }
                    .glosari-card {
                        transition: opacity 0.3s ease, transform 0.2s ease;
                        height: 100%;
                    }
                </style>

                <script>
                    function filterGlosari() {
                        const input = document.getElementById('glosari-search').value.toLowerCase();
                        const cards = document.querySelectorAll('.glosari-card');
                        
                        cards.forEach(card => {
                            const termData = card.getAttribute('data-term').toLowerCase();
                            // Also search inside the description text just in case
                            const descText = card.querySelector('.card-body p').textContent.toLowerCase();
                            
                            if (termData.includes(input) || descText.includes(input)) {
                                card.style.display = 'block';
                            } else {
                                card.style.display = 'none';
                            }
                        });
                    }
                </script>`;

if (regex.test(content)) {
    content = content.replace(regex, '$1' + glossaryHTML + '$2');
    fs.writeFileSync(path, content, 'utf8');
    console.log('Glossary added!');
} else {
    console.log('Could not match target section.');
}
