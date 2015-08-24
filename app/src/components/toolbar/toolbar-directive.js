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
          // http://www.solver.com/xlminer/help
          //   /neural-networks-classification-intro
          /*
          var samples = window.data2048ScaledTraining.length;
          var inputs = 16;
          var outputs = 4;
          // 5 - 10, larger values for less noisy data
          var scale = 5;
          var hiddenNeurons = Math.ceil(samples / (inputs + outputs)) / scale;
          */

          AnnyFactory.newNetwork([
            16,
            12,
            9,
            6,
            4
          ]);
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
          AnnyFactory.train(window.data2048ScaledTraining);

          console.log('Training done, test output:');
          var totalErrors = _.map(window.data2048ScaledTest, function(sample) {
            var actual = AnnyFactory.activate(sample.input);
            var error = AnnyFactory.network.errorFn(sample.output, actual);
            // use the largest output value as the classification
            var classification = _.map(actual, function(val) {
              return val === _.max(actual) ? 1 : 0;
            });

            console.log(
              '---------------------------------',
              '\nhuman: ' + sample.output,
              '\nclass: ' + classification,
              '\nactual: ' + _.map(actual, function(val) {
                return val.toFixed(3);
              }),
              '\nerror: ' + error
            );
            if (_.isEqual(sample.output, classification)) {
              console.debug('^^^^^^^^^ PASSED ^^^^^^^^^');
            }
            return error;
          });

          console.debug('Avg Err:', _.sum(totalErrors) / totalErrors.length);
        };
      }
    };
  });
