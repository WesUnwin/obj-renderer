const ModelStaticVBO = require('../src/graphics/ModelStaticVBO.js');
const Matrix = require('./Matrix.js');


class StaticObject {

  constructor(model) {
		this.modelStaticVBO = new ModelStaticVBO(model);
	  this.transform = new Matrix();
  }

  setPosition(x,y,z) {
  	this.transform.setTranslation(x,y,z);
  }

  render(gl, projectionMatrix, modelViewMatrix) {
  	console.log(modelViewMatrix.toString());
  	const mvMatrix = modelViewMatrix.clone();

  	mvMatrix.multiply(this.transform);
  	  	console.log(mvMatrix.toString());
  	this.modelStaticVBO.render(gl, projectionMatrix, mvMatrix);
  }

}

module.exports = StaticObject;