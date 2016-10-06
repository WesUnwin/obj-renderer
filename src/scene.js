var Matrix = require('./matrix.js');

class Scene {

  constructor() {
    console.log('SCENE CONSTRUCTOR');
    this.objects = [];
    this.projectionMatrix = new Matrix();

    this.modelViewMatrix = new Matrix([1,0,0,0, 0,1,0,0, 0,0,1,0, 0,0,0.0,1]);
        //mvTranslate([-0.0, 0.0, -6.0]);

    this.squareVerticesBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, this.squareVerticesBuffer);

    var vertices = [
         0.0,  0.5,  0.0,
        -0.5, -0.5,  0.0,
         0.5, -0.5,  0.0
    ];

    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);

  }

  addObject(object) {
    this.objects.push(object);
  }

  render(gl, shaderProgram) {
    console.log('RENDER');
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

    gl.bindBuffer(gl.ARRAY_BUFFER, this.squareVerticesBuffer);

    var vertexPositionAttribute = gl.getAttribLocation(shaderProgram, 'aVertexPosition');
    gl.vertexAttribPointer(vertexPositionAttribute, 3, gl.FLOAT, false, 0, 0);

    // Set Perspective Matrix (a uniform)
    //var perspectiveMatrix = makePerspective(45, 640.0/480.0, 0.1, 100.0);

    var pUniform = gl.getUniformLocation(shaderProgram, "uPMatrix");
    if (!pUniform) throw "Could not get location of uPMatrix";
    gl.uniformMatrix4fv(pUniform, false, new Float32Array(this.projectionMatrix.values));

    // Set Model-View Matrix (a uniform)
    var mvUniform = gl.getUniformLocation(shaderProgram, "uMVMatrix");
    if (!mvUniform) throw "Could not get location of mvUniform";
    gl.uniformMatrix4fv(mvUniform, false, new Float32Array(this.modelViewMatrix.values));


    gl.drawArrays(gl.TRIANGLES, 0, 3);

    for(var i = 0; i < this.objects.length; i++) {
      this.objects[i].render();
    }
  }

}

module.exports = Scene;