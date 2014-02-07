'use strict';

angular.module('FallAgainApp')
  .directive('setposition', function () {
    return {
      restrict: 'A',
      link: function postLink(scope, element, attrs) {
        console.log('>:' + element[0].offsetLeft);
        console.log('>:' + element[0].offsetTop);
        console.log('>:' + element[0].offsetHeight);
        console.log('>:' + element[0].offsetWidth);
        console.log('>:' + element[0].height);
        console.log('>:' + element[0].width);
        var x = attrs.testX;
        var y = attrs.testY;
        //console.log('slide::: ' + JSON.stringify(scope[slide]));

        //var left = element[0].offsetLeft;
        //var top = element[0].offsetTop;
        var left = 0;
        var top = 0;
        scope.$watch(x, function(newVal, oldVal) {
            //var diff = newVal - oldVal;
            //console.log('setposition: ' + diff);
            left += newVal;
            //console.log('setposition:left: ' + left);
            element[0].style.marginLeft = left + 'px';
          });
        scope.$watch(y, function(newVal, oldVal) {
            //console.log('setposition: ',newVal, oldVal);
            top += newVal;
            //console.log('setposition:top: ' + top);
            element[0].style.marginTop = top + 'px';
          });
      }
    };
  });
