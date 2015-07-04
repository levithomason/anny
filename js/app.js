angular.module('App', [])

  .controller('Controller', function($scope) {
    $scope.neurons = [];

    var inputs = _.random(2, 8);
    var hidden = _.random(4, 8);
    var outputs = _.random(1, 3);
    
    $scope.network = new Network(inputs, hidden, outputs);
  });
