/*
 * Copyright 2014 Neil Munro <neilmunro@gmail.com>.
 */

function Dash() {
  "use strict";

  return (this === window) ? new Dash() : this;
}

Dash.prototype.load = function(cb) {
  "use strict";

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
    "use strict";

    var socket = io.connect(Dash.prototype.server);
    socket.emit(Dash.prototype.api.media.send.play, {
      "state": "play",
      "id": id
    });
  },

  "pause": function(id) {
    "use strict";

    var socket = io.connect(Dash.prototype.server);
    socket.emit(Dash.prototype.api.media.send.pause, {
      "state": "pause",
      "id": id
    });
  },

  "stop": function(id) {
    "use strict";

    var socket = io.connect(Dash.prototype.server);
    socket.emit(Dash.prototype.api.media.send.stop, {
      "state": "stop",
      "id": id
    });
  }
};

Dash.prototype.actions = {
  "next": function() {
    "use strict";

    var socket = io.connect(Dash.prototype.server);
    socket.emit(Dash.prototype.api.section.send.next, {});
  },

  "previous": function() {
    "use strict";

    var socket = io.connect(Dash.prototype.server);
    socket.emit(Dash.prototype.api.section.send.previous, {});
  },

  "reset": function() {
    "use strict";

    var socket = io.connect(Dash.prototype.server);
    socket.emit(Dash.prototype.api.section.send.reset, {});
  },

  "get": function(id) {
    "use strict";
    
    var socket = io.connect(Dash.prototype.server);
    socket.emit(Dash.prototype.api.section.send.get, {
      "id": id 
    });
  }
};

Dash.prototype.messages = {
  "send": function(msg) {
    "use strict";

    var socket = io.connect(Dash.prototype.server);
    socket.emit(Dash.prototype.api.message.send, {
      "msg": msg
    });
  }
};

Dash.prototype.DOM = {
  "addText": function(cb) {
    "use strict";

    if(cb !== undefined) cb();
  },

  "addAudio": function(cb) {
    "use strict";

    if(cb !== undefined) cb();
  },

  "addVideo": function(cb) {
    "use strict";

    if(cb !== undefined) cb();
  },

  "addAnimation": function(cb) {
    "use strict";

    if(cb !== undefined) cb();
  },

  "clear": function(node) {
    "use strict";

    while(node.hasChildNodes()) {
      node.removeChild(node.firstChild);
    }
  }
};
