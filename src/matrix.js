var Matrix = function(values) {

  this.values = values;

};

Matrix.prototype.loadIdentity = function() {
  this.values = [1, 0, 0, 0,
                 0, 1, 0, 0,
                 0, 0, 1, 0,
                 0, 0, 0, 1];
};

Matrix.prototype.transformVector = function(vector) {



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

  // function setMatrixUniforms() {
  //   var pUniform = gl.getUniformLocation(shaderProgram, "uPMatrix");
  //   gl.uniformMatrix4fv(pUniform, false, new Float32Array(perspectiveMatrix.flatten()));

  //   var mvUniform = gl.getUniformLocation(shaderProgram, "uMVMatrix");
  //   gl.uniformMatrix4fv(mvUniform, false, new Float32Array(mvMatrix.flatten()));
  // }

module.exports = Matrix;
