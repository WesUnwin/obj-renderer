var Shaders = require('./shaders.js');

window.Matrix = require('./matrix.js');

window.start = function() {

  alert('start!');
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

  vertexPositionAttribute = gl.getAttribLocation(shaderProgram, 'aVertexPosition');
  gl.enableVertexAttribArray(vertexPositionAttribute);



  squareVerticesBuffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, squareVerticesBuffer);

  // var vertices = [
  //   1.0,  1.0,  0.0,
  //   -1.0, 1.0,  0.0,
  //   1.0,  -1.0, 0.0,
  //   -1.0, -1.0, 0.0
  // ];

  // gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);

  // setInterval(drawScene, 15);

}