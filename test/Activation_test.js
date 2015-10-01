var ACTIVATION = require('../lib/Activation');

describe('ACTIVATION', function() {
  it('is an object', function() {
    ACTIVATION.should.be.a('object');
  });

  it('has only object values', function() {
    _.each(ACTIVATION, function(val, key) {
      val.should.be.a('object');
    });
  });

  it('has object values with a `normal` method', function() {
    _.each(ACTIVATION, function(val, key) {
      val.normal.should.be.a('function');
    });
  });

  it('has object values with a `prime` method', function() {
    _.each(ACTIVATION, function(val, key) {
      val.prime.should.be.a('function');
    });
  });

  it('has `normal` and `prime` methods return numbers', function() {
    _.each(ACTIVATION, function(val, key) {
      val.normal(_.random(-100, 100, true)).should.be.a('number');
      val.prime(_.random(-100, 100, true)).should.be.a('number');
    });
  });

  describe('rectifier', function() {
    it('returns 0 if x is <= 0', function() {
      ACTIVATION.rectifier.normal(-_.random(100, true)).should.equal(0);
      ACTIVATION.rectifier.normal(0).should.equal(0);
    });

    it('returns x if x is > 0', function() {
      var x = _.random(100);
      ACTIVATION.rectifier.normal(x).should.equal(x);
    });
  });

  describe('softplus', function() {
    it('returns 0 if x is very negative', function() {
      ACTIVATION.softplus.normal(-37).should.equal(0);
    });

    it('returns approx of x if x is greater than 0', function() {
      var x = _.random(100, true);
      ACTIVATION.softplus.normal(x).should.be.gte(x);
    });
  });

  describe('identity', function() {
    it('returns x', function() {
      var x = _.random(-1, 1, true);
      ACTIVATION.identity.normal(x).should.equal(x);
    });
  });
});
