'use strict';

angular.module('FallAgainApp')
  .controller('MainCtrl', function ($scope, $swipe) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
    $scope.relativeX = 0;
    $scope.relativeY = 0;
    $scope.mouseDown = 0;
    $scope.viewWidth = 0;
    $scope.viewHeight = 0;

    $scope.x = 0;
    $scope.y = 0;
    $scope.down = 0;
    $scope.event = '';

    $scope.left = 0;
    $scope.top = 0;
    $scope.width = 0;
    $scope.height = 0;

    $scope.z = 0;

    $scope.say = function(text) {
      console.log(text);
    };

  });
