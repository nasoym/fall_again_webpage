'use strict';

angular.module('FallAgainApp')
  .controller('MainCtrl', function ($scope, $location, PingWebsockets) {
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
      ws = new PingWebsockets(urlParameters.host);
      ws.connect();
      ws.send(JSON.stringify({type:'hello'}));
      ws.onmessage = function(message) {
        console.log('message: ' + message.data);
      };
    } else {
      console.log('no websocket host is defined');
    }

    var touchState = 0;

    $scope.$on('user_touch',function(event, payload) {
      if ((touchState === 0) && (payload.percentage > 0.1)) {
        touchState = 1;
        console.log('user_touch: ' + payload.percentage);
        if (websocketSendable) {
          ws.send(JSON.stringify({type: 'message', content: 'pressed'}));
        }
      }
    });

    $scope.$on('user_release',function(event, payload) {
      if (touchState === 1) {
        touchState = 0;
        console.log('user_release: ');
        if (websocketSendable) {
          ws.send(JSON.stringify({type: 'message', content: 'released'}));
        }
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

