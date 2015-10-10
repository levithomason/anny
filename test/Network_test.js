var Network = require('../lib/Network');
var Layer = require('../lib/Layer');
var network;

describe('Network', function() {
  beforeEach(function() {
    network = new Network([1, 1]);
  });

  it('initializes with a `null` error', function() {
    expect(network.error).to.equal(null);
  });

  it('has an input layer', function() {
    network.inputLayer.should.be.an.instanceOf(Layer);
  });

  it('has an output layer', function() {
    network.outputLayer.should.be.an.instanceOf(Layer);
  });

  it('has hidden layers', function() {
    _.each(network.hiddenLayers, function(layer) {
      layer.should.be.an.instanceOf(Layer);
    });
  });

  describe('train', function() {
    it('is a function', function() {
      network.train.should.be.a('function');
    });

    describe('logic gates', function() {
      it('OR', function() {
        network = new Network([2, 1]);
        var data = [
          {input: [0, 0], output: [0]},
          {input: [0, 1], output: [1]},
          {input: [1, 0], output: [1]},
          {input: [1, 1], output: [1]}
        ];
        network.train(data, _.noop);
        expect(network.error).to.be.below(network.errorThreshold);
      });

      it('XOR', function() {
        // TODO: this should be possible with 2, 3, 1 but is intermittent.
        network = new Network([2, 5, 3, 1]);
        var data = [
          {input: [0, 0], output: [0]},
          {input: [0, 1], output: [1]},
          {input: [1, 0], output: [1]},
          {input: [1, 1], output: [0]}
        ];
        network.train(data, _.noop);
        expect(network.error).to.be.below(network.errorThreshold);
      });

      it('AND', function() {
        network = new Network([2, 3, 1]);
        var data = [
          {input: [0, 0], output: [0]},
          {input: [0, 1], output: [0]},
          {input: [1, 0], output: [0]},
          {input: [1, 1], output: [1]}
        ];
        network.train(data, _.noop);
        expect(network.error).to.be.below(network.errorThreshold);
      });

      it('NAND', function() {
        network = new Network([2, 3, 1]);
        var data = [
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
