'use strict';

angular.module('FallAgainApp')
  .controller('MainCtrl', function ($scope, $swipe) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];

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

    $scope.test = function(event,down) {
      //console.log('test');
      //var element = angular.element( document.querySelector( '#test' ) );
      //console.log('test');
      //console.log('e: ' + JSON.stringify(event));
      //console.log('e: ' + JSON.stringify(event.which));
      //console.log('e: ' + down);
      if (down === 1) {
        //console.log('test');
        var element = document.getElementById('image');
        //console.log(JSON.stringify(element));
        //element.innerHTML='hoho';
        element.style.marginTop = event.pageY + 'px';
        element.style.marginLeft = event.pageX + 'px';
        //console.log('x ' + $scope.x);
        //console.log('y ' + $scope.y);
        //console.log('x ' + event.pageX);
        //console.log('y ' + event.pageY);
        //console.log(JSON.stringify(element.style));
        //element.text = 'hhhhhhhh';
      }

    };


    /*
    window.onload = function() {
      console.log('loaded');
      var element = document.getElementById('abc');
      //element.innerHTML = 'hhh';
      console.log('found element: ' + JSON.stringify(element));
      //$scope.$apply();
    };
    */


  });
