/**
 * Copyright (c) 2014 Neil Munro <neilmunro@gmail.com>.
 */

"use strict";

(function() {
  window.onload = function() {
    var dash = new Dash();
    dash.load(function() {
      var sectionList = document.getElementById("sectionList"); 
      var socket = io.connect(dash.server);

      socket.on(dash.api.section.recv.reset, function(data) {
        sectionList.selectedIndex = data.counter;
        console.log("Testing!");
      });

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

    nextLink.addEventListener('click', function nextSection() {
      dash.actions.next();      
    });

    previousLink.addEventListener('click', function previousSection() {
      dash.actions.previous();
    });

    resetLink.addEventListener('click', function resetPresentation() {
      dash.actions.reset();
    });

    sectionList.addEventListener('change', function change() {
     dash.actions.get(this.value);
    });
  }
}());
