/* Demonstration of embedding CodeMirror in a bigger application. The
 * interface defined here is a mess of prompts and confirms, and
 * should probably not be used in a real project.
 */

const MirrorFrame = function(place, options, clickHandlers) {
  this.home = document.createElement("div");
  this.home.className = 'CodeMirror-container';
  if (place.appendChild)
    place.appendChild(this.home);
  else
    place(this.home);

  var self = this;
  function makeButton(name) {
    var buttonContainer = document.createElement("div");
    buttonContainer.className = 'btn-container';
    var button = document.createElement("input");
    button.type = "button";
    button.value = name;
    buttonContainer.appendChild(button);
    self.home.appendChild(buttonContainer);
    button.onclick = function(){
      if(clickHandlers[name]){
        clickHandlers[name].call();
      } else {
        console.error('Click handler not defined');
      }
    };
  }

  for(var key in clickHandlers){
    makeButton(key);
  }

  this.mirror = CodeMirror(this.home, options);
  return this.mirror;
}