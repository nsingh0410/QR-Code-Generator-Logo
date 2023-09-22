const path = require('path'); // Add this line to import the path module
const chai = require('chai');
const chaiHttp = require('chai-http');
const { appRootDirectory } = require('../../testConstants');
const app = require(path.join(appRootDirectory, 'src', 'app.js'));

const expect = chai.expect;
chai.use(chaiHttp);

describe('generate-file API', () => {
    it('should generate a QR code for generate file', function (done) {
      // Set a longer timeout (e.g., 5000ms)
      this.timeout(5000);
      let imageDir = appRootDirectory + '/../images';
    
      chai.request(app)
        .post('/generateqr/generate-file')
        .send({
            "text" : "https://www.skyracing.com.au",
            "logoImagePath": "images/logos/tab-logo-white.png",
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
  });
