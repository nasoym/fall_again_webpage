'use strict';

angular.module('04FallAgainFallBetterApp')
  .directive('mouse', function () {
    return {
      restrict: 'A',
      link: function postLink(scope, element, attrs) {
        console.log('mouse<<<<');
        element[0].addEventListener('mousedown', function(eventData) {
          console.log('mouse down: ' ,eventData);
        });
        element[0].addEventListener('mouseup', function(eventData) {
          console.log('mouse up: ' ,eventData);
        });
        element[0].addEventListener('mousemove', function(eventData) {
          //console.log('mouse move: ' ,eventData);
          if (attrs.x !== undefined){
            scope[attrs.x] = eventData.pageX;
            scope.$apply();
          }
          if (attrs.y !== undefined){
            scope[attrs.y] = eventData.pageY;
            scope.$apply();
          }
        });
        element[0].addEventListener('mouseover', function(eventData) {
          console.log('mouse over: ' ,eventData);
        });
        element[0].addEventListener('mouseout', function(eventData) {
          console.log('mouse out: ' ,eventData);
        });
        element[0].addEventListener('touchmove', function(eventData) {
          console.log('touchmove: ' ,eventData);
          if (attrs.x !== undefined){
            scope[attrs.x] = eventData.pageX;
            scope.$apply();
          }
          if (attrs.y !== undefined){
            scope[attrs.y] = eventData.pageY;
            scope.$apply();
          }
        });
        element[0].addEventListener('touch', function(eventData) {
          console.log('touch: ' ,eventData);
          if (attrs.x !== undefined){
            scope[attrs.x] = eventData.pageX;
            scope.$apply();
          }
          if (attrs.y !== undefined){
            scope[attrs.y] = eventData.pageY;
            scope.$apply();
          }
        });
      }
    };
  });
