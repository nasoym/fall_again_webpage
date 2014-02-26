'use strict';

angular.module('FallAgainApp')
  .factory('PingWebsockets', function() {
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
        connect : function() {
          this.ws = this._createConnection(this.host);
          var wsObject = this;
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
            if (wsObject.onclose !== undefined) {
              wsObject.onclose(payload);
            }
          };
          this.ws.onerror = function(payload) {
            if (wsObject.onerror !== undefined) {
              wsObject.onerror(payload);
            }
          };
          this.ws.onmessage = function(payload) {
            if (wsObject.onmessage !== undefined) {
              wsObject.onmessage(payload);
            }
          };
        },
      };
      config = config || {};
      $.extend(websocketObject,config);
      return websocketObject;
    };
  });

