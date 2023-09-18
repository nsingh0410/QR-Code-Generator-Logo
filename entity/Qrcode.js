// QRCodeEntity.js
class QRCodeEntity {
    constructor(text = '', logoImagePath, qrSize = 512, logoSize = 150, outputFileName = 'qrcode-with-logo.png', outputDirectory = '') {
      this.text = text;
      this.logoImagePath = logoImagePath;
      this.qrSize = qrSize;
      this.logoSize = logoSize;
      this.outputFileName = outputFileName;
      this.outputDirectory = outputDirectory;
    }
}

module.exports = QRCodeEntity;