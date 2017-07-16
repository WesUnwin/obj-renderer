'use strict';

const ModelStaticVBO = require('../src/graphics/ModelStaticVBO.js');
const Matrix = require('./Matrix.js');
const SceneObject = require('./SceneObject.js');


class StaticObject extends SceneObject {

  constructor(model) {
    super();
		this.modelStaticVBO = new ModelStaticVBO(model);
  }

  render(gl, projectionMatrix, modelViewMatrix) {
    const mvMatrix = this.transform.clone();
    mvMatrix.multiply(modelViewMatrix);
    this.modelStaticVBO.render(gl, projectionMatrix, mvMatrix);
    this.subObjects.forEach(subObject => {
      subObject.render(gl, projectionMatrix, mvMatrix);
    });
  }

}

module.exports = StaticObject;