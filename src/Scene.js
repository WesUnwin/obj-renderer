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

    window.defaultShaderProgram = new ShaderProgram(this.gl, DefaultVertexShaderSource, DefaultFragmentShaderSource);
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




    this.gl.clear(this.gl.COLOR_BUFFER_BIT | this.gl.DEPTH_BUFFER_BIT);

    this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.squareVerticesBuffer);

    for(var i = 0; i < this.objects.length; i++) {
      this.objects[i].render(this.gl, this.projectionMatrix, this.modelViewMatrix);
    }
  }

  play() {
    setInterval(() => {
      this.render(this.gl); 
    }, 1500);
  }

}

module.exports = Scene;