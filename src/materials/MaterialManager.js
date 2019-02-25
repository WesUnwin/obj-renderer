'use strict';

const MTLFile = require('mtl-file-parser');
const Material = require('./Material');

class MaterialManager {
  constructor() {
    this._materials = [];
  }

  addMaterialsFromFile(mtlFileContents) {
    const materialsJSON = new MTLFile(mtlFileContents).parse();
    this._materials = materialsJSON.map(materialJSON => {
      const material = new Material(materialJSON);
      this.addMaterial(material);
    });
  }

  addMaterial(material) {
    if (this._materials.some(mat => { return mat.getName() == material.getName(); })) {
      throw `Scene materials must have unique names - a material already with name: ${material.getName()} already exists`;
    }
    this._materials.push(material);
  }

  getMaterials() {
    return this._materials;
  }
}

module.exports = MaterialManager;