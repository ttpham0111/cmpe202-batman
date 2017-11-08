/* Demonstration of embedding CodeMirror in a bigger application. The
 * interface defined here is a mess of prompts and confirms, and
 * should probably not be used in a real project.
 */

const MirrorFrame = function(place, options) {
  this.home = document.createElement("div");
  this.home.className = 'CodeMirror-container';
  if (place.appendChild)
    place.appendChild(this.home);
  else
    place(this.home);

  var self = this;
  function makeButton(name) {
    var button = document.createElement("input");
    button.type = "button";
    button.value = name;
    self.home.appendChild(button);
    button.onclick = function(){
      if(name === 'Run'){
        console.log("Running code...");
      }
    };
  }

  makeButton("Run");

  this.mirror = CodeMirror(this.home, options);
  return this.mirror;
}