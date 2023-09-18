class Utils {
    constructor() {
      // Define a list of characters to replace with underscores
      this.invalidChars = /[^a-zA-Z0-9-_\.]/g;
    }
  
    convert(url) {
      // Remove protocol and colon (e.g., http:// or https://)
      let filename = url.replace(/https?:\/\//i, '');
  
      // Replace special characters with underscores
      filename = filename.replace(this.invalidChars, '-');
  
      // Trim any trailing dots or underscores
      filename = filename.replace(/[._]+$/, '');
  
      return filename;
    }
  }
  
  module.exports = Utils;