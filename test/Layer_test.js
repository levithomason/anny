import _ from 'lodash';
import Layer from '../src/Layer';
let layer;

describe('Layer', () => {
  beforeEach(() => {
    layer = new Layer();
  });

  it('does not include a bias neuron by default', () => {
    _.some(layer.neurons, 'isBias').should.equal(false);
  });

  describe('connect', () => {
    it('adds a bias Neuron to the source layer', () => {
      const targetLayer = new Layer();
      layer.connect(targetLayer);
      _.some(layer.neurons, 'isBias').should.equal(true);
    });
    it('does not add a bias Neuron to the target layer', () => {
      const targetLayer = new Layer();
      layer.connect(targetLayer);
      _.some(targetLayer.neurons, 'isBias').should.equal(false);
    });
  });
});
