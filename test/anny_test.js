import anny from '../index';

describe('anny', () => {
  it('has activation s', () => {
    anny.ACTIVATION.should.be.a('object');
  });

  it('has error s', () => {
    anny.ERROR.should.be.a('object');
  });

  it('has initializer helpers', () => {
    anny.INITIALIZE.should.be.a('object');
  });

  it('has a Neuron constructor', () => {
    anny.Neuron.should.be.a('function');
  });

  it('has a Layer constructor', () => {
    anny.Layer.should.be.a('function');
  });

  it('has a Network constructor', () => {
    anny.Network.should.be.a('function');
  });

  it('has utils', () => {
    anny.util.should.be.a('object');
  });
});
