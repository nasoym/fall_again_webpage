'use strict';

angular.module('FallAgainApp')
  .controller('MainCtrl', function ($scope, $location, PingWebsockets, $interval) {
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
        ws.send(JSON.stringify({type: 'message', content: 'pressed'}));
      }
    });

    $scope.$on('user_release',function(event, payload) {
      if (touchState === 1) {
        touchState = 0;
        console.log('user_release: ');
        ws.send(JSON.stringify({type: 'message', content: 'released'}));
      }
    });


    if (urlParameters.mock !== undefined) {
      console.log('mocking user actions');
      $scope.mockTouch = false;
      $interval(function() {
        var number = Math.random();
        if (ws.opened) {
          /*
          if (number < 0.001){
            console.log('mock is closing the websocket connection!');
            ws.ws.close();
          } else if (number < 0.01) {
          */
          if (number < 0.001) {
            if ($scope.mockTouch) {
              $scope.mockTouch = false;
              ws.send(JSON.stringify({type: 'message', content: 'released'}));
            } else {
              $scope.mockTouch = true;
              ws.send(JSON.stringify({type: 'message', content: 'pressed'}));
            }
          }
        }
      },100);
    }

    //$scope.$on('image_animation',function(event, payload) {
    //  ws.send(JSON.stringify({type: 'image_animation', percentage: payload.percentage}));
    //});

    $scope.playanimation = function() {
      console.log('play animation');
      $scope.$broadcast('play');
    };
    $scope.stopanimation = function() {
      console.log('stop animation');
      $scope.$broadcast('stop');
    };

  });

