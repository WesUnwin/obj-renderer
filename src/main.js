var Shaders = require('./shaders.js');
window.Matrix = require('./matrix.js');
var Scene = require('./scene.js');
var sobj = require('raw-loader!../data/unitcube.obj');
var ImageManager = require('./graphics/ImageManager.js');
var ShaderProgram = require('./graphics/ShaderProgram.js');
let DefaultVertexShaderSource = require('raw-loader!../data/shaders/vertexshader.shader');
let DefaultFragmentShaderSource = require('raw-loader!../data/shaders/fragmentshader.shader');

window.start = function() {
  console.log('Application started!');

  ImageManager.loadImages(
    ['data/textures/brick.png'],
    () => { 
      console.log("IMAGES LOADED"); 
      window.init();
    },
    () => {
      console.log("IMAGE LOADING FAILED");
    }
  );
}

window.init = function() {
  var canvas = document.getElementById('mycanvas');

  var gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
  if (!gl) alert('Unable to obtain WebGL/Experiment WebGL context');

  gl.clearColor(0.0, 0.0, 0.0, 1.0);  // Clear to black, fully opaque
  gl.clearDepth(1.0);                 // Clear everything
  gl.enable(gl.DEPTH_TEST);           // Enable depth testing
  gl.depthFunc(gl.LEQUAL);            // Near things obscure far things

  gl.viewportWidth = 640;
  gl.viewportHeight = 480;
  gl.viewport(0, 0, canvas.width, canvas.height);

  //var shaderProgram = Shaders.setupShaders(gl);
  const defaultShaderProgram = new ShaderProgram(gl, DefaultVertexShaderSource, DefaultFragmentShaderSource);
  defaultShaderProgram.use(gl);

  var vertexPositionAttribute = gl.getAttribLocation(defaultShaderProgram.getWebGLProgram(), 'aVertexPosition');
  console.log(vertexPositionAttribute);
  gl.enableVertexAttribArray(vertexPositionAttribute);

  var scene = new Scene();

  setInterval(() => {
    scene.render(gl, defaultShaderProgram.getWebGLProgram()); 
  }, 1500);
}
