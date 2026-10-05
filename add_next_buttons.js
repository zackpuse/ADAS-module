const fs = require('fs');
const path = 'd:\\Mipac Tvet\\Modul ADAS\\index.html';
let content = fs.readFileSync(path, 'utf8');

// Helper function to append a button before the closing tag of a specific container or section
function appendNextButton(content, sectionId, nextTab, nextText) {
    const btnHtml = `
                    <div style="margin-top: 30px; display: flex; justify-content: flex-end; width: 100%; border-top: 1px dashed rgba(255,255,255,0.1); padding-top: 20px;">
                        <button type="button" class="btn btn-primary" onclick="document.querySelector('[data-tab=\\'${nextTab}\\']').click()" style="padding: 12px 28px; font-size: 1rem; font-weight: bold;">
                            Seterusnya: ${nextText} →
                        </button>
                    </div>`;

    if (sectionId === 'tab-simulator') {
        // Find the end of tab-simulator.
        // It usually ends with `<!-- ========================================== --> \n <!-- TAB 2`
        // Or look for `</section>` of tab-simulator. Since there are many divs, we just find `</section>\s*<!-- ========================================== -->\s*<!-- TAB 2:`
        // Actually, just find the `</section>` before the `<!-- TAB 2: TEORI -->` block.
        const re = /(<\/section>)\s*(?=<!-- ========================================== -->\s*<!-- TAB 2: TEORI)/;
        return content.replace(re, btnHtml + '\n            $1');
    }
    
    if (sectionId === 'tab-wiring') {
        // Ends with `</div>\s*</div>\s*</section>`
        const re = /(<\/div>\s*<\/div>\s*)(<\/section>\s*<!-- ========================================== -->\s*<!-- TAB: JOB CARD -->)/;
        return content.replace(re, '$1' + btnHtml + '\n            $2');
    }

    if (sectionId === 'tab-kuiz') {
        // Inside `fail-actions-container` div closes, then `</div></div></div></section>`
        // Let's just insert before the very last `</section>` of tab-kuiz
        const re = /(<\/div>\s*<\/div>\s*<\/div>\s*)(<\/section>\s*<!-- ========================================== -->\s*<!-- TAB: GLOSARI -->)/;
        return content.replace(re, '$1' + btnHtml + '\n            $2');
    }

    if (sectionId === 'tab-glosari') {
        // Ends with `</div>\s*</div>\s*</section>`
        const re = /(<\/div>\s*<\/div>\s*)(<\/section>\s*<\/main>)/;
        const btnHtmlGlosari = `
                    <div style="margin-top: 30px; display: flex; justify-content: flex-end; width: 100%; border-top: 1px dashed rgba(255,255,255,0.1); padding-top: 20px;">
                        <button type="button" class="btn btn-outline" onclick="document.querySelector('[data-tab=\\'simulator\\']').click()" style="padding: 12px 28px; font-size: 1rem; font-weight: bold;">
                            <i class="fa-solid fa-rotate-left"></i> Kembali ke Simulator
                        </button>
                    </div>`;
        return content.replace(re, '$1' + btnHtmlGlosari + '\n            $2');
    }

    return content;
}

content = appendNextButton(content, 'tab-simulator', 'teori', 'Modul Teori ADAS');
content = appendNextButton(content, 'tab-wiring', 'jobcard', 'Buku Log Diagnostik');
content = appendNextButton(content, 'tab-kuiz', 'glosari', 'Glosari Automotif Pintar');
content = appendNextButton(content, 'tab-glosari', 'simulator', 'Kembali ke Simulator');

fs.writeFileSync(path, content, 'utf8');
console.log('Successfully added next buttons to all tabs!');
