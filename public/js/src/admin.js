/**
 * Copyright (c) 2014 Neil Munro <neilmunro@gmail.com>.
 */
function init() {
  "use strict";

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
}

function sendMSG() {
  "use strict";

  var msg = document.getElementById('msg');
  var msgs = document.getElementById('messages');
  var contents = (msgs.value !== "") ? msgs.value + "\n\n" : "";

  contents += "Admin: " + msg.value;

  msgs.value = contents;
  msg.value = "";

  dash.messages.send(contents);
}
