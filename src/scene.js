var Matrix = require('./matrix.js');
var ModelStaticVBO = require('./graphics/ModelStaticVBO.js');

class Scene {

  constructor() {
    console.log('SCENE CONSTRUCTOR');
    this.objects = [];
    this.projectionMatrix = new Matrix();

    this.modelViewMatrix = new Matrix([1,0,0,0, 0,1,0,0, 0,0,1,0, 0,0,0.0,1]);

    this.objects.push(new ModelStaticVBO('a'));
  }

  addObject(object) {
    this.objects.push(object);
  }

  render(gl, shaderProgram) {
    console.log('RENDER');
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

    gl.bindBuffer(gl.ARRAY_BUFFER, this.squareVerticesBuffer);

    // Set Perspective Matrix (a uniform)
    var pUniform = gl.getUniformLocation(shaderProgram, "uPMatrix");
    if (!pUniform) throw "Could not get location of uPMatrix";
    gl.uniformMatrix4fv(pUniform, false, new Float32Array(this.projectionMatrix.values));

    // Set Model-View Matrix (a uniform)
    var mvUniform = gl.getUniformLocation(shaderProgram, "uMVMatrix");
    if (!mvUniform) throw "Could not get location of mvUniform";
    gl.uniformMatrix4fv(mvUniform, false, new Float32Array(this.modelViewMatrix.values));

    for(var i = 0; i < this.objects.length; i++) {
      this.objects[i].render(gl, shaderProgram);
    }
  }

}

module.exports = Scene;