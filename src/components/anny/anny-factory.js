function AnnyFactory() {
  var anny = {};

  anny.init = function() {
    var inputs = _.random(2, 8);
    var hidden = _.random(4, 8);
    var outputs = _.random(1, 3);
    anny.network = new Network(inputs, hidden, outputs);
  };

  anny.init();

  return anny;
}

angular.module('anny')
  .factory('AnnyFactory', AnnyFactory);
