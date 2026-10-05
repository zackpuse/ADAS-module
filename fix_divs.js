const fs = require('fs');

const path = 'd:\\Mipac Tvet\\Modul ADAS\\index.html';
let content = fs.readFileSync(path, 'utf8');

// The problematic block is around line 580:
// <div style="margin-top: 25px; display: flex; justify-content: flex-end;">
//   <button ...> Seterusnya: Kuiz → </button>
// </div>
// </div>
// </div>
// </section>

const regex = /(<div style="margin-top: 25px;[^>]*>[\s\S]*?Seterusnya: Kuiz \u2192[\s\S]*?<\/button>\s*<\/div>)\s*<\/div>\s*<\/div>\s*<\/section>/;

if (regex.test(content)) {
    content = content.replace(regex, '$1\n                </div>\n            </section>');
    fs.writeFileSync(path, content, 'utf8');
    console.log('Fixed extra divs with regex!');
} else {
    console.log('Could not find target with regex.');
}
