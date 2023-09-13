const express = require('express');
const QRCode = require('qrcode');
const app = express();
const path = require('path');
const port = 3000;
const fs = require('fs');

app.use(express.json());

app.post('/generate', (req, res) => {
  const { url } = req.body;

  if (!url) {
    return res.status(400).json({ error: 'URL is required.' });
  }

  // Create a QR code for the URL
  QRCode.toDataURL(url, (err, qrCodeURL) => {
    if (err) {
      return res.status(500).json({ error: 'Failed to generate QR code.' });
    }

    res.json({ qrCodeURL });
  });
});


app.post('/generate-file', async (req, res) => {
    const { url } = req.body;
  
    if (!url) {
      return res.status(400).json({ error: 'URL is required.' });
    }
  
    try {
      // Generate a QR code as a Buffer
      const qrCodeBuffer = await QRCode.toBuffer(url, { errorCorrectionLevel: 'H' });
  
      // Specify the file path where you want to save the downloaded QR code image
      const filePath = path.join(__dirname, 'image/qr-code.png');
  
      // Write the Buffer to a file
      fs.writeFileSync(filePath, qrCodeBuffer);
  
      // Set response headers for downloading the image
      res.setHeader('Content-Disposition', `attachment; filename="qr-code.png"`);
      res.setHeader('Content-Type', 'image/png');
  
      // Send the QR code image file as a downloadable file
      res.sendFile(filePath);
    } catch (error) {
      console.error('Error generating or sending QR code:', error);
      res.status(500).json({ error: 'Failed to generate or send QR code.' });
    }
  });

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
