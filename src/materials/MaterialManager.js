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

  getMaterial: function(materialName) {
  	return _materials.find(mat => {
  		return mat.name == materialName;
  	});
  }

};