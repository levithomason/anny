angular.module('App.toolbar')

  .directive('toolbar', function(AnnyFactory) {
    return {
      replace: true,
      scope: {},
      templateUrl: 'app/dist/components/toolbar/toolbar.html',
      link: function(scope) {
        scope.resetNet = function() {
          AnnyFactory.init();
        };

        scope.randomNet = function() {
          AnnyFactory.newNetwork();
        };

        scope.activateRandom = function() {
          var inputs = [];

          _.times(AnnyFactory.network.inputLayer.neurons.length, function() {
            inputs.push(_.random(-1, 1, true));
          });

          AnnyFactory.activate(inputs);
        };

        scope.trainORGate = function() {
          AnnyFactory.train([
            {input: [0, 0], output: [0]},
            {input: [0, 1], output: [1]},
            {input: [1, 0], output: [1]},
            {input: [1, 1], output: [1]}
          ]);
        };

        scope.trainXORGate = function() {
          AnnyFactory.train([
            {input: [0, 0], output: [0]},
            {input: [0, 1], output: [1]},
            {input: [1, 0], output: [1]},
            {input: [1, 1], output: [0]}
          ]);
        };

        scope.trainANDGate = function() {
          AnnyFactory.train([
            {input: [0, 0], output: [0]},
            {input: [0, 1], output: [0]},
            {input: [1, 0], output: [0]},
            {input: [1, 1], output: [1]}
          ]);
        };

        scope.trainNANDGate = function() {
          AnnyFactory.train([
            {input: [0, 0], output: [1]},
            {input: [0, 1], output: [1]},
            {input: [1, 0], output: [1]},
            {input: [1, 1], output: [0]}
          ]);
        };
      }
    };
  });
