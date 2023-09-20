const chai = require('chai');
const path = require('path');

// Define the root directory variable based on your project structure
const rootDirectory = path.resolve(__dirname, '..', '..', '..'); // Adjust the number of ".." to match your project structure

const MeetingHub = require(path.join(rootDirectory, 'entity', 'meetinghub.js')); // Use the rootDirectory variable
const expect = chai.expect;

describe('MeetingHub', () => {
  describe('validate', () => {
    it('should not throw an error when all required fields are provided', () => {
      const meetingHub = new MeetingHub('2023-09-13', 'SANDOWN', 'SAN', 'R', '1');
      expect(() => meetingHub.validate()).to.not.throw();
    });

    it('should throw an error when date is missing', () => {
      const meetingHub = new MeetingHub(undefined, 'SANDOWN', 'SAN', 'R', '1');
      expect(() => meetingHub.validate()).to.throw('Please enter date e.g. 2023-09-13');
    });

    // Add similar tests for other required fields
  });

  describe('link', () => {
    it('should generate a valid link', () => {
      const meetingHub = new MeetingHub('2023-09-13', 'SANDOWN', 'SAN', 'R', '1');
      const expectedLink = 'https://www.tab.com.au/racing/2023-09-13/SANDOWN/SAN/R/1';
      expect(meetingHub.link()).to.equal(expectedLink);
    });
  });

  describe('createMeetingHub', () => {
    it('should create a MeetingHub instance from request body', () => {
      const reqBody = {
        "date": "2023-09-14",
        "trackName": "NORTHFIELD-PARK",
        "bravoCode": "NFP",
        "racingType": "H",
        "racingNumber": "1",
        "logoImagePath": "images/tab-logo-white.png",
        "qrSize": 512,
        "logoSize": 150,
        "outputDirectory": "tests/images"
      };
      const meetingHub = MeetingHub.createMeetingHub(reqBody);
      expect(meetingHub).to.be.an.instanceOf(MeetingHub);
    });
  });
});
