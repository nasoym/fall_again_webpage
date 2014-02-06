'use strict';

angular.module('FallAgainApp')
  .directive('slide', function ($swipe) {
    return {
      restrict: 'A',
      //scope: true,
      link: function postLink(scope, element, attrs) {
        
        var slide = attrs.slide;
        //console.log('slide::: ' + JSON.stringify(scope[slide]));
        scope.$watch(slide, function(newVal, oldVal) {
            //console.log('slide: ',newVal, oldVal);
            var vertical = 0;
            var horizontal = newVal;
            element[0].style.transform = 'translate3d(' + horizontal + 'px,' + vertical + 'px, 0px)';
          });
        /*
        //element.text('this is the slide directive');
        $swipe.bind(element,{
          start : function(event) {
            console.log('start: ' , JSON.stringify(event));
          },
          move : function(event) {
            console.log('move: ' , JSON.stringify(event));
          },
          end : function(event) {
            console.log('end: ' , JSON.stringify(event));
          },
          cancel : function(event) {
            console.log('cancel: ' , event);
          },
        });
        */
      }
    };
  });
