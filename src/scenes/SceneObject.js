'use strict';

const Matrix = require('../Matrix.js');

class SceneObject {

  constructor(obj) {
    this.name = obj.name;
    this.transform = new Matrix(); // needs to be kept up to date with x,y,x, etc.
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
    this.setRotation(
      parseFloat(obj.rx) || 0,
      parseFloat(obj.ry) || 0,
      parseFloat(obj.rz) || 0
    );

    this.subObjects = [];

    this._updateTransform();
  }

  resetTransform() {
    this.transform.loadIdentity();
  }

  setPosition(x,y,z) {
    this.x = x;
    this.y = y;
    this.z = z;
    this._updateTransform();
  }

  setScale(sx, sy, sz) {
    this.sx = sx;
    this.sy = sy;
    this.sz = sz;
    this._updateTransform();
  }

  setRotation(rx, ry, rz) {
    this.rx = rx;
    this.ry = ry;
    this.rz = rz;
    this._updateTransform();
  }

  setPitch(degrees) {
    this.setRotation(this.rx, degrees, this.rz);
  }

  setYaw(degrees) {
    this.setRotation(degrees, this.ry, this.rz);
  }

  _updateTransform() {
    this.transform.loadIdentity();
    this.transform.rotate(this.rx, 1,0,0);
    this.transform.rotate(this.ry, 0,1,0);
    this.transform.rotate(this.rz, 0,0,1);
    this.transform.scale(this.sx, this.sy, this.sz);
    this.transform.setTranslation(this.x, this.y, this.z);
  }

  rotate(degrees, x, y, z) {
    this.transform.rotate(degrees, x, y, z);
  }

  scale(sx, sy, sz) {
    this.transform.scale(sx, sy, sz);
  }

  addObject(object) {
    this.subObjects.push(object);
  }

  find(objectName) {
    const target = this.subObjects.find(obj => {
      return obj.name === objectName
    });

    if (target) {
      return target;
    } else {
      target = this.subObjects.find(obj => {
        return obj.find(objectName);
      });
      return target;
    }
  }
}

module.exports = SceneObject;