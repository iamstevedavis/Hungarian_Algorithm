/**
 * This is a test harness for running the app programatically.
 * It won't work unless we promisify the readline functionality
 * making it synchronous. This will always return an empty array.
 */


var harness = module.exports = {};

const readline = require('readline');
const fs = require('fs');
var BestSSCalculator = require('../BestSSCalculator');
let file;

/**
 * An exeption that I throw when there is an invalid argument to the function
 * @param {string} sMessage - A message about the error.
 */
function IllegalArgumentException(sMessage) {
    this.name = "IllegalArgumentException";
    this.message = sMessage;
    this.stack = (new Error()).stack;
}
IllegalArgumentException.prototype = Object.create(Error.prototype);
IllegalArgumentException.prototype.constructor = IllegalArgumentException;

harness.returnSSValuesForFile = function(filePath) {
  let results = [];

  if(!filePath || !filePath.length || !fs.existsSync(filePath)) {
    throw new IllegalArgumentException('File is required.');
  }

  // Setup a linereader to read in a file line by line
  const lineReader = readline.createInterface({
    input: fs.createReadStream(filePath)
  });

  // Calculate the bestSS for each line
  // Need to make this synchronous using promises so that we can return results correctly.
  lineReader.on('line', function (line) {
    let bestSS = BestSSCalculator.calculateBestSS(line);
    results.push(bestSS);
    console.log(results);
  });

  // Need to make synchronous or will return [];
  return results;
};
