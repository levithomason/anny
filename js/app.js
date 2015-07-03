angular.module('App', [])

  .controller('Controller', function($scope) {
    $scope.neurons = [];

    $scope.network = new Network(2, 4, 1);
  });
