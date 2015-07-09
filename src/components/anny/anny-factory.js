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
    var inputs = _.random(2, 6);
    var outputs = _.random(1, 2);
    var numHiddenLayers = _.random(0, 2);
    var hiddenLayers = [];

    _.times(numHiddenLayers, function() {
      hiddenLayers.push(_.random(3, 5));
    });

    return [].concat(inputs, hiddenLayers, outputs);
  };

  factory.newNetwork = function(layers) {
    layers = layers || factory.getRandomLayers();

    factory.network = new anny.Network(layers);

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
