import ERROR from '../src/Error';

describe('ERROR', () => {
  it('contains only  properties', () => {
    _.each(ERROR, (fn) => {
      fn.should.be.a('function');
    });
  });

  it('has no anonymous s', () => {
    _.each(ERROR, (fn, name) => {
      fn.name.should.equal(name);
    });
  });

  it('has methods that return numbers', () => {
    _.each(ERROR, (fn) => {
      fn([1, 2, 3], [2, 3, 4]).should.be.a('number');
    });
  });

  describe('rootMeanSquared', () => {
    it('returns the square root of meanSquared', () => {
      let expected = [1, 2, 3];
      let actual = [2, 3, 4];
      let SQRT_MSE = Math.sqrt(ERROR.meanSquared(expected, actual));
      let RMS = ERROR.rootMeanSquared(expected, actual);

      RMS.should.equal(SQRT_MSE);
    });
  });
});
