const qrcode = require('qrcode');
const { createCanvas, loadImage } = require('canvas');
const fs = require('fs');
const path = require('path');

const generateQRCodeWithLogo = async (text, logoImagePath = 'images/tab-logo.png', qrSize = 512, logoSize = 50, outputFilePath = 'qrcode-with-logo.png') => {
    try {
        // Generate the QR code
        const qrCode = await qrcode.toDataURL(text, { errorCorrectionLevel: 'H', width: qrSize });
    
        // Load the logo image using the provided logoImagePath
        const canvas = createCanvas(qrSize, qrSize);
        const ctx = canvas.getContext('2d');
        const qrImage = await loadImage(qrCode);
        const logo = await loadImage(logoImagePath);
    
        // Draw the QR code on the canvas
        ctx.drawImage(qrImage, 0, 0, qrSize, qrSize);
    
        // Calculate the position to center the resized logo on the QR code
        const centerX = (qrSize - logoSize) / 2;
        const centerY = (qrSize - logoSize) / 2;
    
        // Draw the resized logo on the canvas
        ctx.drawImage(logo, centerX, centerY, logoSize, logoSize);
    
        // Save the canvas as an image file
        const stream = canvas.createPNGStream();
        const fileStream = fs.createWriteStream(outputFilePath);
    
        return new Promise((resolve, reject) => {
          stream.pipe(fileStream);
          stream.on('end', () => {
            resolve(outputFilePath);
          });
          stream.on('error', (error) => {
            reject(error);
          });
        });
      } catch (error) {
        console.error('Error generating QR code with logo:', error);
        throw error;
      }
};

module.exports = generateQRCodeWithLogo;
