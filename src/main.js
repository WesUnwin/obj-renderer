var Shaders = require('./shaders.js');
window.Matrix = require('./matrix.js');
var Scene = require('./scene.js');

window.start = function() {
  console.log('Application started!');
  var canvas = document.getElementById('mycanvas');

  gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
  if (!gl) alert('Unable to obtain WebGL/Experiment WebGL context');

  gl.clearColor(0.0, 0.0, 0.0, 1.0);  // Clear to black, fully opaque
  gl.clearDepth(1.0);                 // Clear everything
  gl.enable(gl.DEPTH_TEST);           // Enable depth testing
  gl.depthFunc(gl.LEQUAL);            // Near things obscure far things

  gl.viewportWidth = 640;
  gl.viewportHeight = 480;
  gl.viewport(0, 0, canvas.width, canvas.height);

  var shaderProgram = Shaders.setupShaders(gl);

  var vertexPositionAttribute = gl.getAttribLocation(shaderProgram, 'aVertexPosition');
  gl.enableVertexAttribArray(vertexPositionAttribute);


  var scene = new Scene();

  setInterval(() => { 
    scene.render(gl, shaderProgram); 
  }, 1500);

}