'use strict';

angular.module('FallAgainApp')
  .controller('MainCtrl', function ($scope, $swipe) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];

    $scope.say = function(text) {
      console.log(text);
    };

    $scope.x = 0;
    $scope.y = 0;
    $scope.down = 0;

  });
