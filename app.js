/*
 * Copyright (c) 2014-2015 Neil Munro <neilmunro@gmail.com>.
 */

"use strict";

var fs = require('fs');
var path = require('path');
var express = require('express');
var app = express();
var server = require('http').createServer(app);
var io = require('socket.io').listen(server);
var API = require('./api');

var name = process.argv[2];
var presentation = path.join(__dirname, "presentations", name);
var sections = path.join(presentation, "presentation.json");
var sectionList = JSON.parse(fs.readFileSync(sections, "utf8"));
var sectionCounter = 0;
var msg = "No messages.";

console.log("Starting: ", name);

app.use(express.static(presentation));
app.use(express.static('public'));
app.use(express.static('bower_components'));

app.get('/admin', function(request, response) {
  var admin = path.join(__dirname, "public", "html", "admin.html");
  response.sendfile(admin);
});

app.get('/staff', function(request, response) {
  "use strict";
  var staff = path.join(__dirname, "public", "html", "staff.html");
  response.sendfile(staff);
});

app.get('/test/:id', function(request, response) {
  var testName = path.join(__dirname, 'public', 'test', request.params.id + '.html');
  response.sendfile(testName);
});

function counterNext() {
  sectionCounter = (sectionCounter >= sectionList.length -1) ? 0 : sectionCounter +1;  
}

function counterPrev() {
  sectionCounter = (sectionCounter === 0) ? sectionList.length -1 : sectionCounter -1;  
}

function getSectionCounter() {
  return sectionCounter;
}

function getSection() {
  return sectionList[sectionCounter];
}

function counterReset() {
  sectionCounter = 0;
}

function counterSet(number) {
  if(number < 0 || number > sectionList.length -1) {
    number = 0;
  } 

  sectionCounter = number;
}

function getAll() {
  return sectionList; 
}

io.sockets.on('connection', function(socket) {
  // Emit needed information upfront.
  socket.emit(API.section.recv.current, {
    "section": getSection(),
    "counter": getSectionCounter() 
  });

  socket.emit(API.section.recv.all, {
    "sections": getAll(),
    "counter": getSectionCounter() 
  });

  io.sockets.emit(API.message.recv, {
    "msg": msg
  });

  socket.on(API.section.send.next, function(data) {
    counterNext();
    io.sockets.emit(API.section.recv.current, {
      "section": getSection(),
      "counter": getSectionCounter() 
    });
  });

  socket.on(API.section.send.previous, function(data) {
    counterPrev();
    io.sockets.emit(API.section.recv.current, {
      "section": getSection(),
      "counter": getSectionCounter() 
    });
  });

  socket.on(API.section.send.get, function(data) {
    counterSet(parseInt(data.id, 10));
    io.sockets.emit(API.section.recv.current, {
      "section": getSection(),
      "counter": getSectionCounter() 
    });
  });

  socket.on(API.section.send.all, function() {
    io.sockets.emit(API.section.recv.all, {
      "sections": getAll(),
      "counter": getSectionCounter() 
    });
  });

  socket.on(API.section.send.reset, function(data) {
    counterReset();
    io.sockets.emit(API.section.recv.reset, {
      "section": getSection(),
      "counter": getSectionCounter() 
    });
  });

  socket.on(API.message.send, function(data) {
    msg = data.msg;
    io.sockets.emit(API.message.recv, {
      "msg": data.msg
    });
  });

  // Send the play signal.
  socket.on(API.media.send.play, function(data) {
    io.sockets.emit(API.media.recv.play, {
      "state": data.state,
      "id": data.id
    });
  });

  socket.on(API.media.send.pause, function(data) {
    io.sockets.emit(API.media.recv.pause, {
      "state": data.state,
      "id": data.id
    });
  });

  socket.on(API.media.send.stop, function(data) {
    io.sockets.emit(API.media.recv.stop, {
      "state": data.state,
      "id": data.id
    });
  });
});

// This keeps the server alive.
server.listen(1337, function() { "use strict"; });
