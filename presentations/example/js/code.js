/*
 * Copyright (c) 2014-2015 Neil Munro <neilmunro@gmail.com>.
 */

window.onload = function init() {
  "use strict";
  
  var snow = new Snow();
  var dash = new Dash();

  var socket = io.connect(dash.server);

  socket.on(dash.api.section.recv.current, function(data) {
    var current = document.getElementById("current");
    var animationEvents = ["animationend", "webkitAnimationEnd"];

    animationEvents.forEach(function(element, index, array) {
      current.addEventListener(element, function() {
        var content = document.getElementById("content");

        content.setAttribute("class", "inactive");

        switch (data.section.type) {
          case "text":
            dash.DOM.addText(function() {
              var current = document.createElement("h1");
              snow.enable();

              current.setAttribute("class", "active");
              current.setAttribute("id", "current");
              current.innerHTML = data.section.content;

              dash.DOM.clear(content);
              content.appendChild(current);
            });
            break;

          case "image":
            dash.DOM.addImage(function() {
              var current = document.createElement("img");
              snow.enable();

              current.setAttribute("src", data.section.content);
              current.setAttribute("id", "current");
              current.setAttribute("class", "active");

              dash.DOM.clear(content);
              content.appendChild(current);
            });
            break;

          case "video":
            dash.DOM.addVideo(function() {
              var current = document.createElement("video");
              snow.disable();

              current.setAttribute("autoplay", "autoplay");
              current.setAttribute("controls", "controls");
              current.setAttribute("id", "current");
              current.setAttribute("class", "active");

              data.section.content.forEach(function(video, index, array) {
                var src = document.createElement("source");  
                var type = video.split(".")[1];

                src.setAttribute("type", "video/" + type);
                src.setAttribute("src", video);

                current.appendChild(src);
              });

              dash.DOM.clear(content);
              content.appendChild(current);
            });
            break;

          case "animation":
            dash.DOM.addAnimation(function() {
              var current = document.createElement("div");
              snow.enable();

              current.setAttribute("id", "current");
              current.setAttribute("class", "active");

              dash.DOM.clear(content);
              animateCountdown(current); 
              content.appendChild(current);
            });
            break;
        }

        content.setAttribute("class", "active shown");
      }, false);
    });

    current.setAttribute("class", "inactive");
  });
};
