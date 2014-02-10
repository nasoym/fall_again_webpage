'use strict';

angular.module('FallAgainApp')
  .directive('setposition', function () {
    return {
      restrict: 'A',
      link: function postLink(scope, element, attrs) {
        /*
        console.log('>:' + element[0].offsetLeft);
        console.log('>:' + element[0].offsetTop);
        console.log('>:' + element[0].offsetHeight);
        console.log('>:' + element[0].offsetWidth);
        console.log('>:' + element[0].height);
        console.log('>:' + element[0].width);
        */
        var x = attrs.testX;
        var y = attrs.testY;
        var scopeLeft = attrs.left;
        var scopeTop = attrs.top;

        var scopeWidth = attrs.width;
        var scopeHeight = attrs.height;
        var scopeDown = attrs.testDown;


        //console.log('slide::: ' + JSON.stringify(scope[slide]));
        //console.log('TOP: ' + element[0].style.marginTop);

        //var left = element[0].offsetLeft;
        //var top = element[0].offsetTop;
        //var left = 0;
        //var top = -300;
        var left = parseInt(element[0].style.marginLeft.replace(/px$/,''));
            //console.log('setposition:left: ' + left);
        //var top = parseInt(element[0].style.marginTop.replace(/px$/,''));
        //element[0].style.marginTop = top + 'px';
        var top = -element[0].offsetHeight - scope[scopeHeight];
        scope[scopeTop] = top;
        //console.log('top: ' + top);
        element[0].style.marginTop = top + 'px';
        scope.$watch(x, function(newVal, oldVal) {
            //var diff = newVal - oldVal;
            //console.log('setposition: ' + diff);
            left += newVal;
            //console.log('setposition:left: ' + left);
            var maxValue = element[0].offsetWidth - scope[scopeWidth];
            //console.log('setposition:max: ' + maxValue);
            if (left < -maxValue ) {
              left = -maxValue;
            }
            if (left > 0 ) {
              left = 0;
            }

            scope[scopeLeft] = left;
            //console.log('setposition:left: ' + left);
            element[0].style.marginLeft = left + 'px';
          });
        scope.$watch(y, function(newVal, oldVal) {
            //console.log('w: ' + scope[scopeWidth]);
            //console.log('h: ' + scope[scopeHeight]);
            //console.log('setposition: ',newVal, oldVal);
            top += newVal;
            var maxValue = element[0].offsetHeight - scope[scopeHeight];
            if (top < -maxValue ) {
              top = -maxValue;
            }
            if (top > 0 ) {
              top = 0;
            }
            scope[scopeTop] = top;
            //console.log('setposition:top: ' + top);
            element[0].style.marginTop = top + 'px';
          });

        var timer = setInterval(function() {
          if (scope[scopeDown] === 1) {
            //console.log('.');
          } else {
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
