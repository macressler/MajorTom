/**
 * Copyright (c) 2014-2015 Neil Munro <neilmunro@gmail.com>.
 */

"use strict";

(function() {
  var dash = new Dash();

  window.onload = function() {
    function zeroPad(num) {
      return (num < 10) ? "0" + num : num;  
    }

    function displayCurrent(section) {
      var sections = document.getElementsByClassName("section");
      var length = sections.length;
      var active;
      var i;

      // Clear interval first!
      if(timer !== 0) {
        clearInterval(timer);
      }

      // Reset the class back to section.
      for(i = 0; i < length; i++) {
        sections[i].setAttribute("class", "section");
      }

      active = document.getElementById(section.counter);

      if(active !== null) {
        active.setAttribute("class", "section active");
        window.location = "http://" + location.host + "/staff#" + section.counter;
      }

      // Start section count down.
      timer = setInterval(function() {
        var node = document.getElementById(section.counter); 
        var cell = node.getElementsByTagName('td')[1];

        cell.innerHTML = zeroPad(parseInt(cell.innerHTML, 10) + 1);
      }, 1000);
    }

    var socket = io.connect(dash.server);
    var message = document.getElementById('messages');
    var timer = 0;
    var time = 0;

    socket.on(dash.api.message.recv, function(data) {
      message.value = data.msg; 
    });

    socket.on(dash.api.section.recv.reset, function(section) {
      displayCurrent(section);
      var elements = document.getElementsByClassName('etime');
      var i;

      for(i = 0; i < elements.length; i++) {
        elements[i].innerHTML = "00";
      }
    });

    // On section change update 'setlist'.
    socket.on(dash.api.section.recv.current, function(section) {
      displayCurrent(section);
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
        eTime.setAttribute("class", "etime");
        tTime.innerHTML = element.duration;

        row.appendChild(title);
        row.appendChild(eTime);
        row.appendChild(tTime);

        setList.appendChild(row);
      });
    });
  };
}());
