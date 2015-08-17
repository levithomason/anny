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

        scope.net2048 = function() {
          AnnyFactory.newNetwork([16, 16, 4]);
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

        scope.train2048 = function() {
          AnnyFactory.train(window.data2048ScaledTraining, function(err) {
            console.debug(err);
          }, 100);

          console.log('Training done, test output:');
          var totalErrors = _.map(window.data2048ScaledTest, function(sample) {
            var actual = AnnyFactory.activate(sample.input);
            var error = AnnyFactory.network.errorFn(sample.output, actual);

            console.log(
              '---------------------------------',
              '\nans: ' + sample.output,
              '\nact: ' + actual,
              '\nerr: ' + error
            );

            return error;
          });

          console.debug('Avg Err:', _.sum(totalErrors) / totalErrors.length);
        };
      }
    };
  });
