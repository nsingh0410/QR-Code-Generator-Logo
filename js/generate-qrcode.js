const qrcode = require('qrcode');
const Jimp = require('jimp');
const fs = require('fs');
const path = require('path');

const generateQRCode = async (qrCodeEntity) => {
  try {
    // Destructure properties from the QRCodeEntity instance
    const { text, logoImagePath, qrSize, logoSize, outputFileName, outputDirectory } = qrCodeEntity;

    // Generate the QR code
    const qrCode = await qrcode.toDataURL(text, { errorCorrectionLevel: 'H', width: qrSize });

    // Load the QR code image using the generated data URL
    const qrImage = await Jimp.read(Buffer.from(qrCode.replace('data:image/png;base64,', ''), 'base64'));

    if (logoImagePath) {
      // Load the logo image using the provided logoImagePath
      const logo = await Jimp.read(logoImagePath);

      // Resize the logo to fit within the specified size
      logo.resize(logoSize, logoSize);

      // Calculate the position to center the resized logo on the QR code
      const centerX = (qrSize - logo.bitmap.width) / 2;
      const centerY = (qrSize - logo.bitmap.height) / 2;

      // Composite the logo onto the QR code
      qrImage.composite(logo, centerX, centerY);
    }

    // Set the output path
    const outputPath = path.join(outputDirectory || '', outputFileName);

    // Write the composite image to the output file
    await qrImage.writeAsync(outputPath);

    return outputPath;
  } catch (error) {
    console.error('Error generating QR code with logo:', error);
    throw error;
  }
};

module.exports = generateQRCode;
