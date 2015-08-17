var Util = require('../lib/Util');

describe('Util', function() {
  describe('normalize', function() {
    it('scales an array of numbers to -1 and 1', function() {
      var normalized = Util.normalize(_.range(-1000, 1000));
      _.max(normalized).should.equal(1);
      _.min(normalized).should.equal(-1);
    });

    it('works with positive numbers', function() {
      var normalized = Util.normalize(_.range(0, 1000));
      _.max(normalized).should.equal(1);
      _.min(normalized).should.equal(-1);
    });

    it('works with negative numbers', function() {
      var normalized = Util.normalize(_.range(-1000, 0));
      _.max(normalized).should.equal(1);
      _.min(normalized).should.equal(-1);
    });
  });
});
