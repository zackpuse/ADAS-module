const fs = require('fs');

const path = 'd:\\Mipac Tvet\\Modul ADAS\\app.js';
let content = fs.readFileSync(path, 'utf8');

const janaJobCardCode = `
window.janaJobCard = function() {
    const name = document.getElementById('job-name').value.trim() || 'Tanpa Nama';
    const matric = document.getElementById('job-matric').value.trim() || '-';
    const aeb = document.getElementById('job-aeb').value || 'Tiada maklumat direkodkan';
    const qr = document.getElementById('job-qr').value.trim() || 'Tiada maklumat direkodkan';
    const reflection = document.getElementById('job-reflection').value.trim() || 'Tiada maklumat direkodkan';

    const jspdfLib = window.jspdf ? window.jspdf.jsPDF : (window.jsPDF || null);
    
    if (!jspdfLib) {
        alert('Modul PDF tidak dapat dimuatkan. Sila gunakan fungsi cetak (Print) web browser anda.');
        window.print();
        return;
    }

    const doc = new jspdfLib({
        orientation: 'portrait',
        unit: 'mm',
        format: 'a4'
    });

    const margin = 20;
    const pageWidth = 210;
    let yPos = 30;

    // Title
    doc.setFontSize(22);
    doc.setTextColor(14, 165, 233); // Cyan
    doc.text('BUKU LOG DIAGNOSTIK AMALI', margin, yPos);
    
    yPos += 10;
    doc.setFontSize(14);
    doc.setTextColor(100, 116, 139); // Slate
    doc.text('SmartLine QR Rover - ADAS System Lab', margin, yPos);
    
    yPos += 15;
    doc.setDrawColor(51, 65, 85);
    doc.line(margin, yPos, pageWidth - margin, yPos);

    // Trainee Details
    yPos += 15;
    doc.setFontSize(12);
    doc.setTextColor(0, 0, 0);
    doc.setFont('helvetica', 'bold');
    doc.text('Maklumat Pelatih:', margin, yPos);
    
    yPos += 10;
    doc.setFont('helvetica', 'normal');
    doc.text('Nama: ' + name, margin, yPos);
    
    yPos += 8;
    doc.text('No. Matrik / Pendaftaran: ' + matric, margin, yPos);
    
    const now = new Date();
    yPos += 8;
    doc.text('Tarikh Amali: ' + now.toLocaleDateString('ms-MY'), margin, yPos);

    yPos += 15;
    doc.setDrawColor(51, 65, 85);
    doc.line(margin, yPos, pageWidth - margin, yPos);

    // Observation 1: AEB
    yPos += 15;
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(245, 158, 11); // Amber
    doc.text('1. Keputusan Pengujian AEB (Ultrasonic)', margin, yPos);
    
    yPos += 10;
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(0, 0, 0);
    const aebLines = doc.splitTextToSize(aeb, pageWidth - 2 * margin);
    doc.text(aebLines, margin, yPos);
    yPos += aebLines.length * 8;

    // Observation 2: QR
    yPos += 10;
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(245, 158, 11);
    doc.text('2. Keputusan Pengesanan Papan Tanda (HuskyLens QR)', margin, yPos);
    
    yPos += 10;
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(0, 0, 0);
    const qrLines = doc.splitTextToSize(qr, pageWidth - 2 * margin);
    doc.text(qrLines, margin, yPos);
    yPos += qrLines.length * 8;

    // Reflection
    yPos += 10;
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(245, 158, 11);
    doc.text('3. Soalan Refleksi', margin, yPos);
    
    yPos += 10;
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(0, 0, 0);
    const reflectionLines = doc.splitTextToSize(reflection, pageWidth - 2 * margin);
    doc.text(reflectionLines, margin, yPos);
    yPos += reflectionLines.length * 8;

    // Signature Box
    yPos += 30;
    if(yPos > 250) {
        doc.addPage();
        yPos = 30;
    }
    
    doc.setFont('helvetica', 'normal');
    doc.text('Pengesahan Pensyarah:', margin, yPos);
    
    yPos += 20;
    doc.text('......................................................', margin, yPos);
    yPos += 8;
    doc.text('(Tandatangan & Cop)', margin, yPos);

    doc.save('JobCard_Amali_ADAS_' + name.replace(/\\s+/g, '_') + '.pdf');
};
`;

content += '\n\n' + janaJobCardCode;
fs.writeFileSync(path, content, 'utf8');
console.log('Successfully appended janaJobCard to app.js');
