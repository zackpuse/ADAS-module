const fs = require('fs');
const path = 'd:\\Mipac Tvet\\Modul ADAS\\index.html';
let content = fs.readFileSync(path, 'utf8');

const regex = /(<button class="nav-item" data-tab="kuiz">[\s\S]*?<\/button>\s*)(<button class="nav-item" data-tab="wiring">[\s\S]*?<\/button>\s*)(<button class="nav-item" data-tab="jobcard">[\s\S]*?<\/button>\s*)/;
if (regex.test(content)) {
    content = content.replace(regex, '$2$3$1');
    fs.writeFileSync(path, content, 'utf8');
    console.log('Successfully reordered buttons!');
} else {
    console.log('Regex for buttons did not match.');
}
