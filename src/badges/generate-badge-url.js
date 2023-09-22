const fs = require('fs');
const path = require('path');

// Replace with the path to your lcov.info file
const lcovFilePath = path.join(__dirname + '/../' , 'coverage', 'lcov.info');
const lcovData = fs.readFileSync(lcovFilePath, 'utf-8');


// Parse the lcov data to calculate coverage
const lines = lcovData.split('\n');
let totalLines = 0;
let coveredLines = 0;

for (const line of lines) {
  if (line.startsWith('DA:')) {
    const [, hits] = line.split(',').map(Number);
    totalLines++;
    if (hits > 0) {
      coveredLines++;
    }
  }
}

// Calculate the coverage percentage
const coveragePercentage = (coveredLines / totalLines) * 100;

// Generate the badge Markdown
const badgeMarkdown = `[![Coverage](https://img.shields.io/badge/coverage-${coveragePercentage.toFixed(2)}%25-brightgreen?logo=coveralls&logoColor=white)](https://gitlab.skyracing.cloud/sky-dev-team/chrysalis/digiapi/-/blob/main/coverage/lcov-report/index.html)`;

// Read the README.md file
let readmeContent = fs.readFileSync('README.md', 'utf-8');

// Define the badge pattern
const badgePatternLine =/\[!\[Coverage\][^\]]*\]\([^)]+\)/;

// Replace the placeholder with the badge Markdown
readmeContent = readmeContent.replace(badgePatternLine, badgeMarkdown);

// Write the updated README.md back to the file
fs.writeFileSync('README.md', readmeContent);