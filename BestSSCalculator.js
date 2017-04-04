/**
 * This class exposes one function that can be called to solve for the best
 * SS value. It uses the munkres-js module for hungarian algorithm implementation.
 *
 * @summary   Class to solve for the best SS value.
 *
 * @requires munkres-js
 * @class
 */

var BestSSCalculator = module.exports = {};

/**
 * This library was not created by me. This library was created by addaleax.
 * https://www.npmjs.com/package/munkres-js
 * This library provides a javascript implementation of the Hungarian algorithm.
 * You can visit the above link for more details about this module and its implementation.
 */
var Munkres = require('munkres-js');

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

/**
 * Calculate the greatest common divisor for two numbers
 * Credit to http://pages.pacificcoast.net/~cazelais/euclid.html
 * @param {int} a - A number.
 * @param {int} b - A number.
 * @return {int} The gcd.
 */
function gcd(a,b) {
  if (b == 0) {
    return a;
  } else {
    return gcd(b, a % b);
  }
};

/**
 * Return the number of vowels in a given string. Had to include y to get the correct values.
 * @param {string} str - A string to count vowels for.
 * @return {int} Vowel count.
 */
function getVowels(str) {
  var m = str.match(/[aeiouy]/gi);
  return m === null ? 0 : m.length;
};

/**
 * Return the number of consonants in a given string.
 * @param {string} str - A string to count consonants for.
 * @return {int} Consonant count.
 */
function getConsonants(str) {
  var m = str.match(/[bcdfghjklmnpqrstvwxz]/gi);
  return m === null ? 0 : m.length;
};

/**
 * Calculate the SS (Suitability Score) of a product for a customer
 * @param {string} name - A customer name.
 * @param {string} product - A product name.
 * @return {array} The SS value for the product for the given customer.
 */
function calculateSS(name, product) {
  let SSValue = 0;
  let productLength = product.toLowerCase().replace(/[^a-z]/gi, "").length;
  let nameLength = name.toLowerCase().replace(/[^a-z]/gi, "").length;

  // Check if the product name length is even or odd
  if(productLength % 2 == 0) {
    // On even we count vowels and multiple by 1.5
    SSValue = getVowels(name.toLowerCase()) * 1.5;
  } else {
    // On odd we count consonants
    SSValue = getConsonants(name.toLowerCase());
  }

  // Calculate the greatest common divisor and check if it is greater than 1
  if(gcd(nameLength, productLength) > 1) {
    // It was greater than one so multiple the SS value by 1.5
    SSValue = SSValue * 1.5;
  }

  return SSValue;
};

/**
 * Create a multi dimensional array that we can pass into Munkres
 * @param {array} names - An array of the customer names.
 * @param {array} products - An array of the products.
 * @return {array} The matrix.
 */
function createMatrixArray(names, products) {
  let matrixArray = [];
  names.forEach(function (name) {
    let customerLine = [];
    products.forEach(function (product){
      // Since the hungarian algorithm is designed to find the LEAST cost solution
      // we need to pass in all the numbers as negative values to find the max.
      // http://stackoverflow.com/questions/17520691/can-i-use-the-hungarian-algorithm-to-find-max-cost
      customerLine.push(-calculateSS(name, product));
    });
    matrixArray.push(customerLine);
  });
  return matrixArray;
};

/**
 * Calculate the best possible SS score for a set of users and products.
 * @param {string} string - A single string that contains customers and products.
 *  For Example -> 'Jack Abraham,John Evans,Ted Dziuba;iPad 2 - 4-pack,Girl Scouts Thin Mints,Nerf Crossbow'
 * @return {int} The total SS score for the given string.
 */
BestSSCalculator.calculateBestSS = function(string) {
  let names;
  let products;
  let sSMatrix;
  let indices = [];
  let total = 0;
  let munk = new Munkres.Munkres();

  // Get all the names and products into their own arrays
  string.split(';').forEach(function _assignNamesAndProducts(arraySection, index) {
    if(index == 0 && arraySection.length) {
      names = arraySection.split(',');
    } else if (index == 1 && arraySection.length) {
      products = arraySection.split(',');
    } else {
      throw new IllegalArgumentException('File may be malformed.');
    }
  });

  // Do some basic input checking on names
  if (!names || names.length == 0) {
    throw new IllegalArgumentException('Customer names are required. File may be malformed.');
  }

  // Do some basic input checking on products
  if(!products || products.length == 0) {
    throw new IllegalArgumentException('Could not find products. File may be malformed.');
  }

  // Get the ss matrix for the names and products
  sSMatrix = createMatrixArray(names, products);
  // Get the locations of what product goes to each customer in the matrix
  indices = munk.compute(sSMatrix);

  // Add up the total ss values based on the indices
  for (var i = 0; i < indices.length; ++i) {
    var row = indices[i][0], col = indices[i][1];
    var value = sSMatrix[row][col];
    total += value;
  }

  // Return the total (convert back to positive)
  return -total;
};
