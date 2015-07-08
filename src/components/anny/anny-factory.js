function AnnyFactory() {
  var factory = {};

  factory.init = function() {
    var inputs = _.random(2, 8);
    var hidden = _.random(4, 8);
    var outputs = _.random(1, 3);
    factory.network = new anny.Network(inputs, hidden, outputs);
  };

  factory.init();

  return factory;
}

angular.module('anny')
  .factory('AnnyFactory', AnnyFactory);
