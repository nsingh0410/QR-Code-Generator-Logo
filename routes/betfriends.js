const express = require('express');
const router = express.Router();
const QRCodeEntity = require('../entity/Qrcode.js');
const MeetingHubEntity = require('../entity/Meetinghub.js');
const Utils = require('../js/utils');
const generateQRCode = require('../js/generate-qrcode');
const utils = new Utils();

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
router.post('/generateqr/betfriends', async (req, res) => {
  let url = 'https://www.tab.com.au/racing/';
  let baseurl = url;

  // Create an instance of createQRCodeEntity and MeetingHubEntity
  const qrCodeEntity = QRCodeEntity.createQRCodeEntity(req.body);
  const meetingHubEntity = MeetingHubEntity.createMeetingHubEntity(req.body);

  try {
    // Validate the entity to check if it meets the criteria
    meetingHubEntity.validate();
   
    // If validation passes, proceed with generating and sending the QR code
    qrCodeEntity.text = meetingHubEntity.link();

    // if we dont specify the output name, generate one.
    if (!req.body.outputFileName) {
      // Use the Utils class to generate a valid filename based on the text (URL)
      let url = qrCodeEntity.text;
      let filename = url.replace(baseurl, '');
      qrCodeEntity.outputFileName = utils.convert(filename) + '.png';
    }

    // Call the reusable method to generate and send the QR code
    await utils.generateAndSendQRCode(qrCodeEntity, res, generateQRCode);
  } catch (error) {
    console.error(error.message);
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;
