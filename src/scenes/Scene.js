'use strict';

const Camera = require('./Camera.js');
const StaticObject = require('./StaticObject.js');

class Scene {

  constructor(json) {
    this._camera = new Camera();
    this._objects = [];
    this.init(json || '{}');
  }

  init(json) {
    const scene = JSON.parse(json);

    if (Array.isArray(scene.objects)) {
      scene.objects.forEach(obj => {
        const staticObject = new StaticObject(obj);
        this.addObject(staticObject);
      });
    }
  }

  addObject(object) {
    this._objects.push(object);
  }

  removeObject(object) {
    this._objects = this._objects.filter(obj => {
      return obj != object;
    });
  }

  getObjects() {
    return this._objects;
  }

  getCamera() {
    return this._camera;
  }
}

module.exports = Scene;