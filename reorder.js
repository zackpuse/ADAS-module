const fs = require('fs');
const path = 'd:\\Mipac Tvet\\Modul ADAS\\index.html';
let content = fs.readFileSync(path, 'utf8');

// 1. Reorder buttons
const btnTarget = `<button class="nav-item" data-tab="kuiz">
                    <i class="fa-solid fa-clipboard-question"></i>
                    <span>Kuiz Penilaian Kendiri</span>
                </button>
                <button class="nav-item" data-tab="wiring">
                    <i class="fa-solid fa-plug-circle-bolt"></i>
                    <span>Rajah Pendawaian Sistem</span>
                </button>
                <button class="nav-item" data-tab="jobcard">
                    <i class="fa-solid fa-clipboard-list"></i>
                    <span>Buku Log Diagnostik</span>
                </button>`;
const btnReplacement = `<button class="nav-item" data-tab="wiring">
                    <i class="fa-solid fa-plug-circle-bolt"></i>
                    <span>Rajah Pendawaian Sistem</span>
                </button>
                <button class="nav-item" data-tab="jobcard">
                    <i class="fa-solid fa-clipboard-list"></i>
                    <span>Buku Log Diagnostik</span>
                </button>
                <button class="nav-item" data-tab="kuiz">
                    <i class="fa-solid fa-clipboard-question"></i>
                    <span>Kuiz Penilaian Kendiri</span>
                </button>`;

if (content.includes(btnTarget)) {
    content = content.replace(btnTarget, btnReplacement);
}

// 2. Update 'Seterusnya' button in Teori
const btnTeoriOriginal = `<button type="button" class="btn btn-primary" onclick="document.querySelector('[data-tab=\\'kuiz\\']').click()"
                                    style="padding: 12px 28px; font-size: 1rem; font-weight: bold;">
                                    Seterusnya: Kuiz →
                                </button>`;
const btnTeoriNew = `<button type="button" class="btn btn-primary" onclick="document.querySelector('[data-tab=\\'wiring\\']').click()"
                                    style="padding: 12px 28px; font-size: 1rem; font-weight: bold;">
                                    Seterusnya: Rajah Pendawaian →
                                </button>`;
if (content.includes(btnTeoriOriginal)) {
    content = content.replace(btnTeoriOriginal, btnTeoriNew);
}

// 3. Move section tab-kuiz after tab-jobcard
const splitRegex = /(<!-- ========================================== -->\s*<!-- TAB: KUIZ -->[\s\S]*?<\/section>\s*)(<!-- ========================================== -->\s*<!-- TAB: WIRING DIAGRAM -->[\s\S]*?<!-- DIGITAL JOB CARD FORM -->[\s\S]*?<\/div>\s*<\/section>\s*)/;

if (splitRegex.test(content)) {
    content = content.replace(splitRegex, '$2$1');
    
    const jobCardBtns = /<button type="button" class="btn btn-outline" onclick="document\.getElementById\('job-name'\)\.value='';[^>]*>Padam<\/button>\s*<\/div>/;
    
    if (jobCardBtns.test(content)) {
        content = content.replace(jobCardBtns, `$&
                                    <div style="margin-top: 25px; display: flex; justify-content: flex-end; width: 100%;">
                                        <button type="button" class="btn btn-primary" onclick="document.querySelector('[data-tab=\\'kuiz\\']').click()" style="padding: 12px 28px; font-size: 1rem; font-weight: bold;">
                                            Seterusnya: Kuiz Penilaian Kendiri →
                                        </button>
                                    </div>`);
    }
    
    fs.writeFileSync(path, content, 'utf8');
    console.log('Successfully reordered kuiz after jobcard!');
} else {
    console.log('Regex did not match for section split.');
}
