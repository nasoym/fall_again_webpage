'use strict';

angular.module('FallAgainApp')
  .directive('test', function () {
    return {
      restrict: 'A',
      link: function postLink(scope, element, attrs) {

        var x = attrs.testX;
        var y = attrs.testY;

        var scopeWidth = attrs.width;
        var scopeHeight = attrs.height;
        var scopeDown = attrs.testDown;

        scope[scopeWidth] = element[0].offsetWidth;
        scope[scopeHeight] = element[0].offsetHeight;

        var down = 0;
        scope[scopeDown] = 0;
        element[0].addEventListener('mousedown', function(eventData) {
          down = 1;
          scope[scopeDown] = 1;
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

            diffX = relativeX - oldRelativeX;
            diffY = relativeY - oldRelativeY;

            oldRelativeX = relativeX;
            oldRelativeY = relativeY;

          if (down === 1) {
            if ((relativeX>0) && (relativeY>0) ) {
              scope[x] = diffX;
              scope[y] = diffY;
              scope.$apply();
            }
          }
        });

      }
    };
  });
