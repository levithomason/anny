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

        scope.train = function() {
          var numSamples = 100;
          var trainingSet = _.times(numSamples, function() {
            // train to predict sin fn output
            var n = _.random(-500, 500, true);
            return {input: [n], output: [Math.sin(n)]};
          });

          AnnyFactory.train(trainingSet);
        }
      }
    };
  });
