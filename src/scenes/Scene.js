'use strict';

const Camera = require('./Camera.js');
const StaticObject = require('./StaticObject.js');

class Scene {

  constructor(json) {
    this.init(json || {});
  }

  /**
   * {
   *   camera: {...},
   *   objects: [...]
   * }
   */
  init(json) {
    const scene = json;

    this._camera = new Camera(scene.json);

    this._objects = [];
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

  find(objectName) {
    const target = this._objects.find(obj => {
      return obj.name === objectName
    });

    if (target) {
      return target;
    } else {
      target = this._objects.find(obj => {
        return obj.find(objectName);
      });
      return target;
    }
  }

  getCamera() {
    return this._camera;
  }
}

module.exports = Scene;