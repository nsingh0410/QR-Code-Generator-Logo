const qrcode = require('qrcode');
const { createCanvas, loadImage } = require('canvas');
const fs = require('fs');
const path = require('path');

const generateQRCode = async (qrCodeEntity) => {
  try {
    // Destructure properties from the QRCodeEntity instance
    const { text, logoImagePath, qrSize, logoSize, outputFileName, outputDirectory } = qrCodeEntity;
    
    // Generate the QR code
    const qrCode = await qrcode.toDataURL(text, { errorCorrectionLevel: 'H', width: qrSize });

    // Load the logo image using the provided logoImagePath
    const canvas = createCanvas(qrSize, qrSize);
    const ctx = canvas.getContext('2d');
    const qrImage = await loadImage(qrCode);

    if (logoImagePath) {
      const logo = await loadImage(logoImagePath);

      // Calculate the position to center the resized logo on the QR code
      const centerX = (qrSize - logoSize) / 2;
      const centerY = (qrSize - logoSize) / 2;

      // Draw the QR code on the canvas
      ctx.drawImage(qrImage, 0, 0, qrSize, qrSize);

      // Draw the resized logo on the canvas
      ctx.drawImage(logo, centerX, centerY, logoSize, logoSize);
    } else {
      // If no logoImagePath is provided, only draw the QR code
      ctx.drawImage(qrImage, 0, 0, qrSize, qrSize);
    }

    // Save the canvas as an image file
    const stream = canvas.createPNGStream();
    //const fileStream = fs.createWriteStream(outputFileName);
    let fileStream = fs.createWriteStream(`${outputFileName}`);
    if (outputDirectory) {
      console.log(`${outputDirectory}${outputFileName}`);
       fileStream = fs.createWriteStream(`${outputDirectory}${outputFileName}`);
    }

    return new Promise((resolve, reject) => {
      stream.pipe(fileStream);
      stream.on('end', () => {
        resolve(outputFileName);
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

module.exports = generateQRCode;
