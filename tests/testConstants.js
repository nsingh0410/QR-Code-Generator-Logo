const path = require('path');

// Get the directory name of the current module (this file)
const testsDirectory = __dirname;

// Define the application's root directory based on the tests directory
const appRootDirectory = path.resolve(testsDirectory, '..');

// Export the global constant
module.exports = {
  testsDirectory,
  appRootDirectory
};
