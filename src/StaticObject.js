const ModelStaticVBO = require('../src/graphics/ModelStaticVBO.js');
const Matrix = require('./Matrix.js');


class StaticObject {

  constructor(model) {
		this.modelStaticVBO = new ModelStaticVBO(model);
	  this._matrix = new Matrix();
  }

  render(gl, projectionMatrix, modelViewMatrix) {
  	this.modelStaticVBO.render(gl, projectionMatrix, modelViewMatrix);
  }

}

module.exports = StaticObject;