precision mediump float;

varying vec3 vTextureCoords;

uniform sampler2D uSampler;

void main(void) {
  gl_FragColor = texture2D(uSampler, vec2(vTextureCoords.s, vTextureCoords.t));
}