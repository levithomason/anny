import _ from 'lodash';
import ACTIVATION from '../src/Activation';

describe('ACTIVATION', () => {
  it('is an object', () => ACTIVATION.should.be.a('object'));

  it('has only object values', () => {
    _.each(ACTIVATION, val => val.should.be.a('object'));
  });

  describe('activation object', () => {
    _.each(ACTIVATION, object => {
      it('has a `func` method that returns a number', () => {
        object.func(_.random(-100, 100, true)).should.be.a('number');
      });

      it('has a `prime` method that returns a number', () => {
        object.prime(_.random(-100, 100, true)).should.be.a('number');
      });

      it('has a `rangeMin` number property', () => {
        expect(object.rangeMin).to.be.a('number');
      });

      it('has a `rangeMax` number property', () => {
        expect(object.rangeMax).to.be.a('number');
      });
    });
  });
});
