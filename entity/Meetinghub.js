class MeetingHub {
  constructor(date, trackName, bravoCode, racingType, racingNumber) {
    this.date = date;
    this.trackName = trackName;
    this.bravoCode = bravoCode;
    this.racingType = racingType;
    this.racingNumber = racingNumber;
  }

  // Validator method to check if the entity meets the criteria
  validate() {
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

  link() {
    return 'https://www.tab.com.au/racing/' + this.date + '/' + this.trackName + '/' + this.bravoCode + '/' + this.racingType + '/' + this.racingNumber;
  }

  // Static method to create a MeetingHubEntity instance from request body
  static createMeetingHub(reqBody) {
    const { date, trackName, bravoCode, racingType, racingNumber } = reqBody;
    return new MeetingHub(date, trackName, bravoCode, racingType, racingNumber);
  }
}
  
  module.exports = MeetingHub;
  