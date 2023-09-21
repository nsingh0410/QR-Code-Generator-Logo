const generateQRCode = require('../js/generate-qrcode');

const generateAndSendQRCode = async (qrCodeEntity, res) => {
  try {
    // Generate the QR code image file using qrCodeEntity
    const filePath = await generateQRCode(qrCodeEntity);

    // Set response headers for downloading the image
    res.setHeader('Content-Disposition', `attachment; filename="${qrCodeEntity.outputFileName}"`);
    res.setHeader('Content-Type', 'image/png');

    // Send the QR code image file as a downloadable file
    res.sendFile(filePath, (err) => {
      if (err) {
        console.error('Error sending file:', err);
        res.status(500).json({ error: 'Failed to send QR code file.' });
      }
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to generate and send QR code.' });
  }
};

module.exports = { generateAndSendQRCode };
