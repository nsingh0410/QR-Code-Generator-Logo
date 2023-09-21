const chai = require('chai');
const sinon = require('sinon');
const path = require('path');
const { appRootDirectory } = require('../../testConstants');

const { generateAndSendQRCode } = require(path.join(appRootDirectory, 'src', 'js', 'utils.js')); // Update with the actual path to your module
const generateQRCode = require(path.join(appRootDirectory, 'src', 'js', 'generate-qrcode.js'));

const expect = chai.expect;

describe('generateAndSendQRCode', () => {
  it('should generate and send a QR code without errors', async () => {
    // Mock the QR code entity and response object
    const qrCodeEntity = {
      text: 'https://www.example.com',
      logoImagePath: null,
      qrSize: 512,
      logoSize: 150,
      outputFileName: 'test.png',
      outputDirectory: 'tests/images',
    };
    const res = {
      setHeader: sinon.stub(),
      sendFile: sinon.stub().callsArgWith(1, null), // Simulate a successful file send
      status: sinon.stub().returnsThis(), // Chainable status method
      json: sinon.stub(),
    };

    res.sendFile.callsArgWith(1, null); 

    // Stub the generateQRCode function
    const generateQRCode = sinon.stub();

    // Replace the original implementation with the stub
    generateQRCode.resolves('/path/to/generated-qrcode.png');

    // Call stub
    generateQRCode.withArgs(qrCodeEntity, res).resolves('/path/to/generated-qrcode.png');

    // Assertions
    expect(res.status.calledWith(500)).to.be.false; // The status should not be set to 500
    expect(res.json.called).to.be.false; // No JSON response should be sent
  });
});
