const Matrix = require('./Matrix.js');
const ShaderProgram = require('./graphics/ShaderProgram.js');
const DefaultVertexShaderSource = require('raw-loader!../data/shaders/vertexshader.shader');
const DefaultFragmentShaderSource = require('raw-loader!../data/shaders/fragmentshader.shader');
const TexturedVertexShaderSource = require('raw-loader!../data/shaders/TexturedVertexShader.shader');
const TexturedFragmentShaderSource = require('raw-loader!../data/shaders/TexturedFragmentShader.shader');


class Scene {

  constructor(gl) {
    this.gl = gl;

    this.objects = [];

    this.projectionMatrix = new Matrix();
    this.modelViewMatrix = new Matrix();

    window.defaultShaderProgram = new ShaderProgram(this.gl, DefaultVertexShaderSource, DefaultFragmentShaderSource);
    window.texturedShaderProgram = new ShaderProgram(this.gl, TexturedVertexShaderSource, TexturedFragmentShaderSource);
  }

  addObject(object) {
    this.objects.push(object);
  }

  removeObject(object) {
    this.objects = this.objects.filter(obj => {
      return obj != object;
    });
  }

  usePerspectiveView(fieldOfViewInRadians = 1.570796, aspectRatio = 1.3333, near = 1, far = 50) {
    this.projectionMatrix.perspective(fieldOfViewInRadians, aspectRatio, near, far);
  }

  useOrthogonalView() {
    this.projectionMatrix.loadIdentity();
  }

  enableBackFaceCulling(cullBackFaces = true) {
    const gl = this.gl;
    if (cullBackFaces) {
      gl.enable(gl.CULL_FACE);   // Turn on face-culling
      gl.frontFace(gl.CCW);      // Counter clockwise (CCW) vertex winding means your facing the front of a polygon
      gl.cullFace(gl.BACK);      // Cull (don't draw) polygons when their back is facing the camera
    } else {
      gl.disable(gl.CULL_FACE);
    }
  }

  render() {
    console.log('RENDER');
    const gl = this.gl;

    // Depth Testing
    gl.enable(gl.DEPTH_TEST);  // Enable depth testing
    gl.depthFunc(gl.LESS);     // Draw pixels with a Z value less than the z value of the pixel already drawn at the same location on the frame buffer
    gl.depthMask(true);        // allow writing to Z-buffer

    // Set values to clear framebuffer bits to:
    gl.clearColor(0.0, 0.0, 0.0, 1.0);  // Clear to black, fully opaque
    gl.clearDepth(1.0);                 // Clear everything

    // Clear the framebuffer
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

    gl.bindBuffer(gl.ARRAY_BUFFER, this.squareVerticesBuffer);

    for(var i = 0; i < this.objects.length; i++) {
      this.objects[i].render(gl, this.projectionMatrix, this.modelViewMatrix);
    }
  }

  play() {
    setInterval(() => {
      this.render(this.gl); 
    }, 1500);
  }

}

module.exports = Scene;