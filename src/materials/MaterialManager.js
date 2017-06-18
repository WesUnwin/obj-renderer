const Material = require('./Material.js');
const Texture = require('./Texture.js');
const ImageManager = require('../graphics/ImageManager.js');


let _materials = [];

module.exports = {

  loadMaterialFile: function(gl) {
  	// TODO replace this temp function implementation with real, permanent logic
		const defaultMaterial = new Material('');
		_materials.push(defaultMaterial);

		// TEMP ADD TEXTURE MATERIAL
		const image = ImageManager.getImage('brick.png');
		const texturedMaterial = new Material('textured');
		const texture = new Texture(gl, image);
		texturedMaterial.setTexture(texture);
		_materials.push(texturedMaterial);
  },

  createMaterial: function(name, red, green, blue) {
    if (_materials.indexOf(name) != -1) {
      throw new Error('Material with name ' + name + ' already exists');
    }
    const mat = new Material(name);
    mat.setColor(red, green, blue);
    _materials.push(mat);
  },

  getDefaultMaterial: function() {
  	return this.getMaterial();
  },

  getMaterial: function(materialName) {
  	const matName = materialName || '';
  	return _materials.find(mat => {
  		return mat.name == matName;
  	});
  }

};