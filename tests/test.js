var should = require('should');
var expect = require('chai').expect;
var BestSSCalculator = require('../BestSSCalculator');

describe('Calculate Best Combined SS', function() {
  describe('The BestSSCalculator', function () {
    it('should handle happy path', function() {
      let bestSS = BestSSCalculator.calculateBestSS('Jack Abraham,John Evans,Ted Dziuba;iPad 2 - 4-pack,Girl Scouts Thin Mints,Nerf Crossbow');
      bestSS.should.equal(21);
    });

    it('should throw an error on garbage input', function() {
      let error;
      try {
        BestSSCalculator.calculateBestSS('asd78687y87y');
      } catch (e) {
        error = e;
      }
      expect(error.name).to.exist.and.equal('IllegalArgumentException');
    });

    it('should throw an error on input with no products', function() {
      let error;
      try {
        BestSSCalculator.calculateBestSS('John Johnson,Jimmy the Tulip;');
      } catch (e) {
        error = e;
      }
      expect(error.name).to.exist.and.equal('IllegalArgumentException');
    });

    it('should throw an error on input with no names', function() {
      let error;
      try {
        BestSSCalculator.calculateBestSS(';Super Mega Awesome Ultra');
      } catch (e) {
        error = e;
      }
      expect(error.name).to.exist.and.equal('IllegalArgumentException');
    });

    it('should throw an error on input with no names', function() {
      let error;
      try {
        BestSSCalculator.calculateBestSS(';');
      } catch (e) {
        error = e;
      }
      expect(error.name).to.exist.and.equal('IllegalArgumentException');
    });
  });

  describe('The BestSSCalculator Class', function () {
    it('should contain only one exposed function', function () {
      for (var name in BestSSCalculator) {
        if (BestSSCalculator.hasOwnProperty(name)) {
          name.should.equal('calculateBestSS');
        }
      }
    });
  });

  // The test harness won't work until we promisify the readline functionality.
  // Otherwise, it will always return an empty array.
  describe.skip('The App', function () {
    it('should handle happy path', function() {
      let harness = require('./harness');
      harness.setFilePath('./tests/files/testfile');
      let result = harness.returnSSValuesForFile();
    });

    it('should exit if no file passed', function () {
      let app = require('../app');
      try {
        app.programaticEntrance();
      } catch (e) {
        e.name.should.equal('IllegalArgumentException');
      }
    });
  });
});
