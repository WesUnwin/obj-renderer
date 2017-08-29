'use strict';

class Polygon {

  constructor(faceJSON) {
    this.materialName = faceJSON.material;
    this.vertices = [];
    faceJSON.vertices.forEach(vertex => {
      this.vertices.push({
        vertexIndex:        vertex.vertexIndex,
        textureCoordsIndex: vertex.textureCoordsIndex,
        normalIndex:        vertex.vertexNormalIndex
      });
    });
  }

  addVertex(vertexIndex, textureCoordsIndex, normalIndex) {
    this.vertices.push({
      vertexIndex:        vertexIndex,
      textureCoordsIndex: textureCoordsIndex,
      normalIndex:        normalIndex
    });
  }

}

module.exports = Polygon;