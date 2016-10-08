class Model {

  constructor(modelName) {
    this.modelName = modelName;
    this.vertices = [];
    this.textureCoords = [];
    this.vertexNormals = [];
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
}

module.exports = Model;