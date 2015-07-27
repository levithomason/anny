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
          var numSamples = 1000;
          var logFrequency = _.floor(numSamples / 10);

          var trainingSet = _.times(numSamples, function() {
            // learn to add 1
            var n = _.random(-1, 1, true);
            return {input: [n], output: [n + 1]};
          });

          AnnyFactory.train(trainingSet, logFrequency);
        };
      }
    };
  });
