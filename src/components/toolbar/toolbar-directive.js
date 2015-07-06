angular.module('App.toolbar')

  .directive('toolbar', function(AnnyFactory, $window) {
    return {
      replace: true,
      scope: {},
      templateUrl: '/components/toolbar/toolbar.html',
      link: function(scope, elm, attrs) {
        scope.activateRandom = function() {
          var inputs = [];

          for (var i = 0; i < AnnyFactory.network.input.neurons.length; i += 1) {
            inputs.push(_.random(true));
          }

          AnnyFactory.network.activate(inputs);
        };

        scope.refresh = function() {
          $window.location.reload()
        };
      }
    }
  });
