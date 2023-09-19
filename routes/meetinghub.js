const express = require('express');
const router = express.Router();

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
router.post('/generateqr/meetinghub', async (req, res) => {
  res.json({ url : '/generateqr/meetinghub' });
});

module.exports = router;