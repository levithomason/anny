import _ from 'lodash';
import ACTIVATION from '../src/Activation';

describe('ACTIVATION', () => {
  it('is an object', () => {
    ACTIVATION.should.be.a('object');
  });

  it('has only object values', () => {
    _.each(ACTIVATION, (val, key) => {
      val.should.be.a('object');
    });
  });

  it('has object values with a `func` method', () => {
    _.each(ACTIVATION, (val, key) => {
      val.func.should.be.a('function');
    });
  });

  it('has object values with a `prime` method', () => {
    _.each(ACTIVATION, (val, key) => {
      val.prime.should.be.a('function');
    });
  });

  it('has `func` and `prime` methods return numbers', () => {
    _.each(ACTIVATION, (val, key) => {
      val.func(_.random(-100, 100, true)).should.be.a('number');
      val.prime(_.random(-100, 100, true)).should.be.a('number');
    });
  });

  describe('rectifier', () => {
    it('returns 0 if x is <= 0', () => {
      ACTIVATION.rectifier.func(-_.random(100, true)).should.equal(0);
      ACTIVATION.rectifier.func(0).should.equal(0);
    });

    it('returns x if x is > 0', () => {
      let x = _.random(100);
      ACTIVATION.rectifier.func(x).should.equal(x);
    });
  });

  describe('softplus', () => {
    it('returns 0 if x is very negative', () => {
      ACTIVATION.softplus.func(-37).should.equal(0);
    });

    it('returns approx of x if x is greater than 0', () => {
      let x = _.random(100, true);
      ACTIVATION.softplus.func(x).should.be.gte(x);
    });
  });

  describe('identity', () => {
    it('returns x', () => {
      let x = _.random(-1, 1, true);
      ACTIVATION.identity.func(x).should.equal(x);
    });
  });
});
