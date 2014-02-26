'use strict';

angular.module('FallAgainApp')
  .factory('PingWebsockets', function($timeout, $interval) {
    return function(host, config) {
      var websocketObject = {
        host : host,
        ws : null,
        opened : false,
        wsMessageQueue: [],
        _createConnection: function(host) {
          return new WebSocket(host);
        },
        send : function(message) {
          if (this.opened) {
            this.ws.send(message);
          } else {
            this.wsMessageQueue.push(message);
          }
        },

        reconnectTimeout: 4000,
        pingInterval: 2000,

        timeout : null,
        interval : null,
        cancelTimeout : function() {
          if (this.timeout !== null) {
            $timeout.cancel(this.timeout);
            this.timeout = null;
          }
        },
        refreshTimeout : function(timeout) {
          timeout = timeout || this.pingInterval * 2;
          this.cancelTimeout();
          var wsObject = this;
          this.timeout = $timeout(function() {
            console.log('reached timeout');
            wsObject.connect();
          }, timeout);
        },

        cancelInterval: function() {
          if (this.interval !== null) {
            $interval.cancel(this.interval);
            this.interval = null;
          }
        },
        startInterval: function() {
          this.cancelInterval();
          var wsObject = this;
          this.interval = $interval(function() {
            if (wsObject.opened) {
              wsObject.send(JSON.stringify({type:'ping'}));
            }
          },this.pingInterval);
        },


        connect : function() {
          console.log('connect to: ' + this.host);
          //if (this.ws === null) {
            var wsObject = this;

            this.ws = this._createConnection(this.host);
            
            this.startInterval();
            this.refreshTimeout();

            this.ws.onopen = function(payload) {
              wsObject.opened = true;
              if (wsObject.onopen !== undefined) {
                wsObject.onopen(payload);
              }
              while(wsObject.wsMessageQueue.length > 0) {
                var message = wsObject.wsMessageQueue.pop();
                wsObject.ws.send(message);
              }
            };
            this.ws.onclose = function(payload) {
              console.log('closed: ' + JSON.stringify(payload));
              wsObject.cancelInterval();
              wsObject.refreshTimeout(wsObject.reconnectTimeout);
              if (wsObject.onclose !== undefined) {
                wsObject.onclose(payload);
              }
            };
            this.ws.onerror = function(payload) {
              console.log('error: ' + JSON.stringify(payload));
              wsObject.cancelInterval();
              wsObject.refreshTimeout(wsObject.reconnectTimeout);
              if (wsObject.onerror !== undefined) {
                wsObject.onerror(payload);
              }
            };
            this.ws.onmessage = function(payload) {
              var websocketMessage = JSON.parse(payload.data);
              if ((websocketMessage.type !== undefined) &&(websocketMessage.type === 'pong')){
                //console.log('pong');
                wsObject.refreshTimeout();
                return;
              }
              if (wsObject.onmessage !== undefined) {
                wsObject.onmessage(payload);
              }
            };
          //}
        },
      };
      config = config || {};
      $.extend(websocketObject,config);
      return websocketObject;
    };
  });

