'use strict';

angular.module('FallAgainApp')
  .directive('test', function () {
    return {
      restrict: 'A',
      link: function postLink(scope, element, attrs) {
        console.log('test');
        element[0].style.transform = 'translate3d(' + 60 + 'px,' + 300 + 'px, ' + 0 + 'px)';

      }
    };
  });

