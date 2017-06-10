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

  useMaterial(gl) {
    if (this.texture) {
      this.texture.use(gl);
    }
  }

  getShaderProgram() {
    if (this.texture)
      return window.texturedShaderProgram;
    else
      return window.defaultShaderProgram;
  }

}

module.exports = Material;