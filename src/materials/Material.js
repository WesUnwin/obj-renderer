'use strict';

const ImageManager = require('../graphics/ImageManager.js');
const Texture = require('./Texture.js');


class Material {

  constructor(materialJSON) {
    const json = materialJSON || {};

    this.name = json.name || '';

    this.illum = json.illum || 0;

    this.textureImageURL = null;
    this.texture = null;

    this.Ka = json.Ka || { red: 0, green: 0, blue: 0 };
    this.Kd = json.Kd || { red: 0, green: 0, blue: 0 };
    this.Ks = json.Ks || { red: 0, green: 0, blue: 0 };
  }

  load(gl) {
    if (this.textureImageURL) {
      this.texture = new Texture(gl, ImageManager.getImage(this.textureImageURL));
    }
    this.loaded = true;
  }

  getName() {
    return this.name;
  }

  setIllum(illumModelNumber) {
    this.illum = illumModelNumber;
  }

  getIllum() {
    return this.illum;
  }

  setAmbientColor(color) {
    this.Ka = color;
  }

  getAmbientColor() {
    return this.Ka;
  }

  setDiffuseColor(color) {
    this.Kd = color;
  }

  getDiffuseColor() {
    return this.Kd;
  }

  setAmbientTextureImageURL(textureImageURL) {
  	this.textureImageURL = textureImageURL;
  }

  getAmbientTextureImageURL() {
    return this.textureImageURL;
  }

  setDiffuseTextureImageURL(texture) {
    this.textureImageURL = textureImageURL;
  }

  use(gl, projectionMatrix, modelViewMatrix) {
    if (!this.loaded) {
      this.load(gl);
    }

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