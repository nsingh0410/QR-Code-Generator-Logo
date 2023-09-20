// const chai = require('chai');
// const sinon = require('sinon');
// const { generateAndSendQRCode } = require('../../../js/utils'); // Update with the actual path to your module
// const path = require('path');

// const { appRootDirectory } = require('../../testConstants');
// const generateQRCode = require(path.join(appRootDirectory, 'js', 'generate-qrcode.js'));

// const expect = chai.expect;

// describe('generateAndSendQRCode', () => {
//   it('should generate and send a QR code without errors', async () => {
//     // Mock the QR code entity and response object
//     const qrCodeEntity = {
//       text: 'https://www.example.com',
//       logoImagePath: null,
//       qrSize: 512,
//       logoSize: 150,
//       outputFileName: 'test.png',
//     };
//     const res = {
//       setHeader: sinon.stub(),
//       sendFile: sinon.stub().callsArgWith(1, null), // Simulate a successful file send
//       status: sinon.stub().returnsThis(), // Chainable status method
//       json: sinon.stub(),
//     };

//     // Stub the generateQRCode function to return a file path
//     sinon.stub(generateQRCode.generateQRCode, 'generateQRCode').resolves('/path/to/generated-qrcode.png');

//     // Call the function
//     await generateAndSendQRCode(qrCodeEntity, res);

//     // Assertions
//     expect(res.status.calledWith(500)).to.be.false; // The status should not be set to 500
//     expect(res.json.called).to.be.false; // No JSON response should be sent
//     expect(res.sendFile.calledWith('/path/to/generated-qrcode.png')).to.be.true; // Check if sendFile was called with the correct file path

//     // Restore the stubs
//     generateQRCode.generateQRCode.restore();
//   });

//   it('should handle errors and send a 500 response', async () => {
//     // Mock the QR code entity and response object
//     const qrCodeEntity = {
//       text: 'https://www.example.com',
//       logoImagePath: null,
//       qrSize: 512,
//       logoSize: 150,
//       outputFileName: 'test.png',
//     };
//     const res = {
//       setHeader: sinon.stub(),
//       sendFile: sinon.stub().callsArgWith(1, new Error('Failed to send file')), // Simulate an error during file send
//       status: sinon.stub().returnsThis(), // Chainable status method
//       json: sinon.stub(),
//     };

//     // Stub the generateQRCode function to throw an error
//     sinon.stub(generateQRCode, 'generateQRCode').rejects(new Error('Failed to generate QR code'));

//     // Call the function
//     await generateAndSendQRCode(qrCodeEntity, res);

//     // Assertions
//     expect(res.status.calledWith(500)).to.be.true; // Check if status was set to 500
//     expect(res.json.calledWith({ error: 'Failed to generate and send QR code.' })).to.be.true; // Check if JSON response contains the error message

//     // Restore the stubs
//     generateQRCode.generateQRCode.restore();
//   });
// });
