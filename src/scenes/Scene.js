'use strict';

const Camera = require('./Camera.js');


class Scene {

  constructor(json) {
    this.camera = new Camera();
    this.objects = [];
    this.init(json);
  }

  init(json) {
    // TODO initialize camera and hierarchy of objects
    // based on a nested JSON structure
  }

  addObject(object) {
    this.objects.push(object);
  }

  removeObject(object) {
    this.objects = this.objects.filter(obj => {
      return obj != object;
    });
  }

}

module.exports = Scene;