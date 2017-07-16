'use strict';

const Material = require('./Material.js');
const Texture = require('./Texture.js');
const ImageManager = require('../graphics/ImageManager.js');


let _materials = [];

module.exports = {

  createMaterial: function(gl, name, red, green, blue, textureImage) {
    if (_materials.indexOf(name) != -1) {
      throw new Error('Material with name ' + name + ' already exists');
    }
    const mat = new Material(name);
    mat.setColor(red, green, blue);
    if (textureImage) {
      mat.setTexture(new Texture(gl, textureImage));
    }
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