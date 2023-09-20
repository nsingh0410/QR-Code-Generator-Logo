require('dotenv').config();

class QRCode {
  constructor(text, logoImagePath, qrSize = 512, logoSize = 150, outputFileName = 'qrcode-with-logo.png', outputDirectory = '') {
    this.text = text;
    this.logoImagePath = logoImagePath;
    this.qrSize = qrSize;
    this.logoSize = logoSize;
    this.outputFileName = outputFileName;
    this.outputDirectory = outputDirectory || process.env.QRCODE_OUTPUT_DIRECTORY || '';
    
  }

  // Validator method to check if the entity meets the criteria
  validate() {
    if (!this.text) {
      throw new Error('Please enter text e.g. https://www.skyracing.com.au');
    }
  }

  // Static method to create a QRCodeEntity instance from request body
  static createQRCode(reqBody) {
    const { text, logoImagePath, qrSize, logoSize, outputFileName, outputDirectory } = reqBody;
    return new QRCode(text, logoImagePath, qrSize, logoSize, outputFileName, outputDirectory);
  }
}

module.exports = QRCode;