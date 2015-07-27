function AnnyFactory($rootScope) {
  var factory = {};

  factory.init = function() {
    factory.network = new anny.Network(factory.getRandomLayers());
  };

  factory.activate = function(inputs) {
    factory.network.activate(inputs);
    factory.emitChange();
  };

  factory.getRandomLayers = function() {
    var inputs = 1;
    var outputs = 1;
    var numHiddenLayers = _.random(1, 2);
    var hiddenLayers = [];

    _.times(numHiddenLayers, function() {
      hiddenLayers.push(_.random(2, 5));
    });

    return [].concat(inputs, hiddenLayers, outputs);
  };

  factory.train = function(trainingSet) {
    factory.network.train(trainingSet);
    factory.emitChange();
  };

  factory.newNetwork = function(layers) {
    factory.network = new anny.Network(layers || factory.getRandomLayers());
    factory.emitChange();
  };

  factory.emitChange = function() {
    $rootScope.$broadcast('anny:changed');
  };

  factory.init();

  return factory;
}

angular.module('anny')
  .factory('AnnyFactory', AnnyFactory);
