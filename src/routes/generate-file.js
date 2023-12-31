const express = require('express');
const router = express.Router();
const QRCode = require('../entity/Qrcode.js');
const { generateAndSendQRCode } = require('../js/utils');

/**
 * @swagger
 * /generateqr/generate-file:
 *   post:
 *     summary: Generate a QR code with a logo and download it.
 *     description: Generate a QR code with a logo, customize its appearance, and download it as an image file.
 *     tags:
 *       - QR Code Generator
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
 *                 default: https://www.google.com
 *               logoImagePath:
 *                 type: string
 *                 description: The path to the logo image (optional, if provided will add logo in centre).
 *                 default: src/images/logos/laugh.png
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
router.post('/generateqr/generate-file', async (req, res) => {
  
  // Create an instance of createQRCodeEntity
  const qrCodeEntity = QRCode.createQRCode(req.body);

  try {
    // Validate the entity to check if it meets the criteria
    qrCodeEntity.validate();
   
    // Call the reusable method to generate and send the QR code
    await generateAndSendQRCode(qrCodeEntity, res);
  } catch (error) {
    console.error(error.message);
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;