function AnnyFactory($rootScope) {
  var factory = {};

  factory.init = function() {
    factory.network = new anny.Network([2, 2, 1]);

    // TODO: cleanup training example
    var trainingSet = [
      {input: [0, 0], output: [0]},
      {input: [0, 1], output: [1]},
      {input: [1, 0], output: [1]},
      {input: [1, 1], output: [1]}
    ];

    console.log('Training (epoch: error):');
    factory.network.train(trainingSet, 1, function(err) {
      console.log('error: ' + err);
    });

    console.log(
      'Predictions after training:',
      '\n[0, 0] ' + factory.network.activate([0]),
      '\n[0, 1] ' + factory.network.activate([1]),
      '\n[1, 0] ' + factory.network.activate([1]),
      '\n[1, 1] ' + factory.network.activate([1])
    );
    // End training example
    factory.emitChange();
  };

  factory.activate = function(inputs) {
    factory.network.activate(inputs);
    factory.emitChange();
  };

  factory.getRandomLayers = function() {
    var inputs = 1;
    var outputs = 1;
    var numHiddenLayers = _.random(0, 2);
    var hiddenLayers = [];

    _.times(numHiddenLayers, function() {
      hiddenLayers.push(_.random(2, 4));
    });

    return [].concat(inputs, hiddenLayers, outputs);
  };

  factory.train = function(trainingSet, logFrequency) {
    factory.network.train(trainingSet, logFrequency);

    factory.emitChange();
  };

  factory.newNetwork = function(layers) {
    factory.network = new anny.Network(layers || factory.getRandomLayers());
    factory.emitChange();
  };

  factory.emitChange = function() {
    $rootScope.$broadcast('anny:changed');
    window.network = factory.network;
  };

  factory.init();

  return factory;
}

angular.module('anny')
  .factory('AnnyFactory', AnnyFactory);
