'use strict';


/**
 * Represents that has non-changing
 * vertex/textureCoord/normal data that comes from a single model.
 */
class ModelStaticVBO {

  constructor(model) {
    this.model = model;
  }

  render(gl, projectionMatrix, modelViewMatrix, materials) {
    if (!this.buffered)
      this._buffer(gl, materials);

    this.materialMeshes.forEach((mesh) => {
      // Draw one material (a mesh) of the model at a time
      let currentMaterial = materials.find(mat => { return mat.getName() == mesh.materialName; });
      currentMaterial.use(gl, projectionMatrix, modelViewMatrix);

      // TELL THE SHADER PROGRAM THE VALUES FOR EACH VERTEX ATTRIBUTE
      const shaderProgram = currentMaterial.getShaderProgram();

      // Position data
      var vertexPositionAttribute = gl.getAttribLocation(shaderProgram.getWebGLProgram(), 'aVertexPosition');
      gl.enableVertexAttribArray(vertexPositionAttribute);

      gl.bindBuffer(gl.ARRAY_BUFFER, this.vertexBuffer);
      gl.vertexAttribPointer(vertexPositionAttribute, 3, gl.FLOAT, false, 0, 0);

      // Color data
      var colorAttribute = gl.getAttribLocation(shaderProgram.getWebGLProgram(), 'aVertexColor');
      if (colorAttribute != -1) {
        gl.enableVertexAttribArray(colorAttribute);
        gl.bindBuffer(gl.ARRAY_BUFFER, this.vertexColorBuffer);
        gl.vertexAttribPointer(colorAttribute, 4, gl.FLOAT, false, 0, 0);
      }

      // Texture Coord. data
      var textureCoordsAttribute = gl.getAttribLocation(shaderProgram.getWebGLProgram(), 'aVertexTextureCoords');
      if (textureCoordsAttribute != -1) {
        gl.enableVertexAttribArray(textureCoordsAttribute);
        gl.bindBuffer(gl.ARRAY_BUFFER, this.textureCoordBuffer);
        gl.vertexAttribPointer(textureCoordsAttribute, 2, gl.FLOAT, false, 0, 0);
      }



      // DRAW THE MESH
      let totalMeshVertices = mesh.endIndex - mesh.startIndex + 1;
      gl.drawArrays(gl.TRIANGLES, mesh.startIndex, totalMeshVertices);
    });
  }

  _buffer(gl, materials) {
    let vertexPositions = [];
    let vertexTextureCoords = [];
    let vertexNormals = [];
    const vertexColors = [];

    let meshes = []; // Array of objects, 1 for each material { startIndex, endIndex }

    // Group polygons by material
    let modelMaterials = this.model.getMaterialsUsed();

    let index = 0;
    modelMaterials.forEach((materialName) => {
      const mesh = { materialName: materialName, startIndex: index};

      let currentMaterial = materials.find(mat => { return mat.getName() == materialName; });
      const polygons = this.model.getPolygonsByMaterial(materialName);

      polygons.forEach((polygon) => {
        polygon.vertices.forEach((vertex) => {
          const vertexCoords = this.model.vertices[vertex.vertexIndex - 1];
          vertexPositions.push(vertexCoords.x);
          vertexPositions.push(vertexCoords.y);
          vertexPositions.push(vertexCoords.z);

          const { red, green, blue, alpha } = currentMaterial.getAmbientColor()
          vertexColors.push(red);
          vertexColors.push(green);
          vertexColors.push(blue);
          vertexColors.push(alpha);

          if (!vertex.textureCoordsIndex) {
            vertexTextureCoords.push(0);
            vertexTextureCoords.push(0);
          } else {
            let vertexTextureCoord = this.model.textureCoords[vertex.textureCoordsIndex - 1];
            vertexTextureCoords.push(vertexTextureCoord.u);
            vertexTextureCoords.push(vertexTextureCoord.v);
          }

          if (!vertex.normalIndex) {
            vertexNormals.push(0);
            vertexNormals.push(0);
          } else {
            let vertexNormal = this.model.vertexNormals[vertex.normalIndex - 1];
            vertexNormals.push(vertexNormal.x);
            vertexNormals.push(vertexNormal.y);
          }

          index += 1;
        });
      });

      mesh.endIndex = index - 1;
      meshes.push(mesh);
    });

    this.materialMeshes = meshes;

    // Load Vertex Position data into a Buffer Object
    this.vertexBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, this.vertexBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertexPositions), gl.STATIC_DRAW);


    this.vertexColorBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, this.vertexColorBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertexColors), gl.STATIC_DRAW);


    // load Texture Coords into a Buffer Object
    this.textureCoordBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, this.textureCoordBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertexTextureCoords), gl.STATIC_DRAW);

    this.buffered = true;


  }
}

module.exports = ModelStaticVBO;