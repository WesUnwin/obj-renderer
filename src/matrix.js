var Matrix = class {

  constructor(values) {
    this.values = values;
  },

  loadIdentity() {
    this.values = [1, 0, 0, 0, 
                   0, 1, 0, 0,
                   0, 0, 1, 0,
                   0, 0, 0, 1];
  }
  // function loadIdentity() {
  //   mvMatrix = Matrix.I(4);
  // }

  // function multMatrix(m) {
  //   mvMatrix = mvMatrix.x(m);
  // }

  // function mvTranslate(v) {
  //   multMatrix(Matrix.Translation($V([v[0], v[1], v[2]])).ensure4x4());
  // }

  // function setMatrixUniforms() {
  //   var pUniform = gl.getUniformLocation(shaderProgram, "uPMatrix");
  //   gl.uniformMatrix4fv(pUniform, false, new Float32Array(perspectiveMatrix.flatten()));

  //   var mvUniform = gl.getUniformLocation(shaderProgram, "uMVMatrix");
  //   gl.uniformMatrix4fv(mvUniform, false, new Float32Array(mvMatrix.flatten()));
  // }




};

module.exports = Matrix;
