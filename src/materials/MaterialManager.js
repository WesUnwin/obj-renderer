const Material = require('./Material.js');


let _materials = [];

module.exports = {

  loadMaterialFile: function(file) {

  },

  getMaterial: function(materialName) {
  	if (_materials.length == 0) {
  		const defaultMaterial = new Material('');

  		_materials = [ defaultMaterial ];
  	}

  	return _materials.find(mat => {
  		return mat.name == materialName;
  	})
  }

};