const chai = require('chai');
const path = require('path');

const { appRootDirectory } = require('../../testConstants');
const Betfriends = require(path.join(appRootDirectory, 'entity', 'betfriends.js'));

const expect = chai.expect;

describe('Betfriends', () => {
  describe('validate', () => {
    it('should not throw an error when all required fields are provided', () => {
      const betfriends = new Betfriends('2023-09-13', 'SANDOWN', 'SAN', 'R', '1');
      expect(() => betfriends.validate()).to.not.throw();
    });

    it('should throw an error when date is missing', () => {
      const betfriends = new Betfriends(undefined, 'SANDOWN', 'SAN', 'R', '1');
      expect(() => betfriends.validate()).to.throw('Please enter date e.g. 2023-09-13');
    });

    // Add similar tests for other required fields
  });

  describe('link', () => {
    it('should generate a valid link', () => {
      const betfriends = new Betfriends('2023-09-13', 'SANDOWN', 'SAN', 'R', '1');
      const expectedLink = 'https://www.tab.com.au/racing/2023-09-13/SANDOWN/SAN/R/1';
      expect(betfriends.link()).to.equal(expectedLink);
    });
  });

  describe('filename', () => {
    it('should generate a valid filename', () => {
      const betfriends = new Betfriends('2023-09-13', 'SANDOWN', 'SAN', 'R', '1');
      const expectedFilename = '20230913-SANR1';
      expect(betfriends.filename()).to.equal(expectedFilename);
    });
  });

  describe('createBetfriends', () => {
    it('should create a Betfriends instance from request body', () => {
      const reqBody = {
        "date": "2023-09-14",
        "trackName": "NORTHFIELD-PARK",
        "bravoCode": "NFP",
        "racingType": "H",
        "racingNumber": "1",
        "logoImagePath": "images/logos/tab-logo-white.png",
        "qrSize": 512,
        "logoSize": 150,
        "outputDirectory": 'tests/images'
    };
      const betfriends = Betfriends.createBetfriends(reqBody);
      expect(betfriends).to.be.an.instanceOf(Betfriends);
    });
  });
});
