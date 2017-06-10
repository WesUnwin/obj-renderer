class Material {

  constructor(name) {
    this.name = name;
    this.red = 255;
    this.green = 255;
    this.blue = 255;
    this.texture = null;
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