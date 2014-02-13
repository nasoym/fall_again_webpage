'use strict';

angular.module('FallAgainApp')
  .directive('playanimation', function () {
    return {
      restrict: 'A',
      link: function postLink(scope, element, attrs) {

        scope.$on('play', function() {
          console.log('listening to play');
          //element.animate({ left: "+=100px" }, 2000 );
          /*
          element[0].style.width = "500px";
          element[0].style.transitionProperty = "width";
          element[0].style.transitionDuration= "50000ms";
          */
          element[0].className += " move";
        });
        scope.$on('stop', function() {
          console.log('listening to stop');
          //console.log('style: ', element[0].style);
          //console.log('>>: ' + element[0].style.AnimationPlayState);
          //console.log('>>: ' + element[0].style.animationPlayState);
          //console.log('>>: ' + element[0].style.MozAnimationPlayState);
          //element[0].style.animationPlayState = 'paused';
          //element[0].style = '';

          //element[0].style.transitionProperty = "";
          //element[0].style.transitionDuration= "";
          //element[0].style.animationPlayState = "paused";
          element[0].className += " stopanimation";
          //element[0].className = "";
          //console.log('class: ' + element[0].className);
          //console.log('class: ' + element[0].style.marginTop);

        });


      }
    };
  });
