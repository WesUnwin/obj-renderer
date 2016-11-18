class Model {

  constructor(modelName) {
    this.name = modelName;
    this.vertices = [];
    this.textureCoords = [];
    this.vertexNormals = [];
    this.polygons = [];
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
      if (materials.indexOf(p.material) === -1)
        materials.push(p.material);
    });
    return materials;
  }

  getPolygonsByMaterial(material) {
    return this.polygons.filter((p) => {
      return p.material === material;
    });
  }

}

module.exports = Model;