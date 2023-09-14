const express = require('express');
const QRCode = require('qrcode');
const app = express();
const path = require('path');
const port = 3000;
const fs = require('fs');
const QRCodeGenerator = require('./classes/qrcode-generator');
app.use(express.json());


app.post('/generateqr/generate-base64', (req, res) => {
  const { text } = req.body;

  if (!text) {
    return res.status(400).json({ error: 'Text is required.' });
  }

  // Create a QR code for the URL
  QRCode.toDataURL(text, (err, qrCodeURL) => {
    if (err) {
      return res.status(500).json({ error: 'Failed to generate QR code.' });
    }

    res.json({ qrCodeURL });
  });
});

app.post('/generateqr/generate-file', async (req, res) => {
  const { text } = req.body;
  const options = {};

  options.text = text;

  if (!text) {
    return res.status(400).json({ error: 'Text is required.' });
  }

  const qrcodeGenerator = new QRCodeGenerator();
 
  let result = await qrcodeGenerator.imageByUrl(options, (err, filePath) => {
    if (err) {
      return res.status(500).json({ error: 'Failed to generate QR code.' });
    }

    // Set response headers for downloading the image
    res.setHeader('Content-Disposition', `attachment; filename="qr-code.png"`);
    res.setHeader('Content-Type', 'image/png');

    // Send the QR code image file as a downloadable file
    res.sendFile(filePath, (err) => {
      if (err) {
        console.error('Error sending file:', err);
        res.status(500).json({ error: 'Failed to send QR code file.' });
      }

      // Delete the file after sending
      fs.unlinkSync(filePath);
    });
  });
});

app.post('/generateqr/betfriends', async (req, res) => {
  //https://www.tab.com.au/racing/2023-09-13/SANDOWN/SAN/R/1
  let url = 'https://www.tab.com.au/racing/';

  let date = req.body.date;
  let trackName = req.body.trackName;
  let bravoCode = req.body.bravoCode;
  let racingType = req.body.racingType;
  let racingNumber = req.body.racingNumber;
  let filename = req.body.filename;
  let options = {};

  if (!filename) {
    filename = "qr-code.png";
  }

  if (!date) {
    return res.status(400).json({ error: 'Please enter date e.g. 2023-09-13' });
  }

  url = url + date;

  if (!trackName) {
    return res.status(400).json({ error: 'Please enter trackname e.g. SANDOWN' });
  }

  url = url + '/' + trackName;

  if (!bravoCode) {
    return res.status(400).json({ error: 'Please enter bravoCode e.g. SAN' });
  }

  url = url + '/' + bravoCode;

  if (!racingType) {
    return res.status(400).json({ error: 'Please enter racingType e.g. R' });
  }

  url = url + '/' + racingType;

  if (!racingNumber) {
    return res.status(400).json({ error: 'Please enter racingNumber e.g. 1' });
  }

  url = url + '/' + racingNumber;

  options.text = url;

  const qrcodeGenerator = new QRCodeGenerator();
 
  let result = await qrcodeGenerator.imageByUrl(options, (err, filePath) => {
    if (err) {
      return res.status(500).json({ error: 'Failed to generate QR code.' });
    }

    // Set response headers for downloading the image
    res.setHeader('Content-Disposition', `attachment; filename="${filename}"`);
    res.setHeader('Content-Type', 'image/png');

    // Send the QR code image file as a downloadable file
    res.sendFile(filePath, (err) => {
      if (err) {
        console.error('Error sending file:', err);
        res.status(500).json({ error: 'Failed to send QR code file.' });
      }

      // Delete the file after sending
      fs.unlinkSync(filePath);
    });
  });// end imageByUrl
});

app.post('/generateqr/meetinghub', async (req, res) => {
  res.json({ url : '/generateqr/meetinghub' });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
