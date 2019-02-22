module.exports = `attribute vec3 aVertexPosition;
attribute vec4 aVertexColor;
attribute vec3 aVertexTextureCoords;

uniform mat4 uMVMatrix;
uniform mat4 uPMatrix;

varying vec4 vColor;

void main(void) {
  vColor = aVertexColor;

  gl_Position = uPMatrix * uMVMatrix * vec4(aVertexPosition, 1.0);
}`;