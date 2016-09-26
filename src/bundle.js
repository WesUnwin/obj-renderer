(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
var Shaders = require('./shaders.js');

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

  Shaders.setupShaders(gl);
  alert('done');
  // vertexPositionAttribute = gl.getAttribLocation(shaderProgram, 'aVertexPosition');
  // gl.enableVertexAttribArray(vertexPositionAttribute);

  // squareVerticesBuffer = gl.createBuffer();
  // gl.bindBuffer(gl.ARRAY_BUFFER, squareVerticesBuffer);

  // var vertices = [
  //   1.0,  1.0,  0.0,
  //   -1.0, 1.0,  0.0,
  //   1.0,  -1.0, 0.0,
  //   -1.0, -1.0, 0.0
  // ];

  // gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);

  // setInterval(drawScene, 15);

}
},{"./shaders.js":2}],2:[function(require,module,exports){
module.exports = {

  setupShaders: function(gl) {
    var shaderProgram;

    var vertexShaderScriptElement = document.getElementById('shader-vs');
    var vertexShader = gl.createShader(gl.VERTEX_SHADER);
    gl.shaderSource(vertexShader, vertexShaderScriptElement.text);
    gl.compileShader(vertexShader);         
    if (!gl.getShaderParameter(vertexShader, gl.COMPILE_STATUS)) {
      alert('Vertex shader did not compile');
      return;
    }

    var fragmentShaderScriptElement = document.getElementById('shader-fs');
    var fragmentShader = gl.createShader(gl.FRAGMENT_SHADER);
    gl.shaderSource(fragmentShader, fragmentShaderScriptElement.text);
    gl.compileShader(fragmentShader);           
    if (!gl.getShaderParameter(fragmentShader, gl.COMPILE_STATUS)) {
      alert('Fragment shader did not compile');
      return;
    }

    shaderProgram = gl.createProgram();
    gl.attachShader(shaderProgram, vertexShader);
    gl.attachShader(shaderProgram, fragmentShader);
    gl.linkProgram(shaderProgram);
    if (!gl.getProgramParameter(shaderProgram, gl.LINK_STATUS)) {
      alert('shader program did not link');
      return;
    }

    gl.useProgram(shaderProgram);
    return shaderProgram;
  }


};
},{}]},{},[1]);
