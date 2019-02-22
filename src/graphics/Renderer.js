'use strict';

const OBJFile = require('obj-file-parser');
const MTLFile = require('../materials/MTLFile.js');
const ShaderProgram = require('./ShaderProgram.js');
const DefaultVertexShaderSource = require('../shaders/vshader.js');
const DefaultFragmentShaderSource = require('../shaders/fshader.js');
const TexturedVertexShaderSource = require('../shaders/TexVShader.js');
const TexturedFragmentShaderSource = require('../shaders/TexFShader.js');
const Model = require('../modeling/Model.js');

class Renderer {

	constructor(canvasElement, viewportX, viewportY, viewportWidth, viewportHeight) {
    const gl = canvasElement.getContext('webgl') || canvasElement.getContext('experimental-webgl');
    if (!gl) alert('Unable to obtain WebGL/Experiment WebGL context');

		this._gl = gl;

    this._models = [];
    this._materials = [];

		this.setViewPort(viewportX || 0, viewportY || 0, viewportWidth || canvasElement.width, viewportHeight || canvasElement.height);
    window.defaultShaderProgram = new ShaderProgram(this._gl, DefaultVertexShaderSource, DefaultFragmentShaderSource);
    window.texturedShaderProgram = new ShaderProgram(this._gl, TexturedVertexShaderSource, TexturedFragmentShaderSource);

    this._setRenderingDefaults();
	}

  setViewPort(x, y, width, height) {
    this._gl.viewport(x, y, width, height);
  }

  loadOBJFile(objFileContents, defaultModelName) {
    const objFile = new OBJFile(objFileContents, defaultModelName);
    const { models, materialLibs } = objFile.parse();
    models.forEach(modelJSON => {
      const model = new Model(modelJSON);
      this.addModel(model);
    });
  }

  addModel(model) {
    if (this._models.some(m => { return m.getName() == model.getName(); })) {
      throw `Scene models must have unique names - a model already with name: ${model.getName()} already exists`;
    }
    this._models.push(model);
  }

  getModelNames() {
    return this._models.map(m => m.getName());
  }

  findModelByName(name) {
    return this._models.find(m => {
      return m.getName() == name;
    });
  }

  loadMTLFile(mtlFileContents) {
    const mtlFile = new MTLFile(mtlFileContents);
  }

  addMaterial(material) {
    if (this._materials.some(mat => { return mat.getName() == material.getName(); })) {
      throw `Scene materials must have unique names - a material already with name: ${material.getName()} already exists`;
    }
    this._materials.push(material);
  }

  _setRenderingDefaults() {
    this._gl.clearDepth(1.0);  // Sets the value to clear the depth buffer to when using gl.clear() 
                               // (does not actual clear the buffer)

    this.setClearColor(0, 0, 0);
    this.enableBackFaceCulling(false);
    this.enableDepthTest(true);
  }

  setClearColor(red, green, blue) {
    // Set values to clear framebuffer bits to:
    this._gl.clearColor(red, green, blue, 1.0);  // Clear to black, fully opaque
  }

  enableBackFaceCulling(cullBackFaces = true) {
    const gl = this._gl;
    if (cullBackFaces) {
      gl.enable(gl.CULL_FACE);   // Turn on face-culling
      gl.frontFace(gl.CCW);      // Counter clockwise (CCW) vertex winding means your facing the front of a polygon
      gl.cullFace(gl.BACK);      // Cull (don't draw) polygons when their back is facing the camera
    } else {
      gl.disable(gl.CULL_FACE);
    }
  }

  enableDepthTest(useDepthTesting = true) {
    const gl = this._gl;
    if (useDepthTesting) { 
      gl.enable(gl.DEPTH_TEST);  // Enable depth testing
      gl.depthFunc(gl.LESS);     // Draw pixels with a Z value less than the z value of the pixel already drawn at the same location on the frame buffer
      gl.depthMask(true);        // allow writing to Z-buffer
    } else {
      gl.disable(gl.DEPTH_TEST);
    }
  }

  renderScene(scene) {
    // Clear the framebuffer bits:  (to the currently set clearColor and clearDepth values)
    this._gl.clear(this._gl.COLOR_BUFFER_BIT | this._gl.DEPTH_BUFFER_BIT);

    const camera = scene.getCamera();
    const projMatrix = camera.getProjectionMatrix();
    const modelViewMatrix = camera.getModelViewMatrix();

    const objects = scene.getObjects();
    objects.forEach(obj => {
      obj.render(this._gl, projMatrix, modelViewMatrix, this._materials, this._models);
    });
  }
}

module.exports = Renderer;
