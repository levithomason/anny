function AnnyFactory($rootScope) {
  var factory = {};

  factory.init = function init() {
    factory.newNetwork([2, 1]);
  };

  factory.activate = function(inputs) {
    factory.network.activate(inputs);
    factory.emitChange();
  };

  factory.data = anny.DATA;

  factory.getRandomLayers = function getRandomLayers() {
    var inputs = 2;
    var outputs = 1;
    var numHiddenLayers = _.random(1, 3);
    var hiddenLayers = [];

    _.times(numHiddenLayers, function time() {
      hiddenLayers.push(_.random(3, 5));
    });

    return [].concat(inputs, hiddenLayers, outputs);
  };

  factory.train = function(trainingSet, callback, frequency) {
    var results = ['Predictions after training:'];
    factory.network.train(trainingSet, callback, frequency);

    _.each(trainingSet, function(sample) {
      var input = sample.input;
      var output = factory.network.activate(input);
      results.push(
        '[' + input.toString() + '] == ' + (output >= 0.5) + ' ' + output
      );
    });

    console.log(results.join('\n'));

    factory.emitChange();
  };

  factory.newNetwork = function newNetwork(layers) {
    factory.network = new anny.Network(layers || factory.getRandomLayers());
    factory.emitChange();
  };

  factory.emitChange = function emitChange() {
    $rootScope.$broadcast('anny:changed');
    window.network = factory.network;
  };

  factory.init();

  return factory;
}

angular.module('anny')
  .factory('AnnyFactory', AnnyFactory);
