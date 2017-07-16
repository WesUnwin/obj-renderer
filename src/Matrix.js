'use strict';

class Matrix {

  constructor(values) {
    if (!values) {
      this.loadIdentity();
      return;
    } else if (typeof values.length == 'undefined' || values.length != 16) {
      throw 'Matrix constructor requires an array of 16 values, given: ' + values;
    }
    this.values = values;
  }

  loadIdentity() {
    this.values = [1, 0, 0, 0,
                   0, 1, 0, 0,
                   0, 0, 1, 0,
                   0, 0, 0, 1];
  }

  perspective(fieldOfViewInRadions = 1.570796, aspectRatio = 1.3333, near = 1, far = 50) {
    // Sets the values of this matrix to a projection matrix
    // that will satisfy the given parameters:
    //   fieldOfViewInRadions - the angle from left to right edge of the camera (eg. PI / 2)
    //   aspectRatio          - typically viewport width / viewport height
    //   near                 - near clipping plane
    //   far                  - far clipping plan
    const f = 1.0 / Math.tan(fieldOfViewInRadions / 2);
    const rangeInv = 1 / (near - far);
    this.values = [
      f / aspectRatio, 0, 0, 0,
      0, f, 0, 0,
      0, 0, (near + far) * rangeInv, -1,
      0, 0, near * far * rangeInv * 2, 0
    ];
  }

  clone() {
    const valuesClone = this.values.slice(0)
    return new Matrix(valuesClone);
  }

  tranform(vector) {
    var m = this.values;
    var v = vector;
    var r1 = m[0]*v[0] + m[1]*v[1] + m[2]*v[2] + m[3]*v[3];
    var r2 = m[4]*v[0] + m[5]*v[1] + m[6]*v[2] + m[7]*v[3];
    var r3 = m[8]*v[0] + m[9]*v[1] + m[10]*v[2] + m[11]*v[3];
    var r4 = m[12]*v[0] + m[13]*v[1] + m[14]*v[2] + m[15]*v[3];
    return [r1, r2, r3, r4];
  }

  multiply(matrix) {
    this._multiply(matrix.values);
  }

  _multiply(matrixValues) {
    var result = [0,0,0,0, 0,0,0,0, 0,0,0,0, 0,0,0,0];
    var a = this.values;
    var b = matrixValues;
    var s1, s2, s3, s4;
    for(var c = 0; c < 4; c++) // column in result matrix
      for(var r = 0; r < 4; r++) { // row in result matrix
        s1 = a[r*4] * b[c];
        s2 = a[r*4 + 1] * b[c + 4];
        s3 = a[r*4 + 2] * b[c + 8];
        s4 = a[r*4 + 3] * b[c + 12];
        result[c + (r*4)] = s1 + s2 + s3 + s4;
      }
    this.values = result;
  }

  scale(sx, sy, sz) {
    const scaleMatrixValues = [
      sx,  0,  0,  0,
      0,  sy,  0,  0,
      0,   0, sz,  0,
      0,   0,  0,  1
    ];
    this._multiply(scaleMatrixValues);
  }

  setTranslation(x,y,z) {
    this.values[12] = x;
    this.values[13] = y;
    this.values[14] = z;
  }

  translate(x,y,z) {
    this.values[12] += x;
    this.values[13] += y;
    this.values[14] += z;
  }

  rotate(degrees, x, y, z) {
    // imagine your at the origin and facing the direction of a vector from the origin
    // to point (x,y,z). This will rotate everything clockwise around this vector by
    // the specified number of degrees.
    var a = degrees * 3.141592 / 180.0; // convert to radians
    var s = Math.sin(a);
    var c = Math.cos(a);
    var t = 1.0 - c;

    var tx = t * x;
    var ty = t * y;
    var tz = t * z;
    
    var sz = s * z;
    var sy = s * y;
    var sx = s * x;

    let m = [0,0,0,0, 0,0,0,0, 0,0,0,0, 0,0,0,0];
    m[0] = tx * x + c;
    m[1] = tx * y + sz;
    m[2] = tx * z - sy;
    m[3] = 0;

    m[4]  = tx * y - sz;
    m[5]  = ty * y + c;
    m[6]  = ty * z + sx;
    m[7]  = 0;

    m[8]  = tx * z + sy;
    m[9]  = ty * z - sx;
    m[10] = tz * z + c;
    m[11] = 0;

    m[12] = 0;
    m[13] = 0; 
    m[14] = 0;
    m[15] = 1; 

    this.multiply(new Matrix(m));
  }

  toString() {
    var s = '';
    for(var r = 0; r<4; r++) {
      s += '[ ';
      for(var c = 0; c < 4; c++)
        s += this.values[c + (r*4)] + ' ';
      s += "]\n";
    }
    return s;
  }
};

module.exports = Matrix;
