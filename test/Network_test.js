var Network = require('../lib/Network');
var Layer = require('../lib/Layer');
var network;

describe('Network', function() {
  beforeEach(function() {
    network = new Network([1, 1]);
  });

  it('has an input layer', function() {
    network.input.should.be.an.instanceOf(Layer);
  });

  it('has an output layer', function() {
    network.output.should.be.an.instanceOf(Layer);
  });

  describe('train', function() {
    it('is a function', function() {
      network.train.should.be.a('function');
    });
  });
});
