const ModelStaticVBO = require('../src/graphics/ModelStaticVBO.js');
const Matrix = require('./Matrix.js');


class StaticObject {

  constructor(model) {
		this.modelStaticVBO = new ModelStaticVBO(model);

    this.x = 0;
    this.y = 0;
    this.z = 0;
    this.sx = 1;
    this.sy = 1;
    this.sz = 1;
    this.pitch = 0; // in degrees
    this.yaw = 0;

	  this.transform = new Matrix(); // needs to be kept up to date with above values
    this.subObjects = [];
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

  setPitch(degrees) {
    this.pitch = degrees;
    this._updateTransform();
  }

  setYaw(degrees) {
    this.yaw = degrees;
    this._updateTransform();
  }

  _updateTransform() {
    this.transform.loadIdentity();
    this.transform.rotate(this.yaw, 1,0,0);
    this.transform.rotate(this.pitch, 0,1,0);
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