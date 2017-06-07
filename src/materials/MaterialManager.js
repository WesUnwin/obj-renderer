
const _materials = [];

module.exports = {

  loadMaterialFile: function(file) {

  },

  getMaterial: function(materialName) {
  	return _materials.find(mat => {
  		return mat.name == materialName;
  	})
  },

  useMaterial: function(materialName) {
  	const material = this.getMaterial(materialName);
  	material.useMaterial();
  }

};