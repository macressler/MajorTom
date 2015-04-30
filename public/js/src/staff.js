/**
 * Copyright (c) 2014 Neil Munro <neilmunro@gmail.com>.
 */
function init() {
  "use strict";
  
  var socket = io.connect(dash.server);
  var message = document.getElementById('messages');
  var timer = 0;

  socket.on(dash.api.message.recv, function(data) {
    message.value = data.msg; 
  });

  // On section change update 'setlist'.
  socket.on(dash.api.section.recv.current, function(section) {
    var sections = document.getElementsByClassName("section");
    var length = sections.length;
    var active;
    var i;

    // Reset the class back to section.
    for(i = 0; i < length; i++) {
      sections[i].setAttribute("class", "section");
    }

    active = document.getElementById(section.counter);

    if(active !== null) {
      active.setAttribute("class", "section active");
      window.location = "http://" + location.host + "/staff#" + section.counter;
    }
  });

  socket.on(dash.api.section.recv.all, function(presentation) {
    var setList = document.getElementById("setList");

    while(setList.hasChildNodes()) {
      setList.removeChild(setList.lastChild);
    }

    presentation.sections.forEach(function(element, index, array) {
      var row = document.createElement("tr");
      var title = document.createElement("td");
      var eTime = document.createElement("td");
      var tTime = document.createElement("td");

      row.setAttribute("id", index);

      if(index === 0) {
        row.setAttribute("class", "section active");
      }
      else {
        row.setAttribute("class", "section");
      }

      title.innerHTML = element.title;
      eTime.innerHTML = "00";
      tTime.innerHTML = element.duration;

      row.appendChild(title);
      row.appendChild(eTime);
      row.appendChild(tTime);

      setList.appendChild(row);
    });
  });
}
