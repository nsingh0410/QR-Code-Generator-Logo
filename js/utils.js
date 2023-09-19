class Utils {
  constructor() {
    // Define a list of characters to replace with underscores
    this.invalidChars = /[^a-zA-Z0-9-_\.]/g;
  }

  convert(url) {
    // Remove protocol and colon (e.g., http:// or https://)
    let filename = url.replace(/https?:\/\//i, '');

    // Replace special characters with underscores
    filename = filename.replace(this.invalidChars, '_');

    // Trim any trailing dots or underscores
    filename = filename.replace(/[._]+$/, '');

    return filename;
  }

  async generateAndSendQRCode(qrCodeEntity, res, generateQRCode) {
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
      res.status(500).json({ error: 'Failed to generate and download QR code with logo.' });
    }
  }
}

module.exports = Utils;
