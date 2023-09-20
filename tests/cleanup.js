const fs = require('fs');
const path = require('path');

// Define the path to the tests/images directory
const imagesDirectory = path.join(__dirname, 'images'); // Adjust the path as needed

// Read the contents of the directory
fs.readdir(imagesDirectory, (err, files) => {
  if (err) {
    console.error('Error reading directory:', err);
    return;
  }

  // Loop through the files and delete each one
  files.forEach((file) => {
    const filePath = path.join(imagesDirectory, file);

    // Check if it's a file (not a subdirectory)
    if (fs.statSync(filePath).isFile()) {
      // Delete the file
      fs.unlink(filePath, (unlinkErr) => {
        if (unlinkErr) {
          console.error('Error deleting file:', unlinkErr);
        } else {
          console.log('Deleted file:', filePath);
        }
      });
    }
  });
});
