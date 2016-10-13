
/**
 * Represents that has non-changing
 * vertex/textureCoord/normal data that comes from a single model.
 */
class ModelStaticVBO {

  constructor(model) {
    this.model = model;
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
    // Load Vertex Coords into a Buffer Object
    this.vertexBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, this.vertexBuffer);

    var vertices = [
       0.0,  0.5,  0.0,
      -0.5, -0.5,  0.0,
       0.5, -0.5,  0.0
    ];

    // Set Data for current buffer bound to target: ARRAY_BUFFER
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);


    this.vertexColorBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, this.vertexColorBuffer);

    var vertexColor = [
      1.0, 0.0, 0.0, 1.0,
      0.0, 1.0, 0.0, 1.0,
      0.0, 0.0, 1.0, 1.0,   
    ];

    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertexColor), gl.STATIC_DRAW);

    this.buffered = true;
  }
}

module.exports = ModelStaticVBO;