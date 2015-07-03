angular.module('App', [])

  .controller('Controller', function($scope) {
    $scope.neurons = [];

    _.times(3, function() {
      $scope.neurons.push(new Neuron());
    });

    _.each($scope.neurons, function(n, i) {
      var next = $scope.neurons[i];
      if (next) {
        n.connect(next);
      }
    });
  });
