const fs = require('fs');

const path = 'd:\\Mipac Tvet\\Modul ADAS\\index.html';
let content = fs.readFileSync(path, 'utf8');

const targetStr = `                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
            </section>

            <!-- ========================================== -->
            <!-- TAB: GLOSARI -->`;

const formHtml = `                                    </div>
                                </div>
                            </div>

                            <!-- DIGITAL JOB CARD FORM -->
                            <div class="job-card-form" style="margin-top: 30px; border-top: 1px solid var(--border-color); padding-top: 20px;">
                                <h3 style="color: var(--color-cyan); margin-bottom: 20px;"><i class="fa-solid fa-file-signature"></i> Borang Pemerhatian Amali (Job Card)</h3>
                                
                                <div style="display: flex; flex-direction: column; gap: 15px;">
                                    <div class="responsive-grid-2" style="gap: 15px;">
                                        <div>
                                            <label style="display: block; margin-bottom: 5px; font-weight: 600;">Nama Pelatih</label>
                                            <input type="text" id="job-name" placeholder="Nama penuh..." style="width: 100%; padding: 10px; border-radius: 4px; border: 1px solid var(--text-muted); background: var(--bg-dark); color: white;">
                                        </div>
                                        <div>
                                            <label style="display: block; margin-bottom: 5px; font-weight: 600;">No. Pendaftaran</label>
                                            <input type="text" id="job-matric" placeholder="No matriks..." style="width: 100%; padding: 10px; border-radius: 4px; border: 1px solid var(--text-muted); background: var(--bg-dark); color: white;">
                                        </div>
                                    </div>

                                    <div>
                                        <label style="display: block; margin-bottom: 5px; font-weight: 600;">Keputusan Pengujian AEB (Ultrasonic)</label>
                                        <select id="job-aeb" style="width: 100%; padding: 10px; border-radius: 4px; border: 1px solid var(--text-muted); background: var(--bg-dark); color: white;">
                                            <option value="">-- Sila Pilih Keputusan --</option>
                                            <option value="Berjaya berhenti pada jarak selamat">Berjaya berhenti pada jarak selamat (< 50cm)</option>
                                            <option value="Sistem gagal bertindak balas">Sistem gagal bertindak balas</option>
                                            <option value="Tindak balas lambat">Tindak balas lambat</option>
                                        </select>
                                    </div>

                                    <div>
                                        <label style="display: block; margin-bottom: 5px; font-weight: 600;">Keputusan Pengesanan Papan Tanda (HuskyLens QR)</label>
                                        <textarea id="job-qr" rows="3" placeholder="Contoh: Kamera berjaya mengecam QR 'SPEED 20' dan memperlahankan rover dengan lancar..." style="width: 100%; padding: 10px; border-radius: 4px; border: 1px solid var(--text-muted); background: var(--bg-dark); color: white; resize: vertical;"></textarea>
                                    </div>

                                    <div>
                                        <label style="display: block; margin-bottom: 5px; font-weight: 600;">Jawapan Soalan Refleksi</label>
                                        <textarea id="job-reflection" rows="4" placeholder="Tuliskan ulasan ringkas mengenai kaitan fungsi modul ini dengan keselamatan jalan raya (ADAS)..." style="width: 100%; padding: 10px; border-radius: 4px; border: 1px solid var(--text-muted); background: var(--bg-dark); color: white; resize: vertical;"></textarea>
                                    </div>

                                    <div style="margin-top: 15px;">
                                        <button type="button" class="btn btn-primary" onclick="janaJobCard()" style="padding: 12px 25px;"><i class="fa-solid fa-file-pdf"></i> Jana & Cetak Job Card PDF</button>
                                        <button type="button" class="btn btn-outline" onclick="document.getElementById('job-name').value='';document.getElementById('job-matric').value='';document.getElementById('job-aeb').value='';document.getElementById('job-qr').value='';document.getElementById('job-reflection').value='';">Padam</button>
                                    </div>
                                </div>
                            </div>
                            <!-- END DIGITAL JOB CARD FORM -->
                        </div>
                    </div>
            </section>

            <!-- ========================================== -->
            <!-- TAB: GLOSARI -->`;

