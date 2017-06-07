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

  }

}

module.exports = Material;