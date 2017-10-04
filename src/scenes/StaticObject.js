'use strict';

const ModelStaticVBO = require('graphics/ModelStaticVBO.js');
const Matrix = require('../Matrix.js');
const SceneObject = require('./SceneObject.js');

class StaticObject extends SceneObject {

  constructor(obj) {
    super();
    this.name = obj.name;
    this.modelName = obj.modelName;
    this.setPosition(
      parseFloat(obj.x) || 0,
      parseFloat(obj.y) || 0,
      parseFloat(obj.z) || 0
    );
    this.setScale(
      parseFloat(obj.sx) || 1,
      parseFloat(obj.sy) || 1,
      parseFloat(obj.sz) || 1
    );
    this.setPitch(parseFloat(obj.pitch) || 0);
    this.setYaw(parseFloat(obj.yaw) || 0);

    if (Array.isArray(obj.objects)) {
      obj.objects.forEach(obj => {
        const staticObject = new StaticObject(obj);
        this.addObject(staticObject);
      });
    }
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