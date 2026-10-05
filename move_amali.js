const fs = require('fs');

const path = 'd:\\Mipac Tvet\\Modul ADAS\\index.html';
let content = fs.readFileSync(path, 'utf8');

const amaliRegex = /(<!-- KAD 5: MODUL AMALI -->[\s\S]*?)<div style="margin-top: 25px;/;
const match = content.match(amaliRegex);

if (match) {
    const amaliContent = match[1];
    
    // Remove from original location
    content = content.replace(amaliRegex, '<div style="margin-top: 25px;');
    
    // Insert into tab-jobcard
    const targetPlaceholder = /<div class="card card-glow" style="text-align: center; padding: 40px;">\s*<h3 class="text-amber"><i class="fa-solid fa-person-digging"><\/i> Modul Buku Log Sedang Dibangunkan<\/h3>\s*<p class="text-secondary mt-3">Borang pemerhatian amali dan janaan PDF akan diletakkan di sini\.<\/p>\s*<\/div>/;
    
    content = content.replace(targetPlaceholder, amaliContent);
    
    fs.writeFileSync(path, content, 'utf8');
    console.log('Success: Amali moved to Job Card');
} else {
    console.log('Failed: Could not find Amali block');
}
