const chai = require('chai');
const sinon = require('sinon');
const Jimp = require('jimp');
const path = require('path');
const qrcode = require('qrcode');

const { appRootDirectory } = require('../../testConstants');
const generateQRCode = require(path.join(appRootDirectory, 'js', 'utils.js'));

const expect = chai.expect;

describe('generateQRCode', () => {
  it('should generate a QR code without a logo', async () => {
    // Create a stub for qrcode.toDataURL to simulate generating a QR code
    const toDataURLStub = sinon.stub(qrcode, 'toDataURL').resolves('fakeQRCodeDataUrl');

    // Create a stub for Jimp.read to simulate loading an image
    const jimpReadStub = sinon.stub(Jimp, 'read').resolves({});

    // Mock the qrCodeEntity
    const qrCodeEntity = {
      text: 'https://www.example.com',
      logoImagePath: null,
      qrSize: 512,
      logoSize: 150,
      outputFileName: 'test.png',
      outputDirectory: 'testDirectory',
    };

    const outputPath = await generateQRCode(qrCodeEntity);

    // Assert that the QR code generation function was called with the correct parameters
    expect(toDataURLStub.calledWith('https://www.example.com', { errorCorrectionLevel: 'H', width: 512 })).to.be.true;

    // Assert that Jimp.read was called with the correct parameters (for loading QR code image)
    expect(jimpReadStub.calledWith(sinon.match.instanceOf(Buffer))).to.be.true;

    // Assert that the output path is correct
    expect(outputPath).to.equal(path.join('testDirectory', 'test.png'));

    // Restore the stubs to their original functions
    toDataURLStub.restore();
    jimpReadStub.restore();
  });

  it('should generate a QR code with a logo', async () => {
    // Create a stub for qrcode.toDataURL to simulate generating a QR code
    const toDataURLStub = sinon.stub(qrcode, 'toDataURL').resolves('fakeQRCodeDataUrl');

    // Create a stub for Jimp.read to simulate loading an image (both for QR code and logo)
    const jimpReadStub = sinon.stub(Jimp, 'read').resolves({});

    // Mock the qrCodeEntity with a logo
    const qrCodeEntity = {
      text: 'https://www.example.com',
      logoImagePath: 'logo.png',
      qrSize: 512,
      logoSize: 150,
      outputFileName: 'test.png',
      outputDirectory: 'testDirectory',
    };

    const outputPath = await generateQRCode(qrCodeEntity);

    // Assert that the QR code generation function was called with the correct parameters
    expect(toDataURLStub.calledWith('https://www.example.com', { errorCorrectionLevel: 'H', width: 512 })).to.be.true;

    // Assert that Jimp.read was called with the correct parameters (for loading QR code image and logo)
    expect(jimpReadStub.calledTwice).to.be.true;

    // Assert that the output path is correct
    expect(outputPath).to.equal(path.join('testDirectory', 'test.png'));

    // Restore the stubs to their original functions
    toDataURLStub.restore();
    jimpReadStub.restore();
  });

  // Add more test cases as needed
});
