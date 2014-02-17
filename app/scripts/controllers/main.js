'use strict';

angular.module('FallAgainApp')
  .controller('MainCtrl', function ($scope, $location) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
    $scope.relativeX = 0;
    $scope.relativeY = 0;
    $scope.mouseDown = 0;
    $scope.viewWidth = 0;
    $scope.viewHeight = 0;

    var websocketSendable = false;
    var ws = null;
    var urlParameters = $location.search();
    if (urlParameters.host !== undefined) {
      console.log('ws:init:>' + urlParameters.host + '<');
      ws = new WebSocket(urlParameters.host);
      ws.onopen = function() {
        websocketSendable = true;
        console.log('websocket connection opend: sending hello');
        ws.send(JSON.stringify({type:'hello'}));
      };
      ws.onmessage = function(message) {
        console.log('message: ' + message.data);
      };
    }

    $scope.$on('user_touch',function(event, payload) {
      if (websocketSendable) {
        ws.send(JSON.stringify({type: 'user_touch', percentage: payload.percentage}));
      }
    });

    $scope.$on('image_animation',function(event, payload) {
      if (websocketSendable) {
        ws.send(JSON.stringify({type: 'image_animation', percentage: payload.percentage}));
      }
    });

    $scope.playanimation = function() {
      console.log('play animation');
      $scope.$broadcast('play');
    };
    $scope.stopanimation = function() {
      console.log('stop animation');
      $scope.$broadcast('stop');
    };

  });

