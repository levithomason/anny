import anny from '../src/index';

describe('anny', () => {
  it('has activation functions', () => {
    anny.ACTIVATION.should.be.a('object');
  });

  it('has data', () => {
    anny.DATA.should.be.a('object');
  });

  it('has error functions', () => {
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