if (content.includes('<!-- TAB: GLOSARI -->')) {
    // We will do a generic replacement near the end of tab-jobcard.
    // The structure is: ...</div></div></section> \n\n <!-- ========================================== --> \n <!-- TAB: GLOSARI -->
    const replacePattern = /<\/div>\s*<\/div>\s*<\/section>\s*<!-- ========================================== -->\s*<!-- TAB: GLOSARI -->/g;
    
    const replacementStr = `</div>
                            </div>
                            
                            <!-- DIGITAL JOB CARD FORM -->
                            <div class="job-card-form" style="margin-top: 30px; border-top: 1px solid var(--border-color); padding-top: 20px;">
                                <h3 style="color: var(--color-cyan); margin-bottom: 20px;"><i class="fa-solid fa-file-signature"></i> Borang Pemerhatian Amali (Job Card)</h3>
                                
                                <div style="display: flex; flex-direction: column; gap: 15px;">
                                    <div class="responsive-grid-2" style="gap: 15px;">
                                        <div>
                                            <label style="display: block; margin-bottom: 5px; font-weight: 600;">Nama Pelatih</label>
                                            <input type="text" id="job-name" placeholder="Nama penuh..." style="width: 100%; padding: 10px; border-radius: 4px; border: 1px solid var(--text-muted); background: var(--bg-dark); color: white;">
                                        </div>
                                        <div>
                                            <label style="display: block; margin-bottom: 5px; font-weight: 600;">No. Pendaftaran</label>
                                            <input type="text" id="job-matric" placeholder="No matriks..." style="width: 100%; padding: 10px; border-radius: 4px; border: 1px solid var(--text-muted); background: var(--bg-dark); color: white;">
                                        </div>
                                    </div>

                                    <div>
                                        <label style="display: block; margin-bottom: 5px; font-weight: 600;">Keputusan Pengujian AEB (Ultrasonic)</label>
                                        <select id="job-aeb" style="width: 100%; padding: 10px; border-radius: 4px; border: 1px solid var(--text-muted); background: var(--bg-dark); color: white;">
                                            <option value="">-- Sila Pilih Keputusan --</option>
                                            <option value="Berjaya berhenti pada jarak selamat">Berjaya berhenti pada jarak selamat (< 50cm)</option>
                                            <option value="Sistem gagal bertindak balas">Sistem gagal bertindak balas</option>
                                            <option value="Tindak balas lambat">Tindak balas lambat</option>
                                        </select>
                                    </div>

                                    <div>
                                        <label style="display: block; margin-bottom: 5px; font-weight: 600;">Keputusan Pengesanan Papan Tanda (HuskyLens QR)</label>
                                        <textarea id="job-qr" rows="3" placeholder="Contoh: Kamera berjaya mengecam QR 'SPEED 20' dan memperlahankan rover dengan lancar..." style="width: 100%; padding: 10px; border-radius: 4px; border: 1px solid var(--text-muted); background: var(--bg-dark); color: white; resize: vertical;"></textarea>
                                    </div>

                                    <div>
                                        <label style="display: block; margin-bottom: 5px; font-weight: 600;">Jawapan Soalan Refleksi</label>
                                        <textarea id="job-reflection" rows="4" placeholder="Tuliskan ulasan ringkas mengenai kaitan fungsi modul ini dengan keselamatan jalan raya (ADAS)..." style="width: 100%; padding: 10px; border-radius: 4px; border: 1px solid var(--text-muted); background: var(--bg-dark); color: white; resize: vertical;"></textarea>
                                    </div>

                                    <div style="margin-top: 15px;">
                                        <button type="button" class="btn btn-primary" onclick="janaJobCard()" style="padding: 12px 25px;"><i class="fa-solid fa-file-pdf"></i> Jana & Cetak Job Card PDF</button>
                                        <button type="button" class="btn btn-outline" onclick="document.getElementById('job-name').value='';document.getElementById('job-matric').value='';document.getElementById('job-aeb').value='';document.getElementById('job-qr').value='';document.getElementById('job-reflection').value='';">Padam</button>
                                    </div>
                                </div>
                            </div>
                            <!-- END DIGITAL JOB CARD FORM -->
                        </div>
                    </div>
            </section>

            <!-- ========================================== -->
            <!-- TAB: GLOSARI -->`;
    
    content = content.replace(replacePattern, replacementStr);
    
    fs.writeFileSync(path, content, 'utf8');
    console.log('Success: Form added.');
} else {
    console.log('Failed: Could not match');
}
