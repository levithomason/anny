angular.module('App', [])

  .controller('Controller', function($scope) {
    $scope.neurons = [];

    _.times(10, function() {
      $scope.neurons.push(new Neuron());
    });

    _.each($scope.neurons, function(n, i) {
      var next = $scope.neurons[i+1];
      if (next) {
        n.connect(next);
      }
    });
  });
