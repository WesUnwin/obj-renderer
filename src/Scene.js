const Matrix = require('./Matrix.js');
const ShaderProgram = require('./graphics/ShaderProgram.js');
const DefaultVertexShaderSource = require('raw-loader!../data/shaders/vertexshader.shader');
const DefaultFragmentShaderSource = require('raw-loader!../data/shaders/fragmentshader.shader');


class Scene {

  constructor(gl) {
    this.gl = gl;

    this.objects = [];

    this.projectionMatrix = new Matrix();
    this.modelViewMatrix = new Matrix();

    this.defaultShaderProgram = new ShaderProgram(this.gl, DefaultVertexShaderSource, DefaultFragmentShaderSource);
  }

  addObject(object) {
    this.objects.push(object);
  }

  render() {
    console.log('RENDER');

    this.gl.clearColor(0.0, 0.0, 0.0, 1.0);  // Clear to black, fully opaque
    this.gl.clearDepth(1.0);                 // Clear everything
    this.gl.enable(this.gl.DEPTH_TEST);           // Enable depth testing
    this.gl.depthFunc(this.gl.LEQUAL);            // Near things obscure far things

    this.defaultShaderProgram.use(this.gl);
    const shaderProgram = this.defaultShaderProgram.getWebGLProgram()

    var vertexPositionAttribute = this.gl.getAttribLocation(this.defaultShaderProgram.getWebGLProgram(), 'aVertexPosition');
    this.gl.enableVertexAttribArray(vertexPositionAttribute);


    this.gl.clear(this.gl.COLOR_BUFFER_BIT | this.gl.DEPTH_BUFFER_BIT);

    this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.squareVerticesBuffer);

    // Set Perspective Matrix (a uniform)
    var pUniform = this.gl.getUniformLocation(shaderProgram, "uPMatrix");
    if (!pUniform) throw "Could not get location of uPMatrix";
    this.gl.uniformMatrix4fv(pUniform, false, new Float32Array(this.projectionMatrix.values));

    // Set Model-View Matrix (a uniform)
    var mvUniform = this.gl.getUniformLocation(shaderProgram, "uMVMatrix");
    if (!mvUniform) throw "Could not get location of mvUniform";
    this.gl.uniformMatrix4fv(mvUniform, false, new Float32Array(this.modelViewMatrix.values));

    for(var i = 0; i < this.objects.length; i++) {
      this.objects[i].render(this.gl, shaderProgram);
    }
  }

  play() {
    setInterval(() => {
      this.render(this.gl); 
    }, 1500);
  }

}

module.exports = Scene;