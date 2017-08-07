'use strict';

const ModelStaticVBO = require('graphics/ModelStaticVBO.js');
const Matrix = require('../Matrix.js');
const SceneObject = require('./SceneObject.js');


class StaticObject extends SceneObject {

  constructor(modelName) {
    super();
    this.modelName = modelName;
  }

  _init(models) {
    const model = models.find(m => { return m.getName() == this.modelName; });
    if (!model) {
      throw 'StaticObject: could not find object by name: ' + this.modelName;
    }
    this.modelStaticVBO = new ModelStaticVBO(model);
    this.init = true;
  }

  render(gl, projectionMatrix, modelViewMatrix, materials, models) {
    if (!this.init) {
      this._init(models);
    }

    const mvMatrix = this.transform.clone();
    mvMatrix.multiply(modelViewMatrix);
    this.modelStaticVBO.render(gl, projectionMatrix, mvMatrix, materials);
    this.subObjects.forEach(subObject => {
      subObject.render(gl, projectionMatrix, mvMatrix, materials, models);
    });
  }

}

module.exports = StaticObject;