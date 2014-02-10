'use strict';

angular.module('FallAgainApp')
  .directive('mouse', function () {
    return {
      restrict: 'A',
      link: function postLink(scope, element, attrs) {

        var scopeRelativeX = attrs.mouseRelativeX;
        var scopeRelativeY = attrs.mouseRelativeY;
        var scopeWidth = attrs.mouseViewWidth;
        var scopeHeight = attrs.mouseViewHeight;
        var scopeDown = attrs.mouseDown;

        scope[scopeWidth] = element[0].offsetWidth;
        scope[scopeHeight] = element[0].offsetHeight;
        scope[scopeDown] = 0;

        element[0].addEventListener('mousedown', function(eventData) {
          scope[scopeDown] = 1;
        });
        element[0].addEventListener('mouseup', function(eventData) {
          scope[scopeDown] = 0;
        });
        element[0].addEventListener('mouseover', function(eventData) {
        });
        element[0].addEventListener('mouseout', function(eventData) {
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
          if (scope[scopeDown] === 1) {
            if ((relativeX>0) && (relativeY>0)) {
              scope[scopeRelativeX] = diffX;
              scope[scopeRelativeY] = diffY;
              scope.$apply();
            }
          }
        });

      }
    };
  });

