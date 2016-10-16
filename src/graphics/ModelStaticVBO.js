
/**
 * Represents that has non-changing
 * vertex/textureCoord/normal data that comes from a single model.
 */
class ModelStaticVBO {

  constructor(model) {
    var m = {
      vertices: [
       { x: 0.0, y: 0.5, z: 0.0 },
       { x: -0.5, y: -0.5, z: 0.0 },
       { x: 0.5, y: -0.5, z: 0.0 }
      ]
    };
    this.model = m;
  }

  render(gl, shaderProgram) {
    if (!this.buffered)
      this._buffer(gl);

    // Make the vertex buffer the source of the Vertex Position Attribute
    var vertexPositionAttribute = gl.getAttribLocation(shaderProgram, 'aVertexPosition');
    gl.enableVertexAttribArray(vertexPositionAttribute);

    gl.bindBuffer(gl.ARRAY_BUFFER, this.vertexBuffer);
    gl.vertexAttribPointer(vertexPositionAttribute, 3, gl.FLOAT, false, 0, 0);

    var colorAttribute = gl.getAttribLocation(shaderProgram, 'aVertexColor');
    gl.enableVertexAttribArray(colorAttribute);

    gl.bindBuffer(gl.ARRAY_BUFFER, this.vertexColorBuffer);
    gl.vertexAttribPointer(colorAttribute, 4, gl.FLOAT, false, 0, 0);

    // Draw the first 3 vertices from the parrallel arrays of attribute data, starting at vertex 0
    gl.drawArrays(gl.TRIANGLES, 0, 3);
  }

  _buffer(gl) {
    let vertexPositions = [];
    let vertexTextureCoords = [];
    let vertexNormals = [];

    let meshes = []; // Array of objects, 1 for each material { startIndex, endIndex }

    // Group polygons by material
    let modelMaterials = this.model.getMaterialsUsed();

    let index = 0;
    modelMaterials.forEach((material) => {
      let mesh = { material: material, startIndex: };

      let polygons = this.model.getPolygonsByMaterial(material);

      polygons.forEach((polygon) => {
        polygon.vertices.forEach((vertex) => {
          let vertexCoords = this.model.vertices[v.vertexIndex - 1];
          vertexPositions.push(v.x);
          vertexPositions.push(v.y);
          vertexPositions.push(v.z);

          if (! vertex.textureCoordsIndex) {
            vertexTextureCoords.push(0);
            vertexTextureCoords.push(0);
          } else {
            let vertexTextureCoord = this.model.textureCoords[vertex.textureCoordsIndex - 1];
            vertexTextureCoords.push(vertexTextureCoord.u);
            vertexTextureCoords.push(vertexTextureCoord.v);
          }

          if (! vertex.normalIndex) {
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


    // Load Vertex Position data into a Buffer Object
    this.vertexBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, this.vertexBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertexPositions), gl.STATIC_DRAW);


    var vertexColor = [
      1.0, 0.0, 0.0, 1.0,
      0.0, 1.0, 0.0, 1.0,
      0.0, 0.0, 1.0, 1.0,   
    ];

    this.vertexColorBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, this.vertexColorBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertexColor), gl.STATIC_DRAW);

    this.buffered = true;
  }
}

module.exports = ModelStaticVBO;