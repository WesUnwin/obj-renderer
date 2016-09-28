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



};

  // function setMatrixUniforms() {
  //   var pUniform = gl.getUniformLocation(shaderProgram, "uPMatrix");
  //   gl.uniformMatrix4fv(pUniform, false, new Float32Array(perspectiveMatrix.flatten()));

  //   var mvUniform = gl.getUniformLocation(shaderProgram, "uMVMatrix");
  //   gl.uniformMatrix4fv(mvUniform, false, new Float32Array(mvMatrix.flatten()));
  // }

module.exports = Matrix;
