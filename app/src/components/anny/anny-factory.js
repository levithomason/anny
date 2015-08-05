function AnnyFactory($rootScope) {


  var the_network = new anny.Network([2, 2, 1]);
  var trainingSet = [];

  _.times(100, function (n) {
      console.log('asdf');
      var result = the_network.train([
          {input: [1, 2], output: [-3]}
      ]);
  });

  var output = the_network.activate([1, 2]);

  console.log(output);



  var factory = {};

  factory.init = function() {
    //factory.network = new anny.Network(factory.getRandomLayers());
    factory.network = window.network = the_network;
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
    factory.network.train(trainingSet, logFrequency, function(i, error) {
      console.log('Network training', i, 'error', error);
    });

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
