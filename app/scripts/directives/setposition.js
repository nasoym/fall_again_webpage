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

        var left = 0;
        var top = -element[0].offsetHeight - scope[scopeHeight];

        element[0].style.transform = 'translate3d(' + left + 'px,' + top + 'px, ' + 0 + 'px)';

        scope.$watch(scopeX, function(newVal, oldVal) {
            left += newVal;
            var maxValue = element[0].offsetWidth - scope[scopeWidth];
            if (left < -maxValue ) {
              left = -maxValue;
            }
            if (left > 0 ) {
              left = 0;
            }
            element[0].style.transform = 'translate3d(' + left + 'px,' + top + 'px, ' + 0 + 'px)';
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
            element[0].style.transform = 'translate3d(' + left + 'px,' + top + 'px, ' + 0 + 'px)';
            var topPercentage = 1 - -top / maxValue;
            scope.$emit('user_touch', {percentage: topPercentage});
          });

        setInterval(function() {
          if (scope[scopeDown] !== 1) {
            var maxValue = element[0].offsetHeight - scope[scopeHeight];
            if (top > -maxValue){
              var distanceToDefault = top - -maxValue;
              var distanceToAnimate = Math.sqrt(distanceToDefault); 
              var animationSpeedFactor = 1.25;
              distanceToAnimate = distanceToAnimate * animationSpeedFactor;

              if ((distanceToAnimate > 0) && (distanceToAnimate < 1)){
                //distanceToAnimate = 1;
              }
              var maxAnimateValue = maxValue * 0.02;
              if (distanceToAnimate > maxAnimateValue) {
                //distanceToAnimate = maxAnimateValue;
              }
              top -= distanceToAnimate;

              element[0].style.transform = 'translate3d(' + left + 'px,' + top + 'px, ' + 0 + 'px)';

              var topPercentage = 1 - -top / maxValue;
              scope.$emit('image_animation', {percentage: topPercentage});
            }
          }
        }, 20);

      }
    };
  });
