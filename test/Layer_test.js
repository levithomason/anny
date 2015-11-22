import _ from 'lodash';
import Layer from '../src/Layer';
let layer;

describe('Layer', () => {
  beforeEach(() => {
    layer = new Layer(1);
  });

  it('does not include a bias neuron by default', () => {
    _.some(layer.neurons, 'isBias').should.equal(false);
  });

  describe('constructor', () => {
    it('creates the number of neurons specified', () => {
      const size = _.random(0, 1000);
      layer = new Layer(size);
      layer.neurons.should.have.length(size);
    });
    it('constructs neurons with the specified activation', () => {
      const activation = {func: 'yo', prime: 'yep'};
      layer = new Layer(1, activation);
      layer.neurons[0].activation.should.deep.equal(activation);
    });
    it('constructs neurons with the specified learning rate', () => {
      const rate = _.random(true);
      layer = new Layer(1, null, rate);
      layer.neurons[0].learningRate.should.equal(rate);
    });
  });

  describe('connect', () => {
    it('adds a bias Neuron to the source layer', () => {
      const targetLayer = new Layer(1);
      layer.connect(targetLayer);
      _.some(layer.neurons, 'isBias').should.equal(true);
    });
    it('does not add a bias Neuron to the target layer', () => {
      const targetLayer = new Layer(1);
      layer.connect(targetLayer);
      _.some(targetLayer.neurons, 'isBias').should.equal(false);
    });
  });

  describe('size', () => {
    it('returns the number of non-bias neurons in the layer', () => {
      const neurons = _.times(_.random(1, 99), n => ({isBias: false}));
      const biasNeurons = _.times(_.random(1, 99), n => ({isBias: true}));
      layer.neurons = _.union(neurons, biasNeurons);
      layer.size().should.equal(neurons.length);
    });
  });
});
