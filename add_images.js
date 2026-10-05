const fs = require('fs');
const path = 'd:\\Mipac Tvet\\Modul ADAS\\index.html';
let content = fs.readFileSync(path, 'utf8');

// Replace the panel HTML
const oldPanel = /<!-- Panel Info Dinamik -->[\s\S]*?<div id="wiring-info-panel"[\s\S]*?<\/div>\s*<\/div>\s*<\/div>/;

const newPanel = `<!-- Panel Info Dinamik -->
                        <div id="wiring-info-panel" class="card mt-4" style="background: rgba(15,23,42,0.8); border: 1px dashed var(--color-cyan); padding: 20px; display: none;">
                            <div style="display: flex; gap: 20px; flex-wrap: wrap; align-items: flex-start;">
                                <div id="wi-img-container" style="display: none; flex: 0 0 250px;">
                                    <img id="wi-img" src="" alt="Komponen Fizikal" style="width: 100%; border-radius: 8px; border: 2px solid var(--border-color); box-shadow: 0 4px 10px rgba(0,0,0,0.5);">
                                </div>
                                <div style="flex: 1; min-width: 250px;">
                                    <h4 id="wi-title" style="color: var(--color-cyan); margin-bottom: 10px;">-</h4>
                                    <p id="wi-desc" style="color: var(--text-secondary); margin-bottom: 15px; line-height: 1.5;">-</p>
                                    <div id="wi-signals" style="display: flex; gap: 10px; flex-wrap: wrap;"></div>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>`;

if (oldPanel.test(content)) {
    content = content.replace(oldPanel, newPanel);
}

// Replace nodeData to include img fields
const oldNodeDataRegex = /const nodeData = \{[\s\S]*?function showNodeInfo/;
const newNodeData = `const nodeData = {
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
                            img: 'assets/huskylens_ai.jpg',
                            signals: [
                                { name: 'I2C (SDA/SCL)', color: '#3b82f6' },
                                { name: 'Kuasa 5V', color: '#ef4444' }
                            ]
                        },
                        'ultrasonic': {
                            title: 'Sensor Ultrasonik (HC-SR04)',
                            desc: 'Penderia frekuensi tinggi yang mengukur jarak halangan di hadapan (Obstacle Detection). Berfungsi sebagai input untuk Sistem Brek Kecemasan Automatik (AEB).',
                            img: 'assets/ultrasonic.jpg',
                            signals: [
                                { name: 'Isyarat Digital (Trig/Echo)', color: '#10b981' },
                                { name: 'Kuasa 5V', color: '#ef4444' }
                            ]
                        },
                        'ecu': {
                            title: 'Arduino ECU (Electronic Control Unit)',
                            desc: 'Otak sistem ADAS. Ia membaca data I2C dari kamera, mengira formula Time-To-Collision (TTC) berdasarkan jarak sensor ultrasonik, dan menghantar isyarat memandu kepada Motor Driver.',
                            img: 'assets/arduino_ecu.jpg',
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

                    function showNodeInfo`;

if (oldNodeDataRegex.test(content)) {
    content = content.replace(oldNodeDataRegex, newNodeData);
}

// Replace showNodeInfo function logic to handle image
const oldShowNodeInfo = /function showNodeInfo\(id\) \{[\s\S]*?panel\.style\.display = 'block';\s*\}/;
const newShowNodeInfo = `function showNodeInfo(id) {
                        const panel = document.getElementById('wiring-info-panel');
                        const title = document.getElementById('wi-title');
                        const desc = document.getElementById('wi-desc');
                        const signals = document.getElementById('wi-signals');
                        const imgContainer = document.getElementById('wi-img-container');
                        const imgEl = document.getElementById('wi-img');
                        
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
                        
                        if (data.img) {
                            imgEl.src = data.img;
                            imgContainer.style.display = 'block';
                        } else {
                            imgContainer.style.display = 'none';
                        }
                        
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
                    }`;

if (oldShowNodeInfo.test(content)) {
    content = content.replace(oldShowNodeInfo, newShowNodeInfo);
}

fs.writeFileSync(path, content, 'utf8');
console.log('Successfully updated wiring diagram with images!');
