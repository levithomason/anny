var Neuron = require('../lib/Neuron');
var neuron;

describe('Neuron', function() {
  beforeEach(function() {
    neuron = new Neuron();
  });

  describe('isInput', function() {
    it('is true when it has no incoming connections', function() {
      neuron.isInput().should.be.equal(true);
    });
    it('is false when it has incoming connections', function() {
      var input = new Neuron();
      input.connect(neuron, 1);
      neuron.isInput().should.be.equal(false);
    });
  });

  describe('isOutput', function() {
    it('is true when it has no outgoing connections', function() {
      neuron.isOutput().should.be.equal(true);
    });
    it('is false when it has outgoing connections', function() {
      var output = new Neuron();
      neuron.connect(output, 1);
      neuron.isOutput().should.be.equal(false);
    });
  });
});
