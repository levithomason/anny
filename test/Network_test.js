var Network = require('../lib/Network');
var Layer = require('../lib/Layer');
var network;

describe('Network', function() {
  beforeEach(function() {
    network = new Network([1, 1]);
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
  });
});
