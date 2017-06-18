const ModelStaticVBO = require('../src/graphics/ModelStaticVBO.js');
const Matrix = require('./Matrix.js');


class StaticObject {

  constructor(model) {
		this.modelStaticVBO = new ModelStaticVBO(model);
	  this.transform = new Matrix();
    this.subObjects = [];
  }

  setPosition(x,y,z) {
  	this.transform.setTranslation(x,y,z);
  }

  rotate(degrees, x, y, z) {
    this.transform.rotate(degrees, x, y, z);
  }

  addObject(object) {
    this.subObjects.push(object);
  }

  render(gl, projectionMatrix, modelViewMatrix) {
  	const mvMatrix = modelViewMatrix.clone();
  	mvMatrix.multiply(this.transform);
  	this.modelStaticVBO.render(gl, projectionMatrix, mvMatrix);
    this.subObjects.forEach(subObject => {
      subObject.render(gl, projectionMatrix, mvMatrix);
    });
  }

}

module.exports = StaticObject;