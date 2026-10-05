const { Jimp } = require('jimp');
const fs = require('fs');
const path = require('path');

const srcImg = 'C:\\Users\\palie\\.gemini\\antigravity-ide\\brain\\b9213d42-11c3-43fd-9500-b936004182e6\\.user_uploaded\\media_1791175499772.png';
const destImg = 'd:\\Mipac Tvet\\Modul ADAS\\assets\\huskylens_ai.jpg';

async function processImage() {
    try {
        console.log('Reading ' + srcImg);
        const image = await Jimp.read(srcImg);
        
        // Let's check image dimensions
        const w = image.bitmap.width;
        const h = image.bitmap.height;
        console.log('Original size: ' + w + 'x' + h);
        
        // The DFRobot logo is at the top left. The device is in the center-bottom.
        // We will crop it tightly around the device. Assuming device is roughly at (x: 250, y: 350, w: 600, h: 450)
        // Let's just crop the bottom 2/3 of the image, then resize.
        const cropY = Math.floor(h * 0.35);
        const cropH = h - cropY;
        
        image.crop({ x: 0, y: cropY, w: w, h: cropH });
        image.resize({ w: 400 });
        
        await image.write(destImg);
        console.log('Successfully replaced huskylens_ai.jpg');
    } catch (err) {
        console.error('Error processing image:', err);
    }
}

processImage();
