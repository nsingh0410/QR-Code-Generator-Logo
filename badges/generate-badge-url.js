const fs = require('fs');
const path = require('path');

// Replace with the path to your lcov.info file
const lcovFilePath = path.join(__dirname + '/../' , 'coverage', 'lcov.info');
const lcovData = fs.readFileSync(lcovFilePath, 'utf-8');

// Split the lcovData into lines
const lines = lcovData.split('\n');

// Initialize coverage summary
const coverageSummary = {
  lines: { total: 0, covered: 0, skipped: 0, pct: 100 },
  functions: { total: 0, covered: 0, skipped: 0, pct: 100 },
  branches: { total: 0, covered: 0, skipped: 0, pct: 100 },
};

// Iterate through the lines
lines.forEach((line) => {
  if (line.startsWith('DA:')) {
    // Line with coverage data
    const [, hits, total] = line.match(/DA:(\d+),(\d+)/);
    coverageSummary.lines.total += parseInt(total);
    coverageSummary.lines.covered += parseInt(hits);
  } else if (line.startsWith('BRDA:')) {
    // Line with branch coverage data
    const [, hits, total] = line.match(/BRDA:(\d+),(\d+),\d+,\d+/);
    coverageSummary.branches.total += parseInt(total);
    coverageSummary.branches.covered += parseInt(hits);
  } else if (line.startsWith('FNDA:')) {
    // Line with function coverage data
    const [, hits, total] = line.match(/FNDA:(\d+),(\d+)/);
    coverageSummary.functions.total += parseInt(total);
    coverageSummary.functions.covered += parseInt(hits);
  }
});

// Calculate percentages
const calculatePercentage = (covered, total) => (total > 0 ? (covered / total) * 100 : 100);
coverageSummary.lines.pct = calculatePercentage(coverageSummary.lines.covered, coverageSummary.lines.total);
coverageSummary.functions.pct = calculatePercentage(coverageSummary.functions.covered, coverageSummary.functions.total);
coverageSummary.branches.pct = calculatePercentage(coverageSummary.branches.covered, coverageSummary.branches.total);

// Output the coverage summary as JSON
const summaryJSON = JSON.stringify(coverageSummary, null, 2);
fs.writeFileSync('coverage-summary.json', summaryJSON);

console.log('Coverage summary written to coverage-summary.json');

// Function to generate the badge Markdown
function generateBadgeMarkdown(coverage) {
  return `[![Coverage](https://img.shields.io/badge/coverage-${coverage}%25-brightgreen)](lcov-report/index.html)`;
}

// Get the coverage percentage
const coverage = getCoveragePercentage();

// Generate and display the badge Markdown
const badgeMarkdown = generateBadgeMarkdown(coverage);
console.log(badgeMarkdown);
