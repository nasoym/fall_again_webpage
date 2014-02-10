'use strict';

angular.module('FallAgainApp')
  .directive('setposition', function () {
    return {
      restrict: 'A',
      link: function postLink(scope, element, attrs) {
        var x = attrs.testX;
        var y = attrs.testY;
        var scopeLeft = attrs.left;
        var scopeTop = attrs.top;

        var scopeWidth = attrs.width;
        var scopeHeight = attrs.height;
        var scopeDown = attrs.testDown;


        var left = parseInt(element[0].style.marginLeft.replace(/px$/,''));
            //console.log('setposition:left: ' + left);
        //var top = parseInt(element[0].style.marginTop.replace(/px$/,''));
        var top = -element[0].offsetHeight - scope[scopeHeight];
        scope[scopeTop] = top;
        element[0].style.marginTop = top + 'px';
        scope.$watch(x, function(newVal, oldVal) {
            left += newVal;
            var maxValue = element[0].offsetWidth - scope[scopeWidth];
            if (left < -maxValue ) {
              left = -maxValue;
            }
            if (left > 0 ) {
              left = 0;
            }
            scope[scopeLeft] = left;
            element[0].style.marginLeft = left + 'px';
          });
        scope.$watch(y, function(newVal, oldVal) {
            top += newVal;
            var maxValue = element[0].offsetHeight - scope[scopeHeight];
            if (top < -maxValue ) {
              top = -maxValue;
            }
            if (top > 0 ) {
              top = 0;
            }
            scope[scopeTop] = top;
            element[0].style.marginTop = top + 'px';
          });

        var timer = setInterval(function() {
          if (scope[scopeDown] !== 1) {
            var maxValue = element[0].offsetHeight - scope[scopeHeight];
            if (top > -maxValue){
              top -= 2;
              element[0].style.marginTop = top + 'px';
            }
          }
        }, 10);

      }
    };
  });
