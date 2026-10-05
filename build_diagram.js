const fs = require('fs');
const path = 'd:\\Mipac Tvet\\Modul ADAS\\index.html';
let content = fs.readFileSync(path, 'utf8');

const regex = /(<section id="tab-wiring" class="tab-panel">[\s\S]*?<div class="panel-header">[\s\S]*?<\/div>\s*<\/div>\s*)<div class="card card-glow" style="text-align: center; padding: 40px;">[\s\S]*?<\/div>(\s*<\/section>)/;

const diagramHTML = `<div class="wiring-container">
                    <div class="card card-glow" style="padding: 30px;">
                        <h3 class="text-cyan mb-3"><i class="fa-solid fa-microchip"></i> Gambarajah Blok Sambungan Komponen (Block Diagram)</h3>
                        <p class="text-secondary mb-4">Klik (sentuh) pada mana-mana blok untuk melihat jenis isyarat dan penerangan fungsinya dalam sistem kenderaan autonomi ini.</p>
                        
                        <div class="block-diagram">
                            
                            <!-- Bateri -->
                            <div class="bd-node" id="node-battery" onclick="showNodeInfo('battery')">
                                <i class="fa-solid fa-car-battery text-red" style="font-size: 2rem;"></i>
                                <span>Bateri 7.4V (Li-Po)</span>
                            </div>

                            <!-- Huskylens -->
                            <div class="bd-node" id="node-huskylens" onclick="showNodeInfo('huskylens')" style="grid-column: 1; grid-row: 2;">
                                <i class="fa-solid fa-camera text-gold" style="font-size: 2rem;"></i>
                                <span>HuskyLens AI Vision</span>
                            </div>

                            <!-- Ultrasonic -->
                            <div class="bd-node" id="node-ultrasonic" onclick="showNodeInfo('ultrasonic')" style="grid-column: 1; grid-row: 3;">
                                <i class="fa-solid fa-wifi text-green" style="font-size: 2rem;"></i>
                                <span>Sensor Ultrasonik</span>
                            </div>

                            <!-- Arduino ECU -->
                            <div class="bd-node bd-main" id="node-ecu" onclick="showNodeInfo('ecu')" style="grid-column: 2; grid-row: 2;">
                                <i class="fa-solid fa-server text-cyan" style="font-size: 2.5rem;"></i>
                                <span>Arduino ECU (Mikropengawal)</span>
                            </div>

                            <!-- Motor Driver -->
                            <div class="bd-node" id="node-driver" onclick="showNodeInfo('driver')" style="grid-column: 3; grid-row: 2;">
                                <i class="fa-solid fa-microchip text-purple" style="font-size: 2rem;"></i>
                                <span>Pemacu Motor (Motor Driver)</span>
                            </div>

                            <!-- DC Motors -->
                            <div class="bd-node" id="node-motors" onclick="showNodeInfo('motors')" style="grid-column: 4; grid-row: 2;">
                                <i class="fa-solid fa-gear text-amber" style="font-size: 2rem;"></i>
                                <span>Motor Arus Terus (Roda)</span>
                            </div>

                        </div>
                        
                        <!-- Panel Info Dinamik -->
                        <div id="wiring-info-panel" class="card mt-4" style="background: rgba(15,23,42,0.8); border: 1px dashed var(--color-cyan); padding: 20px; display: none;">
                            <h4 id="wi-title" style="color: var(--color-cyan); margin-bottom: 10px;">-</h4>
                            <p id="wi-desc" style="color: var(--text-secondary); margin-bottom: 15px;">-</p>
                            <div id="wi-signals" style="display: flex; gap: 10px; flex-wrap: wrap;"></div>
                        </div>

                    </div>
                </div>

                <style>
                    .block-diagram {
                        display: grid;
                        grid-template-columns: 1fr 1.5fr 1fr 1fr;
                        grid-template-rows: auto auto auto;
                        gap: 30px;
                        align-items: center;
                        position: relative;
                        padding: 20px 0;
                    }
                    .bd-node {
                        background: var(--bg-card);
                        border: 2px solid var(--border-color);
                        border-radius: 12px;
                        padding: 15px;
                        display: flex;
                        flex-direction: column;
                        align-items: center;
                        gap: 10px;
                        text-align: center;
                        cursor: pointer;
                        transition: all 0.3s ease;
                        box-shadow: 0 4px 6px rgba(0,0,0,0.1);
                        z-index: 2;
                    }
                    .bd-node:hover {
                        border-color: var(--color-cyan);
                        transform: translateY(-5px);
                        box-shadow: 0 0 15px rgba(6, 182, 212, 0.4);
                    }
                    .bd-node span {
                        font-weight: 600;
                        font-size: 0.9rem;
                    }
                    .bd-main {
                        border-color: var(--color-cyan);
                        background: rgba(6, 182, 212, 0.1);
                    }
                    #node-battery { grid-column: 2; grid-row: 1; }
                    .signal-badge {
                        padding: 5px 10px;
                        border-radius: 20px;
                        font-size: 0.8rem;
                        font-weight: bold;
                    }
                    /* Simplified connections representation using borders */
                </style>

                <script>
                    const nodeData = {
                        'battery': {
                            title: 'Bateri Li-Po 7.4V',
                            desc: 'Sumber kuasa utama kenderaan (Power Supply). Membekalkan kuasa terus kepada Motor Driver dan menukar (step-down) kepada 5V untuk menghidupkan ECU, HuskyLens, dan sensor ultrasonik.',
                            signals: [
                                { name: 'VCC / Kuasa', color: '#ef4444' },
                                { name: 'GND / Bumi', color: '#1e293b' }
                            ]
                        },
                        'huskylens': {
                            title: 'HuskyLens AI Vision',
                            desc: 'Kamera pintar (Smart Camera) yang menggunakan kecerdasan buatan terbenam untuk mengecam garisan panduan (Line Tracking) dan membaca papan tanda had laju (QR Tag Recognition).',
                            signals: [
                                { name: 'I2C (SDA/SCL)', color: '#3b82f6' },
                                { name: 'Kuasa 5V', color: '#ef4444' }
                            ]
                        },
                        'ultrasonic': {
                            title: 'Sensor Ultrasonik (HC-SR04)',
                            desc: 'Penderia frekuensi tinggi yang mengukur jarak halangan di hadapan (Obstacle Detection). Berfungsi sebagai input untuk Sistem Brek Kecemasan Automatik (AEB).',
                            signals: [
                                { name: 'Isyarat Digital (Trig/Echo)', color: '#10b981' },
                                { name: 'Kuasa 5V', color: '#ef4444' }
                            ]
                        },
                        'ecu': {
                            title: 'Arduino ECU (Electronic Control Unit)',
                            desc: 'Otak sistem ADAS. Ia membaca data I2C dari kamera, mengira formula Time-To-Collision (TTC) berdasarkan jarak sensor ultrasonik, dan menghantar isyarat memandu kepada Motor Driver.',
                            signals: [
                                { name: 'Pemprosesan Logik', color: '#06b6d4' }
                            ]
                        },
                        'driver': {
                            title: 'Pemacu Motor (L298N)',
                            desc: 'Litar penguat kuasa yang menerima isyarat lemah 5V dari ECU dan menukarnya menjadi arus kuat (hingga 2A) dari bateri untuk menggerakkan motor tayar secara tepat.',
                            signals: [
                                { name: 'Isyarat PWM (Kelajuan)', color: '#a855f7' },
                                { name: 'Pin Digital IN (Arah)', color: '#10b981' }
                            ]
                        },
                        'motors': {
                            title: 'Motor Arus Terus (Roda Kiri & Kanan)',
                            desc: 'Aktuator fizikal (Actuators) yang menggerakkan dan membelokkan stereng rover. Perbezaan kelajuan motor kiri & kanan membolehkan rover membelok (skid steering).',
                            signals: [
                                { name: 'Arus Terus (Analog)', color: '#f59e0b' }
                            ]
                        }
                    };

                    function showNodeInfo(id) {
                        const panel = document.getElementById('wiring-info-panel');
                        const title = document.getElementById('wi-title');
                        const desc = document.getElementById('wi-desc');
                        const signals = document.getElementById('wi-signals');
                        
                        const data = nodeData[id];
                        if(!data) return;

                        // Reset all nodes outline
                        document.querySelectorAll('.bd-node').forEach(el => {
                            if(!el.classList.contains('bd-main')) el.style.borderColor = 'var(--border-color)';
                        });
                        if(id !== 'ecu') {
                            document.getElementById('node-' + id).style.borderColor = 'var(--color-amber)';
                        }

                        title.innerHTML = '<i class="fa-solid fa-circle-info"></i> ' + data.title;
                        desc.textContent = data.desc;
                        
                        signals.innerHTML = '';
                        data.signals.forEach(sig => {
                            const badge = document.createElement('span');
                            badge.className = 'signal-badge';
                            badge.style.backgroundColor = sig.color;
                            badge.style.color = '#fff';
                            badge.textContent = sig.name;
                            signals.appendChild(badge);
                        });

                        panel.style.display = 'block';
                    }
                </script>`;

if (regex.test(content)) {
    content = content.replace(regex, '$1' + diagramHTML + '$2');
    fs.writeFileSync(path, content, 'utf8');
    console.log('Diagram added!');
} else {
    console.log('Could not match target section.');
}
