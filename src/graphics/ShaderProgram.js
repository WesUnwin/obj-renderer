class ShaderProgram {

	constructor(gl, vertexShaderSource, fragmentShaderSource) {
		const vertexShader = this._compileShader(gl, gl.VERTEX_SHADER, vertexShaderSource);
		const fragmentShader = this._compileShader(gl, gl.FRAGMENT_SHADER, fragmentShaderSource);

    this.shaderProgram = gl.createProgram();
    gl.attachShader(this.shaderProgram, vertexShader);
    gl.attachShader(this.shaderProgram, fragmentShader);
    gl.linkProgram(this.shaderProgram);
    if (!gl.getProgramParameter(this.shaderProgram, gl.LINK_STATUS)) {
      console.error(gl.getProgramInfoLog(this.shaderProgram));
      throw 'shader program did not link';
    }
	}

  use(gl) {
    gl.useProgram(this.shaderProgram);
  }

  getWebGLProgram() {
  	return this.shaderProgram;
  }

  setProjectionMatrix(gl, matrix) {
    // Set Perspective Matrix (a uniform)
    const pUniform = gl.getUniformLocation(this.shaderProgram, "uPMatrix");
    if (!pUniform) throw "Could not get location of uPMatrix";
    gl.uniformMatrix4fv(pUniform, false, new Float32Array(matrix.values));
  }

  setModelViewMatrix(gl, matrix) {
    // Set Model-View Matrix (a uniform)
    const mvUniform = gl.getUniformLocation(this.shaderProgram, "uMVMatrix");
    if (!mvUniform) throw "Could not get location of mvUniform";
    gl.uniformMatrix4fv(mvUniform, false, new Float32Array(matrix.values));
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