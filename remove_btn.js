const fs = require('fs');
const path = 'd:\\Mipac Tvet\\Modul ADAS\\index.html';
let content = fs.readFileSync(path, 'utf8');

const regex = /<a href="https:\/\/sites\.google\.com\/jtm\.gov\.my\/smartlineqrrover\/home" target="_blank"[\s\S]*?class="btn btn-outline btn-sm">[\s\S]*?<i class="fa-solid fa-globe"><\/i> Portal Google Site \(Self-Hosted\)[\s\S]*?<\/a>/;

if (regex.test(content)) {
    content = content.replace(regex, '');
    fs.writeFileSync(path, content, 'utf8');
    console.log('Successfully removed Google Site button!');
} else {
    console.log('Regex did not match.');
}
