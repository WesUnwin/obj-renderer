'use strict';

const SceneObject = require('./SceneObject.js');
const Matrix = require('./Matrix.js');


class Camera extends SceneObject {

	constructor() {
		super();
		this._projectionMatrix = new Matrix();
    this._modelViewMatrix = new Matrix();
	}

	getProjectionMatrix() {
		return this._projectionMatrix;
	}

	getModelViewMatrix() {
		return this._modelViewMatrix;
	}

  usePerspectiveView(fieldOfViewInRadians = 1.570796, aspectRatio = 1.3333, near = 1, far = 50) {
    this._projectionMatrix.perspective(fieldOfViewInRadians, aspectRatio, near, far);
  }

  useOrthogonalView() {
    this._projectionMatrix.loadIdentity();
  }

}

module.exports = Camera;