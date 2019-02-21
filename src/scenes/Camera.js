'use strict';

const Matrix = require('../Matrix.js');


class Camera {

  /**
   *  {
   *    x: ...,
   *    y: ...,
   *    z: ...,
   *    rx: ...,
   *    ry: ...,
   *    rz: ...
   *  }
   */
  constructor(obj) {
    const cam = obj || {};

    this._projectionMatrix = new Matrix();
    this.usePerspectiveView();

    this._x = cam.x || 0;
    this._y = cam.y || 0;
    this._z = cam.z || 0;

    this.rx = cam.rx || 0;
    this.ry = cam.ry || 0;
    this.rz = cam.rz || 0;

    // _sceneTransform is the necessary transform done against the scene to render everything
    // from the camera's perspective at position _x, _y, _z and rotations: _yaw and _pitch
    this._sceneTransform = new Matrix(); // needs to be kept up to date with above values
    this._updateSceneTransform();
  }

  getProjectionMatrix() {
    return this._projectionMatrix;
  }

  getModelViewMatrix() {
    return this._sceneTransform;
  }

  usePerspectiveView(fieldOfViewInRadians = 1.570796, aspectRatio = 1.3333, near = 1, far = 200) {
    this._projectionMatrix.perspective(fieldOfViewInRadians, aspectRatio, near, far);
  }

  useOrthogonalView() {
    this._projectionMatrix.loadIdentity();
  }

  setPosition(x,y,z) {
    this._x = x;
    this._y = y;
    this._z = z;
    this._updateSceneTransform();
  }

  setRotation(rx, ry, rz) {
    this.rx = rx;
    this.ry = ry;
    this.rz = rz;
    this._updateSceneTransform();
  }

  setPitch(degrees) {
    this.setRotation(this.rx, degrees, this.rz);
  }

  setYaw(degrees) {
    this.setRotation(degrees, this.ry, this.rz);
  }

  _updateSceneTransform() {
    this._sceneTransform.loadIdentity();
    this._sceneTransform.rotate(-1 * this.rx, 1,0,0);
    this._sceneTransform.rotate(-1 * this.ry, 0,1,0);
    this._sceneTransform.rotate(-1 * this.rz, 0,0,1);
    this._sceneTransform.setTranslation(-1 * this._x, -1 * this._y, -1 * this._z);
  }

}

module.exports = Camera;