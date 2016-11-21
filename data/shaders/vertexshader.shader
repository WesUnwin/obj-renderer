attribute vec3 aVertexPosition;
attribute vec4 aVertexColor;
attribute vec3 aVertexTextureCoords;

uniform mat4 uMVMatrix;
uniform mat4 uPMatrix;

varying vec4 vColor;
varying vec3 vTextureCoords; // unused! don't getAttribLocation() on

void main(void) {
  vColor = aVertexColor;
  vTextureCoords = aVertexTextureCoords;

  gl_Position = uPMatrix * uMVMatrix * vec4(aVertexPosition, 1.0);
}