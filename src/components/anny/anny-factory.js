function AnnyFactory($rootScope) {
  var factory = {};
  factory.network = {};

  factory.init = function() {
    factory.newNetwork();
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

    var newNet = new anny.Network(layers);

    _.each(factory.network, function(val, key) {
      delete factory.network[key];
    });

    factory.network = angular.extend(factory.network, newNet);

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
