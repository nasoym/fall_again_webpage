'use strict';

angular.module('FallAgainApp')
  .directive('setposition', function () {
    return {
      restrict: 'A',
      link: function postLink(scope, element, attrs) {

        var scopeX = attrs.setpositionX;
        var scopeY = attrs.setpositionY;
        var scopeWidth = attrs.setpositionViewWidth;
        var scopeHeight = attrs.setpositionViewHeight;
        var scopeDown = attrs.setpositionPointerDown;

        var left = parseInt(element[0].style.marginLeft.replace(/px$/,''));
        //var top = parseInt(element[0].style.marginTop.replace(/px$/,''));
        var top = -element[0].offsetHeight - scope[scopeHeight];
        element[0].style.marginTop = top + 'px';

        scope.$watch(scopeX, function(newVal, oldVal) {
            left += newVal;
            var maxValue = element[0].offsetWidth - scope[scopeWidth];
            if (left < -maxValue ) {
              left = -maxValue;
            }
            if (left > 0 ) {
              left = 0;
            }
            element[0].style.marginLeft = left + 'px';
          });
        scope.$watch(scopeY, function(newVal, oldVal) {
            top += newVal;
            var maxValue = element[0].offsetHeight - scope[scopeHeight];
            if (top < -maxValue ) {
              top = -maxValue;
            }
            if (top > 0 ) {
              top = 0;
            }
            element[0].style.marginTop = top + 'px';
            var topPercentage = 1 - -top / maxValue;
            scope.$emit('user_touch', {percentage: topPercentage});
          });

        setInterval(function() {
          if (scope[scopeDown] !== 1) {
            var maxValue = element[0].offsetHeight - scope[scopeHeight];
            if (top > -maxValue){
              top -= 5;
              element[0].style.marginTop = top + 'px';
              var topPercentage = 1 - -top / maxValue;
              scope.$emit('image_animation', {percentage: topPercentage});
            }
          }
        }, 20);

      }
    };
  });
