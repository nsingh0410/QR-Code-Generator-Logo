const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('./app'); // Replace with the actual path to your app.js file

const expect = chai.expect;
chai.use(chaiHttp);

describe('QR Code Generator API', () => {
  describe('POST /generateqr/betfriends', () => {
    it('should generate a QR code for betfriends', (done) => {
      chai.request(app)
        .post('/generateqr/betfriends')
        .send({
            "date": "2023-09-14",
            "trackName": "NORTHFIELD-PARK",
            "bravoCode": "NFP",
            "racingType": "H",
            "racingNumber": "1",
            "logoImagePath": "images/tab-logo-white.png",
            "qrSize": 512,
            "logoSize": 150,
            "outputDirectory": "test/images"
          })
        .end((err, res) => {
          expect(err).to.be.null;
          expect(res).to.have.status(200);
          // You can add more assertions as needed
          done();
        });
    });

    it('should return a 400 Bad Request if required fields are missing', (done) => {
      chai.request(app)
        .post('/generateqr/betfriends')
        .send({})
        .end((err, res) => {
          expect(err).to.be.null;
          expect(res).to.have.status(400);
          // You can add more assertions as needed
          done();
        });
    });
  });

  describe('POST /generateqr/generate-file-logo', () => {
    it('should generate a QR code with a logo and download it', (done) => {
      chai.request(app)
        .post('/generateqr/generate-file-logo')
        .send({
          "text": "https://www.skyracing.com.au",
          "logoImagePath": "images/tab-logo-white.png",
          "qrSize": 512,
          "logoSize": 150,
          "outputFileName": "custom-qrcode.png",
          "outputDirectory": "test/images"
        })
        .end((err, res) => {
          expect(err).to.be.null;
          expect(res).to.have.status(200);
          // You can add more assertions as needed
          done();
        });
    });
  
    it('should return a 400 Bad Request if the text parameter is missing', (done) => {
      chai.request(app)
        .post('/generateqr/generate-file-logo')
        .send({
          "logoImagePath": "images/tab-logo-white.png",
          "qrSize": 512,
          "logoSize": 150,
          "outputFileName": "test-qrcode.png",
          "outputDirectory": "test/images"
        })
        .end((err, res) => {
          expect(err).to.be.null;
          expect(res).to.have.status(400);
          // You can add more assertions as needed
          done();
        });
    });
  });  

  describe('POST /generateqr/meetinghub', () => {
    it('should generate a QR code for meetinghub', (done) => {
      chai.request(app)
        .post('/generateqr/meetinghub')
        .send({
          "text": "https://www.skyracing.com.au"
        })
        .end((err, res) => {
          expect(err).to.be.null;
          expect(res).to.have.status(200);
          // You can add more assertions as needed
          done();
        });
    });
  });  

});
