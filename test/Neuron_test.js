import _ from 'lodash';
import ACTIVATION from '../src/Activation';
import Neuron from '../src/Neuron';
let neuron;
let inputValues = [-1, 0, 1];

describe('Neuron', () => {
  beforeEach(() => {
    neuron = new Neuron();
  });

  describe('constructor', () => {
    it('has a default learning rate', () => {
      neuron.learningRate.should.be.a('number');
    });
    it('accepts a learning rate', () => {
      const rate = _.random(true);
      const n = new Neuron(null, rate);
      n.learningRate.should.equal(rate);
    });
    it('has a default tanh activation', () => {
      neuron.activation.should.deep.equal(ACTIVATION.tanh);
    });
    it('accepts an activation function', () => {
      const activtion = {foo: 'bar'};
      const n = new Neuron(activtion);
      n.activation.should.deep.equal(activtion);
    });
  });

  describe('activate', () => {
    it('always outputs 1 if isBias Neuron', () => {
      neuron.isBias = true;
      inputValues.forEach((n) => {
        neuron.activate(n).should.equal(1);
      });
    });
    it('sets the input when specified', () => {
      inputValues.forEach(n => {
        neuron.activate(n);
        neuron.input.should.equal(n);
      });
    });
    it('sums input from output of Neurons connect to it', () => {
      let sourceA = new Neuron();
      let sourceB = new Neuron();
      sourceA.output = 1;
      sourceB.output = 1;

      sourceA.connect(neuron, 1);
      sourceB.connect(neuron, 1);

      neuron.activate();
      neuron.input.should.equal(2);
    });
    it('does not squash input values if isInput', () => {
      neuron.isInput().should.equal(true);
      neuron.activate(10);
      neuron.output.should.equal(10);
    });
    it('does squash input values if !isInput', () => {
      let source = new Neuron();
      source.connect(neuron);
      neuron.isInput().should.equal(false);
      neuron.activate(10);
      neuron.output.should.not.equal(10);
    });
  });

  describe('isInput', () => {
    it('is true when it has no incoming connections', () => {
      neuron.isInput().should.be.equal(true);
    });
    it('is false when it has incoming connections', () => {
      let input = new Neuron();
      input.connect(neuron, 1);
      neuron.isInput().should.be.equal(false);
    });
  });

  describe('isOutput', () => {
    it('is true when it has no outgoing connections', () => {
      neuron.isOutput().should.be.equal(true);
    });
    it('is false when it has outgoing connections', () => {
      let output = new Neuron();
      neuron.connect(output, 1);
      neuron.isOutput().should.be.equal(false);
    });
  });
});
