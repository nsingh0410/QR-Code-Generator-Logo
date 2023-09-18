 const express = require('express');
const app = express();
const port = 3000;
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
        url: 'https://internal-digiapi.skyracing.cloud',
        description: 'Prod development server',
      },
      {
        url: 'http://localhost:3000',
        description: 'Local development server',
      }
      
    ],
  },
  apis: ['app.js'], // Add your API file here
};

const swaggerSpec = swaggerJsdoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

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
 *               outputDirectory:
 *                 type: string
 *                 description: The name of the output directory (optional, default is 'C:\images\').
 *                 default: 'C:\images\' 
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
  let baseurl = url;
  // Create an instance of the Utils class
  const utils = new Utils();

  const qrCodeEntity = {
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

  let date = req.body.date;
  let trackName = req.body.trackName;
  let bravoCode = req.body.bravoCode;
  let racingType = req.body.racingType;
  let racingNumber = req.body.racingNumber;

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

  if (!req.body.outputFileName) {
    // strip the base domain from the filename.
    let filename = url.replace(baseurl, '');
    // Use the Utils class to generate a valid filename based on the text (URL)
    qrCodeEntity.outputFileName = utils.convert(filename) + '.png';
  }
  
  // Create the url link.
  qrCodeEntity.text = url;

  // res.json({ url :  qrCodeEntity.outputFileName });
  // Call the reusable method to generate and send the QR code
  generateAndSendQRCode(qrCodeEntity, res);
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
 *               outputDirectory:
 *                 type: string
 *                 description: The name of the output directory (optional, default is 'C:\images\').
 *                 default: 'C:\images\'
 *     responses:
 *       200:
 *         description: Successfully generated and downloaded the QR code with a logo.
 *       400:
 *         description: Bad request. The 'text' parameter is required.
 *       500:
 *         description: Internal server error. Failed to generate or download the QR code with a logo.
 */
app.post('/generateqr/generate-file-logo', async (req, res) => {
  const qrCodeEntity = {
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
  
  // Call the reusable method to generate and send the QR code
  generateAndSendQRCode(qrCodeEntity, res);
});


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
    res.status(500).json({ error: 'Failed to generate and download QR code with logo.' });
  }
};


app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});