import Network from '../src/Network';
import Layer from '../src/Layer';
let network;

describe('Network', () => {
  beforeEach(() => {
    network = new Network([1, 1]);
  });

  it('initializes with a `null` error', () => {
    expect(network.error).to.equal(null);
  });

  it('has an input layer', () => {
    network.inputLayer.should.be.an.instanceOf(Layer);
  });

  it('has an output layer', () => {
    network.outputLayer.should.be.an.instanceOf(Layer);
  });

  it('has hidden layers', () => {
    _.each(network.hiddenLayers, (layer) => {
      layer.should.be.an.instanceOf(Layer);
    });
  });

  describe('train', () => {
    it('is a ', () => {
      network.train.should.be.a('function');
    });

    describe('logic gates', () => {
      it('OR', () => {
        network = new Network([2, 1]);
        let data = [
          {input: [0, 0], output: [0]},
          {input: [0, 1], output: [1]},
          {input: [1, 0], output: [1]},
          {input: [1, 1], output: [1]}
        ];
        network.train(data, _.noop);
        expect(network.error).to.be.below(network.errorThreshold);
      });

      it('XOR', () => {
        // TODO: this should be possible with 2, 3, 1 but is intermittent.
        network = new Network([2, 5, 3, 1]);
        let data = [
          {input: [0, 0], output: [0]},
          {input: [0, 1], output: [1]},
          {input: [1, 0], output: [1]},
          {input: [1, 1], output: [0]}
        ];
        network.train(data, _.noop);
        expect(network.error).to.be.below(network.errorThreshold);
      });

      it('AND', () => {
        network = new Network([2, 3, 1]);
        let data = [
          {input: [0, 0], output: [0]},
          {input: [0, 1], output: [0]},
          {input: [1, 0], output: [0]},
          {input: [1, 1], output: [1]}
        ];
        network.train(data, _.noop);
        expect(network.error).to.be.below(network.errorThreshold);
      });

      it('NAND', () => {
        network = new Network([2, 3, 1]);
        let data = [
          {input: [0, 0], output: [1]},
          {input: [0, 1], output: [1]},
          {input: [1, 0], output: [1]},
          {input: [1, 1], output: [0]}
        ];
        network.train(data, _.noop);
        expect(network.error).to.be.below(network.errorThreshold);
      });
    });
  });
});
