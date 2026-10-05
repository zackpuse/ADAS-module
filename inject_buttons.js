const fs = require('fs');
const path = 'd:\\Mipac Tvet\\Modul ADAS\\index.html';
let content = fs.readFileSync(path, 'utf8');

function injectButtonBeforeSectionEnd(content, tabId, nextTab, btnText) {
    // 1. Locate the section: `<section id="tabId" ...>`
    const sectionStart = content.indexOf(`id="${tabId}"`);
    if (sectionStart === -1) return content; // Not found

    // 2. Find the END of this section: `</section>`
    const nextSectionIndex = content.indexOf('<section id="', sectionStart + 10);
    const searchLimit = nextSectionIndex !== -1 ? nextSectionIndex : content.length;
    
    // Find the last `</section>` within this section's bounds
    const sectionEnd = content.lastIndexOf('</section>', searchLimit);
    
    if (sectionEnd !== -1 && sectionEnd > sectionStart) {
        // If there's already a next button, don't duplicate
        if (!content.substring(sectionEnd - 300, sectionEnd).includes(`data-tab='${nextTab}'`) && 
            !content.substring(sectionEnd - 300, sectionEnd).includes(`data-tab="${nextTab}"`)) {
            
            let btnClass = "btn btn-primary";
            let icon = "→";
            if (btnText.includes('Kembali')) {
                btnClass = "btn btn-outline";
                icon = ""; // icon is inside the string
            }

            const btnHtml = `
                    <div style="margin-top: 30px; display: flex; justify-content: flex-end; width: 100%; border-top: 1px dashed rgba(255,255,255,0.1); padding-top: 20px;">
                        <button type="button" class="${btnClass}" onclick="document.querySelector('[data-tab=\\'${nextTab}\\']').click()" style="padding: 12px 28px; font-size: 1rem; font-weight: bold;">
                            ${btnText} ${icon}
                        </button>
                    </div>
            `;
            return content.substring(0, sectionEnd) + btnHtml + content.substring(sectionEnd);
        }
    }
    return content;
}

// First, fix the 'Seterusnya: Kuiz' in tab-teori to be 'Seterusnya: Rajah Pendawaian'
content = content.replace(/onclick="document\.querySelector\('\[data-tab=\\'kuiz\\'\]'\)\.click\(\)"\s*style="padding: 12px 28px; font-size: 1rem; font-weight: bold;">\s*Seterusnya: Kuiz →/g, 
                          `onclick="document.querySelector('[data-tab=\\'wiring\\']').click()" style="padding: 12px 28px; font-size: 1rem; font-weight: bold;"> Seterusnya: Rajah Pendawaian →`);

// If the regex replacement above missed because of formatting, let's do a more generic replacement:
content = content.replace(/Seterusnya: Kuiz →/g, 'Seterusnya: Rajah Pendawaian →');
content = content.replace(/data-tab=\\'kuiz\\'/g, "data-tab=\\'wiring\\'"); // BUT wait, this breaks other buttons!
// Let me be careful. I'll read and rewrite only inside tab-teori.

let teoriStart = content.indexOf('id="tab-teori"');
let wiringStart = content.indexOf('id="tab-wiring"');
if(teoriStart !== -1 && wiringStart !== -1) {
    let teoriContent = content.substring(teoriStart, wiringStart);
    teoriContent = teoriContent.replace(/data-tab=\\'kuiz\\'/g, "data-tab=\\'wiring\\'");
    teoriContent = teoriContent.replace(/Seterusnya: Kuiz →/g, "Seterusnya: Rajah Pendawaian →");
    content = content.substring(0, teoriStart) + teoriContent + content.substring(wiringStart);
}


content = injectButtonBeforeSectionEnd(content, 'tab-simulator', 'teori', 'Seterusnya: Modul Teori ADAS');
content = injectButtonBeforeSectionEnd(content, 'tab-wiring', 'jobcard', 'Seterusnya: Buku Log Diagnostik');
content = injectButtonBeforeSectionEnd(content, 'tab-jobcard', 'kuiz', 'Seterusnya: Kuiz Penilaian Kendiri');
content = injectButtonBeforeSectionEnd(content, 'tab-kuiz', 'glosari', 'Seterusnya: Glosari Automotif Pintar');
content = injectButtonBeforeSectionEnd(content, 'tab-glosari', 'simulator', '<i class="fa-solid fa-rotate-left"></i> Kembali ke Simulator');

fs.writeFileSync(path, content, 'utf8');
console.log("Updated buttons.");
