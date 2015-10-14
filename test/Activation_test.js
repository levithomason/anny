var ACTIVATION = require('../src/Activation');

describe('ACTIVATION', function() {
  it('is an object', function() {
    ACTIVATION.should.be.a('object');
  });

  it('has only object values', function() {
    _.each(ACTIVATION, function(val, key) {
      val.should.be.a('object');
    });
  });

  it('has object values with a `func` method', function() {
    _.each(ACTIVATION, function(val, key) {
      val.func.should.be.a('function');
    });
  });

  it('has object values with a `prime` method', function() {
    _.each(ACTIVATION, function(val, key) {
      val.prime.should.be.a('function');
    });
  });

  it('has `func` and `prime` methods return numbers', function() {
    _.each(ACTIVATION, function(val, key) {
      val.func(_.random(-100, 100, true)).should.be.a('number');
      val.prime(_.random(-100, 100, true)).should.be.a('number');
    });
  });

  describe('rectifier', function() {
    it('returns 0 if x is <= 0', function() {
      ACTIVATION.rectifier.func(-_.random(100, true)).should.equal(0);
      ACTIVATION.rectifier.func(0).should.equal(0);
    });

    it('returns x if x is > 0', function() {
      var x = _.random(100);
      ACTIVATION.rectifier.func(x).should.equal(x);
    });
  });

  describe('softplus', function() {
    it('returns 0 if x is very negative', function() {
      ACTIVATION.softplus.func(-37).should.equal(0);
    });

    it('returns approx of x if x is greater than 0', function() {
      var x = _.random(100, true);
      ACTIVATION.softplus.func(x).should.be.gte(x);
    });
  });

  describe('identity', function() {
    it('returns x', function() {
      var x = _.random(-1, 1, true);
      ACTIVATION.identity.func(x).should.equal(x);
    });
  });
});
