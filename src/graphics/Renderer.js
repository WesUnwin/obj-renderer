'use strict';

class Renderer {

	constructor(gl) {
		this._gl = gl;
	}

  setViewPort(x, y, width, height) {
    this._gl.viewport(x, y, width, height);
  }

}

module.exports = Renderer;