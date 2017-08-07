'use strict';

const ImageManager = require('graphics/ImageManager.js');
const Texture = require('materials/Texture.js');


class Material {

  constructor(name, red = 1, green = 1, blue = 1, textureImageURL) {
    this.name = name || '';
    this.setColor(red, green, blue);
    this.texture = null;
    this.illum = 0;

    this.textureImageURL = textureImageURL;

    this.Ka = { red: 0, green: 0, blue: 0 };
    this.Kd = { red: 0, green: 0, blue: 0 };
    this.Ks = { red: 0, green: 0, blue: 0 };
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

  setColor(red, green, blue, alpha = 1.0) {
    this.red = red;
    this.green = green;
    this.blue = blue;
    this.alpha = alpha; 
  }

  setAmbientTextureImageURL(texture) {
  	this.texture = texture;
  }

  setDiffuseTextureImageURL(texture) {
    this.texture = texture;
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