const path = require('path'); // Add this line to import the path module
const appDirectory = path.resolve(__dirname);
const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../app'); // Replace with the actual path to your app.js file

const expect = chai.expect;
chai.use(chaiHttp);

describe('Betfriends API', () => {
    it('should generate a QR code for betfriends', function (done) {
      // Set a longer timeout (e.g., 5000ms)
      this.timeout(5000);
      let imageDir = appDirectory + '/images';
    
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
            "outputDirectory": imageDir
        })
        .end((err, res) => {
          expect(err).to.be.null;
          expect(res).to.have.status(200);
          // You can add more assertions as needed
          done();
        });
    });
  
    // Add other test cases here
  });
