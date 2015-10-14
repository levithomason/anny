var ERROR = require('../src/Error');

describe('ERROR', function() {
  it('contains only function properties', function() {
    _.each(ERROR, function(fn) {
      fn.should.be.a('function');
    });
  });

  it('has no anonymous functions', function() {
    _.each(ERROR, function(fn, name) {
      fn.name.should.equal(name);
    });
  });

  it('has methods that return numbers', function() {
    _.each(ERROR, function(fn) {
      fn([1, 2, 3], [2, 3, 4]).should.be.a('number');
    });
  });

  describe('rootMeanSquared', function() {
    it('returns the square root of meanSquared', function() {
      var expected = [1, 2, 3];
      var actual = [2, 3, 4];
      var SQRT_MSE = Math.sqrt(ERROR.meanSquared(expected, actual));
      var RMS = ERROR.rootMeanSquared(expected, actual);

      RMS.should.equal(SQRT_MSE);
    });
  });
});
