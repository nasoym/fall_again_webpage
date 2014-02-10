'use strict';

angular.module('FallAgainApp')
  .controller('MainCtrl', function ($scope) {
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
  });
