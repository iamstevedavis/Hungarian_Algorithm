/**
 * Entry point for the application. This will read in the file passed line by line
 * calling BestSSCalculator on each line to solve for the best SS. It then outputs
 * the value.
 *
 * @summary   Entry point to Best SS Solver application.
 *
 * @requires ./BestSSCalculator
 */

const fs = require('fs');
var BestSSCalculator = require('./BestSSCalculator');
let file;

file = process.argv[2];

if (!file || !fs.existsSync(file)) {
  console.log('File path is required.');
  process.exit(0);
}

// Setup a linereader to read in a file line by line
const lineReader = require('readline').createInterface({
  input: fs.createReadStream(file)
});

// Calculate the bestSS for each line
lineReader.on('line', function (line) {
  let bestSS
  try {
    bestSS = BestSSCalculator.calculateBestSS(line);
  } catch(e) {
    // Handle exceptions.
    switch(e.name) {
      case 'IllegalArgumentException':
        console.log('Error => ', e.message);
        break;
      default:
        console.log('Unknown Error => ', e);
    }
    process.exit(0);
  }
  // Output with padding
  console.log(bestSS.toFixed(2));
});
