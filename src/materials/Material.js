'use strict';

class Material {

  constructor(name) {
    this.name = name || '';
    this.setColor(1,0,0);
    this.texture = null;
    this.illum = 0;

    this.Ka = { red: 0, green: 0, blue: 0 };
    this.Kd = { red: 0, green: 0, blue: 0 };
    this.Ks = { red: 0, green: 0, blue: 0 };
  }

  getName() {
    return this.name;
  }

  setColor(red, green, blue, alpha = 1.0) {
    this.red = red;
    this.green = green;
    this.blue = blue;
    this.alpha = alpha; 
  }

  setTexture(texture) {
  	this.texture = texture;
  }

  use(gl, projectionMatrix, modelViewMatrix) {
    if (this.texture) {
      this.texture.use(gl);
    }

    const shaderProgram = this.getShaderProgram();
    shaderProgram.use(gl);
    shaderProgram.setProjectionMatrix(gl, projectionMatrix);
    shaderProgram.setModelViewMatrix(gl, modelViewMatrix);

    shaderProgram.setUniformValue(gl, "uSampler", 0);
  }

  getShaderProgram() {
    if (this.texture)
      return window.texturedShaderProgram;
    else
      return window.defaultShaderProgram;
  }

}

module.exports = Material;