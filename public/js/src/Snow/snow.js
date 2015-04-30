/**
 * Various functions for interacting with the extra/snow css rules.
 * Copyright (c) 2014 Neil Munro <neilmunro@gmail.com>.
 */

function Snow() {
  "use strict";

  return (this === window) ? new Snow() : this;
}

Snow.prototype.enable = function() {
  "use strict";

  var snow = document.getElementsByClassName("snow");
  var i = 0;

  for(i = 0; i < snow.length; i++) {
    snow[i].style.display = "block";
  }
};

Snow.prototype.disable = function() {
  "use strict";

  var snow = document.getElementsByClassName("snow");
  var i = 0;

  for(i = 0; i < snow.length; i++) {
    snow[i].style.display = "none";
  }
};
