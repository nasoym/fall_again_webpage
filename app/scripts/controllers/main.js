'use strict';

angular.module('FallAgainApp')
  .controller('MainCtrl', function ($scope, $location) {
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

    var urlParameters = $location.search();
    if (urlParameters.host !== undefined) {
      console.log('host is: ' + urlParameters.host);
    }

    $scope.playanimation = function() {
      console.log('play animation');
      $scope.$broadcast('play');
    };
    $scope.stopanimation = function() {
      console.log('stop animation');
      $scope.$broadcast('stop');
    };

  });

