class ShaderProgram {

	constructor(gl, vertexShaderSource, fragmentShaderSource) {
		const vertexShader = this._compileShader(gl, gl.VERTEX_SHADER, vertexShaderSource);
		const fragmentShader = this._compileShader(gl, gl.FRAGMENT_SHADER, fragmentShaderSource);

    this.shaderProgram = gl.createProgram();
    gl.attachShader(this.shaderProgram, vertexShader);
    gl.attachShader(this.shaderProgram, fragmentShader);
    gl.linkProgram(this.shaderProgram);
    if (!gl.getProgramParameter(this.shaderProgram, gl.LINK_STATUS)) {
      throw 'shader program did not link';
    }
	}

  use(gl) {
    gl.useProgram(this.shaderProgram);
  }

  getWebGLProgram() {
  	return this.shaderProgram;
  }

  _compileShader(gl, type, source) {
  	const shader = gl.createShader(type);
    gl.shaderSource(shader, source);
    gl.compileShader(shader);         
    if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
      throw 'Shader did not compile';
    }
    return shader;
  }

}

module.exports = ShaderProgram;