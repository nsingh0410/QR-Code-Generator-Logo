const QRCode = require('./Qrcode');

class Betfriends extends QRCode {
  constructor(date = '', trackName, bravoCode, racingType, racingNumber, logoImagePath, outputDirectory) {
    super(
      'https://www.tab.com.au/racing/' + date + '/' + trackName + '/' + bravoCode + '/' + racingType + '/' + racingNumber, // link
      logoImagePath,
      undefined, // Parent qrSize
      undefined, // Parent logoSize
      date.replace(/-/g, '') + '_' + bravoCode + racingType + racingNumber + '.png', // filename 
      outputDirectory
    );

    this.date = date;
    this.trackName = trackName;
    this.bravoCode = bravoCode;
    this.racingType = racingType;
    this.racingNumber = racingNumber;
  }

  // Validator method to check if the entity meets the criteria
  validate() {
    super.validate(); // Call the validate method of the parent class

    if (!this.date) {
      throw new Error('Please enter date e.g. 2023-09-13');
    }

    if (!this.trackName) {
      throw new Error('Please enter trackname e.g. SANDOWN');
    }

    if (!this.bravoCode) {
      throw new Error('Please enter bravoCode e.g. SAN');
    }

    if (!this.racingType) {
      throw new Error('Please enter racingType e.g. R');
    }

    if (!this.racingNumber) {
      throw new Error('Please enter racingNumber e.g. 1');
    }
  }

  // Static method to create a Betfriends instance from request body
  static createBetfriends(reqBody) {
    const { date, trackName, bravoCode, racingType, racingNumber, logoImagePath, outputDirectory} = reqBody;
    return new Betfriends(date, trackName, bravoCode, racingType, racingNumber, logoImagePath, outputDirectory);
  }
}

module.exports = Betfriends;
