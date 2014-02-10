'use strict';

angular.module('FallAgainApp')
  .directive('test', function () {
    return {
      restrict: 'A',
      link: function postLink(scope, element, attrs) {
        //console.log('element: ' + JSON.stringify(element[0]));

        var x = attrs.testX;
        var y = attrs.testY;
        //console.log(' ' + x + y);
        var scopeWidth = attrs.width;
        var scopeHeight = attrs.height;
        var scopeDown = attrs.testDown;

        scope[scopeWidth] = element[0].offsetWidth;
        scope[scopeHeight] = element[0].offsetHeight;

        /*
        console.log('>:' + element[0].offsetLeft);
        console.log('>:' + element[0].offsetTop);
        console.log('>:' + element[0].offsetHeight);
        console.log('>:' + element[0].offsetWidth);
        */

        var down = 0;
        scope[scopeDown] = 0;
        element[0].addEventListener('mousedown', function(eventData) {
          down = 1;
          scope[scopeDown] = 1;
          /*
          //console.log(' ' + eventData.pageX);
            var relativeX = eventData.pageX - element[0].offsetLeft;
            var relativeY = eventData.pageY - element[0].offsetTop;
            //console.log('rel x: ' + relativeX);
            //console.log('rel y: ' + relativeY);

            scope[x] = relativeX;
            scope[y] = relativeY;
            scope.$apply();
            */
        });
        element[0].addEventListener('mouseup', function(eventData) {
          down = 0;
          scope[scopeDown] = 0;
        });
        element[0].addEventListener('mouseover', function(eventData) {
          //down = 0;
        });
        element[0].addEventListener('mouseout', function(eventData) {
          //down = 0;
        });

        var oldRelativeX = 0;
        var oldRelativeY = 0;

        var diffX = 0;
        var diffY = 0;

        element[0].addEventListener('mousemove', function(eventData) {
            var relativeX = eventData.pageX - element[0].offsetLeft;
            var relativeY = eventData.pageY - element[0].offsetTop;
            //console.log('rel x: ' + relativeX);
            //console.log('rel y: ' + relativeY);

            diffX = relativeX - oldRelativeX;
            diffY = relativeY - oldRelativeY;

            oldRelativeX = relativeX;
            oldRelativeY = relativeY;

            //scope[x] = relativeX;
            //scope[y] = relativeY;
          if (down === 1) {
            if ((relativeX>0) && (relativeY>0) ) {
              scope[x] = diffX;
              scope[y] = diffY;
              scope.$apply();
            }
            //element[0].style.background='#0F0';
          } else {
            //element[0].style.background='#F00';
          }
        });

      }
    };
  });
