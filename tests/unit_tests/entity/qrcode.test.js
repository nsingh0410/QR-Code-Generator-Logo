const chai = require('chai');
const path = require('path');

const { appRootDirectory } = require('../../testConstants');
const QRCode = require(path.join(appRootDirectory, 'entity', 'qrcode.js')); // Use the rootDirectory variable
const expect = chai.expect;

describe('QRCode', () => {
  describe('validate', () => {
    it('should not throw an error when all required fields are provided', () => {
      const qrCode = new QRCode('https://www.example.com', 'images/logo.png');
      expect(() => qrCode.validate()).to.not.throw();
    });

    it('should throw an error when text is missing', () => {
      const qrCode = new QRCode(undefined, 'images/logo.png');
      expect(() => qrCode.validate()).to.throw('Please enter text e.g. https://www.skyracing.com.au');
    });

    // Add similar tests for other required fields
  });

  describe('createQRCode', () => {
    it('should create a QRCode instance from request body', () => {
      const reqBody = {
        "text": "https://www.example.com",
        "logoImagePath": "images/logo.png",
        "qrSize": 512,
        "logoSize": 150,
        "outputFileName": "qrcode-with-logo.png",
        "outputDirectory": "tests/images"
      };
      const qrCode = QRCode.createQRCode(reqBody);
      expect(qrCode).to.be.an.instanceOf(QRCode);
    });
  });
});
