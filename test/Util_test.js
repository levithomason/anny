var Util = require('../lib/Util');

describe('Util', function() {
  it('has no anonymous functions', function() {
    _.each(Util, function(fn, name) {
      fn.name.should.equal(name);
    });
  });

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

  describe('getApproximateDerivative', function() {
    it('returns a function', function() {
      Util.getApproximateDerivative(_.noop).should.be.a('function');
    });
    it('returns a function that returns a number', function() {
      var derivative = Util.getApproximateDerivative(Math.sin);
      derivative(_.random()).should.be.a('number');
    });
  });
});
