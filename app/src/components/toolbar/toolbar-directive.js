angular.module('App.toolbar')

  .directive('toolbar', function(AnnyFactory) {
    return {
      replace: true,
      scope: {},
      templateUrl: 'app/dist/components/toolbar/toolbar.html',
      link: function(scope) {
        scope.resetNet = function resetNet() {
          AnnyFactory.init();
        };

        scope.randomNet = function randomNet() {
          AnnyFactory.newNetwork();
        };

        scope.activateRandom = function activateRandom() {
          var inputs = [];

          _.times(AnnyFactory.network.inputLayer.neurons.length, function() {
            inputs.push(_.random(-1, 1, true));
          });

          AnnyFactory.activate(inputs);
        };

        scope.trainORGate = function trainORGate() {
          AnnyFactory.train(AnnyFactory.DATA.ORGate);
        };

        scope.trainXORGate = function trainXORGate() {
          AnnyFactory.train(AnnyFactory.DATA.XORGate);
        };

        scope.trainANDGate = function trainANDGate() {
          AnnyFactory.train(AnnyFactory.DATA.ANDGate);
        };

        scope.trainNANDGate = function trainNANDGate() {
          AnnyFactory.train(AnnyFactory.DATA.NANDGate);
        };
      },
    };
  });
