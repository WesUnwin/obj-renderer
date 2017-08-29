'use strict';

const Polygon = require('./polygon');

class Model {

  constructor(modelJSON) {
    // This constructor takes a single model returned
    // from obj-filep-parser.

    this.name = modelJSON.name;
    this.vertices = modelJSON.vertices;
    this.textureCoords = modelJSON.textureCoords;
    this.vertexNormals = modelJSON.vertexNormals;
    this.polygons = [];

    modelJSON.faces.forEach(face => {
      const polygon = new Polygon(face);
      this.polygons.push(polygon);
    });
  }

  getName() {
    return this.name;
  }

  addVertex(x, y, z) {
    this.vertices.push({x: x, y: y, z: z});
  }

  addTextureCoords(u, v, w) {
    this.textureCoords.push({u: u, v: v, w: w});
  }

  addVertexNormal(x, y, z) {
    this.vertexNormals.push({x: x, y: y, z: z});
  }

  addPolygon(polygon) {
    this.polygons.push(polygon);
  }

  // Returns an array listed all the names of all materials
  // used by the polygons of this model.
  getMaterialsUsed() {
    let materials = [];
    this.polygons.forEach((p) => {
      if (materials.indexOf(p.materialName) === -1)
        materials.push(p.materialName);
    });
    return materials;
  }

  getPolygonsByMaterial(materialName) {
    return this.polygons.filter((p) => {
      return p.materialName === materialName;
    });
  }

}

module.exports = Model;
