angular.module('App.toolbar')

  .directive('toolbar', function(AnnyFactory) {
    return {
      replace: true,
      scope: {},
      templateUrl: 'app/dist/components/toolbar/toolbar.html',
      link: function(scope) {
        scope.randomNet = function() {
          AnnyFactory.newNetwork();
        };

        scope.activateRandom = function() {
          var inputs = [];

          _.times(AnnyFactory.network.inputLayer.neurons.length, function() {
            inputs.push(_.random(true));
          });

          AnnyFactory.activate(inputs);
        };
      }
    };
  });
