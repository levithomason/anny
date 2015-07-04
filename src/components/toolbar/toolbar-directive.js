angular.module('App.toolbar')

  .directive('toolbar', function() {
    return {
      replace: true,
      scope: {},
      templateUrl: 'components/toolbar/toolbar.html',
      link: function(scope, elm, attrs) {

      }
    }
  });
