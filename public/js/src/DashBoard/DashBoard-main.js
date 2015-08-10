/*
 * Copyright (c) 2014-2015 Neil Munro <neilmunro@gmail.com>.
 */

"use strict";

function Dash() {
  return (this === window) ? new Dash() : this;
}

Dash.prototype.load = function(cb) {
  Dash.prototype.server = location.origin;
  Dash.prototype.timer = 0;

  if(cb !== undefined) cb();
};

Dash.prototype.api = {
  "section": {
    "send": {
      "all": "request all",
      "next": "request next",
      "prev": "request previous",
      "reset": "request reset",
      "get": "request get",
      "all": "request all"
    },

    "recv": {
      "current": "response current",
      "reset": "response reset",
      "all": "response all"
    }
  },

  "message": {
    "send": "send",
    "recv": "recv"
  },

  "media": {
    "send": {
      "play": "play",
      "pause": "pause",
      "stop": "stop"
    },

    "recv": {
      "play": "play",
      "pause": "pause",
      "stop": "stop"
    }
  }
};

Dash.prototype.media = {
  "play": function(id) {
    var socket = io.connect(Dash.prototype.server);
    socket.emit(Dash.prototype.api.media.send.play, {
      "state": "play",
      "id": id
    });
  },

  "pause": function(id) {
    var socket = io.connect(Dash.prototype.server);
    socket.emit(Dash.prototype.api.media.send.pause, {
      "state": "pause",
      "id": id
    });
  },

  "stop": function(id) {
    var socket = io.connect(Dash.prototype.server);
    socket.emit(Dash.prototype.api.media.send.stop, {
      "state": "stop",
      "id": id
    });
  }
};

Dash.prototype.actions = {
  "next": function() {
    var socket = io.connect(Dash.prototype.server);
    socket.emit(Dash.prototype.api.section.send.next, {});
  },

  "previous": function() {
    var socket = io.connect(Dash.prototype.server);
    socket.emit(Dash.prototype.api.section.send.previous, {});
  },

  "reset": function() {
    var socket = io.connect(Dash.prototype.server);
    socket.emit(Dash.prototype.api.section.send.reset, {});
  },

  "get": function(id) {
    var socket = io.connect(Dash.prototype.server);
    socket.emit(Dash.prototype.api.section.send.get, {
      "id": id 
    });
  }
};

Dash.prototype.messages = {
  "send": function(msg) {
    var socket = io.connect(Dash.prototype.server);
    socket.emit(Dash.prototype.api.message.send, {
      "msg": msg
    });
  }
};

Dash.prototype.DOM = {
  "addText": function(cb) {
    if(cb !== undefined) cb();
  },

  "addAudio": function(cb) {
    if(cb !== undefined) cb();
  },

  "addVideo": function(cb) {
    if(cb !== undefined) cb();
  },

  "addAnimation": function(cb) {
    if(cb !== undefined) cb();
  },

  "clear": function(node) {
    while(node.hasChildNodes()) {
      node.removeChild(node.firstChild);
    }
  }
};
