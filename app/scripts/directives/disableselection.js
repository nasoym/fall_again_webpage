'use strict';

angular.module('FallAgainApp')
  .directive('disableselection', function () {
    return {
      restrict: 'A',
      link: function postLink(scope, element, attrs) {
        if (typeof element[0].onselectstart!="undefined") { 
          // if IE
          element[0].onselectstart=function(){return false}
        } else if (typeof element[0].style.MozUserSelect!="undefined") {
          // if Firefox
          //console.log('MozUserSelect');
          element[0].style.MozUserSelect="none";
        }
        element[0].ondragstart = function() { return false; } 
      }
    };
  });
