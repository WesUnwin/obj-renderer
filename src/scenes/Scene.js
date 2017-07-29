'use strict';

const Camera = require('./Camera.js');


class Scene {

  constructor(json) {
    this._camera = new Camera();
    this._objects = [];
    this.init(json);
  }

  init(json) {
    // TODO initialize camera and hierarchy of objects
    // based on a nested JSON structure
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