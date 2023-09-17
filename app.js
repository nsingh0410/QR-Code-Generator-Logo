 const express = require('express');
const QRCode = require('qrcode');
const app = express();
const port = 3000;
const fs = require('fs');
const QRCodeGenerator = require('./classes/qrcode-generator');
const qr = require('qr-image');
const path = require('path');
const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
const generateQRCode = require('./js/generate-qrcode');
const QRCodeEntity = require('./entity/Qrcode.js');
const Utils = require('./js/utils');


app.use(express.json());

// Swagger options
const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'QR Code Generator API',
      version: '1.0.0',
      description: 'Generate QR codes with logos.',
    },
    servers: [
      {
        url: 'http://localhost:3000',
        description: 'Local development server',
      },
      {
        url: 'https://internal-digiapi.skyracing.cloud',
        description: 'Prod development server',
      }
    ],
  },
  apis: ['app.js'], // Add your API file here
};

const swaggerSpec = swaggerJsdoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

/**
 * @swagger
 * /generateqr/generate-base64:
 *   post:
 *     summary: Generate a QR code base64 enoce on text.
 *     description: Generates a QR code containing the provided text.
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               text:
 *                 type: string
 *                 required: true
 *                 description: The text to encode in the QR code.
 *                 default: https://www.skyracing.com.au
 *     responses:
 *       200:
 *         description: QR code base64 generated successfully.
 *       400:
 *         description: Bad request - missing URL.
 *       500:
 *         description: Internal server error.
 */
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

/**
 * @swagger
 * /generateqr/betfriends:
 *   post:
 *     summary: Generate a QR code for betfriends.
 *     description: Generates a QR code for betfriends containing the post request input data.
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               date:
 *                 type: string
 *                 required: true
 *                 description: The date of the race. e.g. 2023-09-14.
 *                 default: 2023-09-14
 *               trackName:
 *                 type: string
 *                 required: true
 *                 description: Name of the track. e.g. NORTHFIELD-PARK
 *                 default: NORTHFIELD-PARK
 *               bravoCode:
 *                 type: string
 *                 required: true
 *                 description: The Bravo code. e.g. NFP
 *                 default: NFP
 *               racingType:
 *                 type: string
 *                 required: true
 *                 description: The Racing Type. e.g. H
 *                 default: H
 *               racingNumber:
 *                 type: string
 *                 required: true
 *                 description: The Racing Type. e.g. 1
 *                 default: 1
 *               size:
 *                 type: integer
 *                 description: The size of the QR code. Default is 512.
 *                 default: 512  
 *     responses:
 *       200:
 *         description: QR code generated successfully.
 *       400:
 *         description: Bad request - missing URL.
 *       500:
 *         description: Internal server error.
 */
app.post('/generateqr/betfriends', async (req, res) => {
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

/**
 * @swagger
 * /generateqr/meetinghub:
 *   post:
 *     summary: Generate a QR code for meetinghub.
 *     description: Generates a QR code for meetinghub containing the post request input data.
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               text:
 *                 type: string
 *                 required: true
 *                 description: text for the meeting hub @TODO.
 *                 default: https://www.skyracing.com.au
 *     responses:
 *       200:
 *         description: QR code generated successfully.
 *       400:
 *         description: Bad request - missing URL.
 *       500:
 *         description: Internal server error.
 */
app.post('/generateqr/meetinghub', async (req, res) => {
  res.json({ url : '/generateqr/meetinghub' });
});

/**
 * @swagger
 * /generateqr/generate-file-logo:
 *   post:
 *     summary: Generate a QR code with a logo and download it.
 *     description: Generate a QR code with a logo, customize its appearance, and download it as an image file.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               text:
 *                 type: string
 *                 required: true
 *                 description: The text or URL to encode in the QR code.
 *                 default: https://www.skyracing.com.au
 *               logoImagePath:
 *                 type: string
 *                 description: The path to the logo image (optional, if provided will add logo in centre).
 *                 default: images/tab-logo-white.png
 *               qrSize:
 *                 type: integer
 *                 description: The size of the QR code (optional, default is 512).
 *                 default: 512
 *               logoSize:
 *                 type: integer
 *                 description: The size of the logo on the QR code (optional, default is 150).
 *                 default: 150
 *               outputFileName:
 *                 type: string
 *                 description: The name of the output file (optional, default is 'qrcode-with-logo.png').
 *                 default: 'qrcode-with-logo.png'
 *     responses:
 *       200:
 *         description: Successfully generated and downloaded the QR code with a logo.
 *       400:
 *         description: Bad request. The 'text' parameter is required.
 *       500:
 *         description: Internal server error. Failed to generate or download the QR code with a logo.
 */
app.post('/generateqr/generate-file-logo', async (req, res) => {
  const {
    text,
    logoImagePath,
    qrSize,
    logoSize,
    outputFileName,
    outputDirectory
  } = new QRCodeEntity(
    req.body.text,
    req.body.logoImagePath,
    req.body.qrSize,
    req.body.logoSize,
    req.body.outputFileName,
    req.body.outputDirectory
  );

  if (!text) {
    return res.status(400).json({ error: 'Text is required.' });
  }
  
  try {
    // If outputDirectory is not provided, set it to the current working directory
    const filePath = await generateQRCode({
      text,
      logoImagePath,
      qrSize,
      logoSize,
      outputFileName,
      outputDirectory,
    });

    // Construct an absolute file path using path.join
    const absoluteFilePath = path.join(outputDirectory || process.cwd(), filePath);

    // Set response headers for downloading the image
    //res.setHeader('Content-Disposition', `attachment; filename="${outputFileName}"`);
   // res.setHeader('Content-Type', 'image/png');

   fs.writeFile(absoluteFilePath, filePath, 'binary', function(err) {
    res.status(200).json({ success: 'Saved Image to: ' + absoluteFilePath });
  });

    // Send the QR code image file as a downloadable file
    // res.sendFile(absoluteFilePath, (err) => {
    //   if (err) {
    //     console.error('Error sending file:', err);
    //     res.status(500).json({ error: 'Failed to send QR code file.' });
    //   }
    // });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to generate and download QR code with logo.' });
  }
});


app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});