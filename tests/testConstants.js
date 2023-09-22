const path = require('path');

// Get the directory name of the current module (this file)
const testsDirectory = __dirname;

// Define the application's root directory based on the tests directory
const appRootDirectory = path.resolve(testsDirectory, '..');

// Traverse up the directory structure until you reach the root directory of your application
const findAppRootDirectory = (currentDir) => {
  const parentDir = path.dirname(currentDir);
  
  // Check if you've reached the root directory (e.g., based on a specific folder name or file)
  if (path.basename(parentDir) === 'src') {
    return currentDir;
  }
  
  // Recursively continue searching in the parent directory
  return findAppRootDirectory(parentDir);
};

// Export the global constant
module.exports = {
  testsDirectory,
  appRootDirectory,
  findAppRootDirectory
};
