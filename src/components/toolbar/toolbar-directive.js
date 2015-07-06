angular.module('App.toolbar')

  .directive('toolbar', function() {
    return {
      replace: true,
      scope: {
        network: '='
      },
      templateUrl: 'components/toolbar/toolbar.html',
      link: function(scope, elm, attrs) {
        scope.activateRandom = function() {
          var inputs = [];

          for (var i = 0; i < scope.network.input.neurons.length; i += 1) {
            inputs.push(_.random(true));
          }

          scope.network.activate(inputs);
        };
      }
    }
  });
