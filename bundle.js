(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
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
},{"./matrix.js":2,"./shaders.js":3}],2:[function(require,module,exports){
var Matrix = function(values) {
  if(!values || typeof values.length == 'undefined' || values.length != 16)
    throw 'Matrix constructor requires an array of 16 values, given: ' + values;

  this.values = values;

};

Matrix.prototype.loadIdentity = function() {
  this.values = [1, 0, 0, 0,
                 0, 1, 0, 0,
                 0, 0, 1, 0,
                 0, 0, 0, 1];
};

Matrix.prototype.transform = function(vector) {
  var m = this.values;
  var v = vector;
  var r1 = m[0]*v[0] + m[1]*v[1] + m[2]*v[2] + m[3]*v[3];
  var r2 = m[4]*v[0] + m[5]*v[1] + m[6]*v[2] + m[7]*v[3];
  var r3 = m[8]*v[0] + m[9]*v[1] + m[10]*v[2] + m[11]*v[3];
  var r4 = m[12]*v[0] + m[13]*v[1] + m[14]*v[2] + m[15]*v[3];
  return [r1, r2, r3, r4];
};

Matrix.prototype.multiply = function(matrix) {
  var result = [0,0,0,0, 0,0,0,0, 0,0,0,0, 0,0,0,0];
  var a = this.values;
  var b = matrix;
  var s1, s2, s3, s4;
  for(var c = 0; c < 4; c++) // column in result matrix
    for(var r = 0; r < 4; r++) { // row in result matrix
      s1 = a[r*4] * b[c];
      s2 = a[r*4 + 1] * b[c + 4];
      s3 = a[r*4 + 2] * b[c + 8];
      s4 = a[r*4 + 3] * b[c + 12];
      result[c + (r*4)] = s1 + s2 + s3 + s4;
    }
  this.values = result;
};

Matrix.prototype.translate = function(x, y, z) {
  this.values[12] += x;
  this.values[13] += y;
  this.values[14] += z;
};

Matrix.prototype.rotate = function(degrees, x,y,z) {
  var a = degrees * 3.141592 / 180.0; // convert to radians
  var s = Math.sin(a);
  var c = Math.cos(a);
  var t = 1.0 - c;

  var tx = t * x;
  var ty = t * y;
  var tz = t * z;
	
  var sz = s * z;
  var sy = s * y;
  var sx = s * x;

  var m = [0,0,0,0, 0,0,0,0, 0,0,0,0, 0,0,0,0];
  m[0] = tx * x + c;
  m[1] = tx * y + sz;
  m[2] = tx * z - sy;
  m[3] = 0;

  m[4]  = tx * y - sz;
  m[5]  = ty * y + c;
  m[6]  = ty * z + sx;
  m[7]  = 0;

  m[8]  = tx * z + sy;
  m[9]  = ty * z - sx;
  m[10] = tz * z + c;
  m[11] = 0;

  m[12] = 0;
  m[13] = 0; 
  m[14] = 0;
  m[15] = 1; 

  this.multiply(m);
};

module.exports = Matrix;

},{}],3:[function(require,module,exports){
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

    var pUniform = gl.getUniformLocation(shaderProgram, "uPMatrix");
    gl.uniformMatrix4fv(pUniform, false, new Float32Array(perspectiveMatrix.flatten()));

    var mvUniform = gl.getUniformLocation(shaderProgram, "uMVMatrix");
    gl.uniformMatrix4fv(mvUniform, false, new Float32Array(mvMatrix.flatten()));

    return shaderProgram;
  }


};
},{}]},{},[1]);
