var anny = require('../index');

describe('anny', function() {
  it('has activation functions', function() {
    anny.ACTIVATION.should.be.a('object');
  });

  it('has error functions', function() {
    anny.ERROR.should.be.a('object');
  });

  it('has initializer helpers', function() {
    anny.INITIALIZE.should.be.a('object');
  });

  it('has a Neuron constructor', function() {
    anny.Neuron.should.be.a('function');
  });

  it('has a Layer constructor', function() {
    anny.Layer.should.be.a('function');
  });

  it('has a Network constructor', function() {
    anny.Network.should.be.a('function');
  });

  it('has utils', function() {
    anny.util.should.be.a('object');
  });
});
