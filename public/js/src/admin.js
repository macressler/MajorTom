/**
 * Copyright (c) 2014 Neil Munro <neilmunro@gmail.com>.
 */

"use strict";

(function() {
  var dash = new Dash();

  window.onload = function() {
    dash.load(function() {
      var sectionList = document.getElementById("sectionList"); 
      var socket = io.connect(dash.server);

      socket.on(dash.api.section.recv.all, function(data) {
        while(sectionList.hasChildNodes()) {
          sectionList.removeChild(sectionList.lastChild);
        }

        data.sections.forEach(function(section, index, array) {
          var option = document.createElement('option');
          option.setAttribute('value', index);
          option.innerHTML = section.title;
          sectionList.appendChild(option);
        });

        sectionList.selectedIndex = data.counter;
      });

      socket.on(dash.api.section.recv.current, function(data) {
        sectionList.selectedIndex = data.counter;
      });
    });

    // Setup event listeners.
    var sendBtn = document.getElementById('send');
    var nextLink = document.getElementById('nextLink');
    var previousLink = document.getElementById('previousLink');
    var resetLink = document.getElementById('resetLink');
    var sectionList = document.getElementById('sectionList');

    sendBtn.addEventListener('click', function() {
      var msg = document.getElementById('msg');
      var msgs = document.getElementById('messages');
      var contents = (msgs.value !== "") ? msgs.value + "\n\n" : "";

      contents += "Admin: " + msg.value;

      msgs.value = contents;
      msg.value = "";

      dash.messages.send(contents);
    });

    nextLink.addEventListener('click', function() {
      dash.actions.next();      
    });

    previousLink.addEventListener('click', function() {
      dash.actions.previous();
    });

    resetLink.addEventListener('click', function() {
      dash.actions.reset();
    });

    sectionList.addEventListener('change', function() {
     dash.actions.get(this.value);
    });
  }
}());
