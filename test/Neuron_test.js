var Neuron = require('../src/Neuron');
var neuron;
var inputValues = [-1, 0, 1];

describe('Neuron', function() {
  beforeEach(function() {
    neuron = new Neuron();
  });

  describe('activate', function() {
    it('always outputs 1 if isBias Neuron', function() {
      neuron.isBias = true;
      inputValues.forEach(function(n) {
        neuron.activate(n).should.equal(1);
      });
    });
    it('sets the input when specified', function() {
      inputValues.forEach(function(n) {
        neuron.activate(n);
        neuron.input.should.equal(n);
      });
    });
    it('sums input from output of Neurons connect to it', function() {
      var sourceA = new Neuron();
      var sourceB = new Neuron();
      sourceA.output = 1;
      sourceB.output = 1;

      sourceA.connect(neuron, 1);
      sourceB.connect(neuron, 1);

      neuron.activate();
      neuron.input.should.equal(2);
    });
    it('does not squash input values if isInput', function() {
      neuron.isInput().should.equal(true);
      neuron.activate(10);
      neuron.output.should.equal(10);
    });
    it('does squash input values if !isInput', function() {
      var source = new Neuron();
      source.connect(neuron);
      neuron.isInput().should.equal(false);
      neuron.activate(10);
      neuron.output.should.not.equal(10);
    });
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
