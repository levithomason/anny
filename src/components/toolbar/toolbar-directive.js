angular.module('App.toolbar')

  .directive('toolbar', function(AnnyFactory, $window, $rootScope) {
    return {
      replace: true,
      scope: {},
      templateUrl: 'dist/components/toolbar/toolbar.html',
      link: function(scope, elm, attrs) {
        scope.init = function() {
        };

        scope.randomNet = function() {
          AnnyFactory.newNetwork();
        };

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

        scope.init();
      }
    }
  });
