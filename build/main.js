/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/assets/";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 27);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


const Matrix = __webpack_require__(1);
const ShaderProgram = __webpack_require__(13);
const DefaultVertexShaderSource = __webpack_require__(11);
const DefaultFragmentShaderSource = __webpack_require__(10);
const TexturedVertexShaderSource = __webpack_require__(9);
const TexturedFragmentShaderSource = __webpack_require__(8);
const Camera = __webpack_require__(12);


class Scene {

  constructor(canvasElement, viewportX, viewportY, viewportWidth, viewportHeight) {
    this.canvas = canvasElement;

    this.gl = this.canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
    if (!this.gl) alert('Unable to obtain WebGL/Experiment WebGL context');

    this.setViewPort(viewportX, viewportY, viewportWidth, viewportHeight);

    this.camera = new Camera();
    this.objects = [];
    window.defaultShaderProgram = new ShaderProgram(this.gl, DefaultVertexShaderSource, DefaultFragmentShaderSource);
    window.texturedShaderProgram = new ShaderProgram(this.gl, TexturedVertexShaderSource, TexturedFragmentShaderSource);

    this._setRenderingDefaults();
  }

  setViewPort(x = 0, y = 0, width = this.canvas.width, height = this.canvas.height) {
    this.gl.viewport(x, y, width, height);
  }

  addObject(object) {
    this.objects.push(object);
  }

  removeObject(object) {
    this.objects = this.objects.filter(obj => {
      return obj != object;
    });
  }

  setBackDropColor(red, green, blue) {
    const gl = this.gl;
    // Set values to clear framebuffer bits to:
    gl.clearColor(red, green, blue, 1.0);  // Clear to black, fully opaque
  }

  enableBackFaceCulling(cullBackFaces = true) {
    const gl = this.gl;
    if (cullBackFaces) {
      gl.enable(gl.CULL_FACE);   // Turn on face-culling
      gl.frontFace(gl.CCW);      // Counter clockwise (CCW) vertex winding means your facing the front of a polygon
      gl.cullFace(gl.BACK);      // Cull (don't draw) polygons when their back is facing the camera
    } else {
      gl.disable(gl.CULL_FACE);
    }
  }

  enableDepthTest(useDepthTesting = true) {
    const gl = this.gl;
    if (useDepthTesting) {
      gl.enable(gl.DEPTH_TEST);  // Enable depth testing
      gl.depthFunc(gl.LESS);     // Draw pixels with a Z value less than the z value of the pixel already drawn at the same location on the frame buffer
      gl.depthMask(true);        // allow writing to Z-buffer
    } else {
      gl.disable(gl.DEPTH_TEST);
    }
  }

  render() {
    const gl = this.gl;

    // Clear the framebuffer bits:  (to the currently set clearColor and clearDepth values)
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

    const projMatrix = this.camera.getProjectionMatrix();
    const modelViewMatrix = this.camera.getModelViewMatrix();

    for(var i = 0; i < this.objects.length; i++) {
      this.objects[i].render(gl, projMatrix, modelViewMatrix);
    }
  }

  play() {
    setInterval(() => {
      this.render(this.gl); 
    }, 1500);
  }

  _setRenderingDefaults() {
    this.gl.clearDepth(1.0);  // Sets the value to clear the depth buffer to when using gl.clear() 
                              // (does not actual clear the buffer)

    this.setBackDropColor(0, 0, 0);
    this.enableBackFaceCulling(false);
    this.enableDepthTest(true);
  }

}

module.exports = Scene;

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


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


/***/ }),
/* 2 */,
/* 3 */,
/* 4 */,
/* 5 */,
/* 6 */,
/* 7 */,
/* 8 */
/***/ (function(module, exports) {

module.exports = "precision mediump float;\n\nvarying vec3 vTextureCoords;\n\nuniform sampler2D uSampler;\n\nvoid main(void) {\n  gl_FragColor = texture2D(uSampler, vec2(vTextureCoords.s, vTextureCoords.t));\n}"

/***/ }),
/* 9 */
/***/ (function(module, exports) {

module.exports = "attribute vec3 aVertexPosition;\nattribute vec4 aVertexColor;\nattribute vec3 aVertexTextureCoords;\n\nuniform mat4 uMVMatrix;\nuniform mat4 uPMatrix;\n\nvarying vec4 vColor;\nvarying vec3 vTextureCoords;\n\nvoid main(void) {\n  vColor = aVertexColor;\n  vTextureCoords = aVertexTextureCoords;\n\n  gl_Position = uPMatrix * uMVMatrix * vec4(aVertexPosition, 1.0);\n}"

/***/ }),
/* 10 */
/***/ (function(module, exports) {

module.exports = "precision mediump float;\n\nvarying vec4 vColor;\n\nvoid main(void) {\n  gl_FragColor = vColor;\n}"

/***/ }),
/* 11 */
/***/ (function(module, exports) {

module.exports = "attribute vec3 aVertexPosition;\nattribute vec4 aVertexColor;\nattribute vec3 aVertexTextureCoords;\n\nuniform mat4 uMVMatrix;\nuniform mat4 uPMatrix;\n\nvarying vec4 vColor;\n\nvoid main(void) {\n  vColor = aVertexColor;\n\n  gl_Position = uPMatrix * uMVMatrix * vec4(aVertexPosition, 1.0);\n}"

/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


const Matrix = __webpack_require__(1);


class Camera {

  constructor() {
    this._projectionMatrix = new Matrix();

    this._x = 0;
    this._y = 0;
    this._z = 0;

    this._pitch = 0; // in degrees
    this._yaw = 0; // in degrees

    // _sceneTransform is the necessary transform done against the scene to render everything
    // from the camera's perspective at position _x, _y, _z and rotations: _yaw and _pitch
    this._sceneTransform = new Matrix(); // needs to be kept up to date with above values
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

  setPitch(degrees) {
    this._pitch = degrees;
    this._updateSceneTransform();
  }

  setYaw(degrees) {
    this._yaw = degrees;
    this._updateSceneTransform();
  }

  _updateSceneTransform() {
    this._sceneTransform.loadIdentity();
    this._sceneTransform.rotate(-1 * this._yaw, 1,0,0);
    this._sceneTransform.rotate(-1 * this._pitch, 0,1,0);
    this._sceneTransform.setTranslation(-1 * this._x, -1 * this._y, -1 * this._z);
  }

}

module.exports = Camera;

/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


class ShaderProgram {

	constructor(gl, vertexShaderSource, fragmentShaderSource) {
		const vertexShader = this._compileShader(gl, gl.VERTEX_SHADER, vertexShaderSource);
		const fragmentShader = this._compileShader(gl, gl.FRAGMENT_SHADER, fragmentShaderSource);

    this.shaderProgram = gl.createProgram();
    gl.attachShader(this.shaderProgram, vertexShader);
    gl.attachShader(this.shaderProgram, fragmentShader);
    gl.linkProgram(this.shaderProgram);
    if (!gl.getProgramParameter(this.shaderProgram, gl.LINK_STATUS)) {
      console.error(gl.getProgramInfoLog(this.shaderProgram));
      throw 'shader program did not link';
    }
	}

  use(gl) {
    gl.useProgram(this.shaderProgram);
  }

  getWebGLProgram() {
  	return this.shaderProgram;
  }

  setProjectionMatrix(gl, matrix) {
    // Set Perspective Matrix (a uniform)
    const pUniform = gl.getUniformLocation(this.shaderProgram, "uPMatrix");
    if (!pUniform) throw "Could not get location of uPMatrix";
    gl.uniformMatrix4fv(pUniform, false, new Float32Array(matrix.values));
  }

  setModelViewMatrix(gl, matrix) {
    // Set Model-View Matrix (a uniform)
    const mvUniform = gl.getUniformLocation(this.shaderProgram, "uMVMatrix");
    if (!mvUniform) throw "Could not get location of mvUniform";
    gl.uniformMatrix4fv(mvUniform, false, new Float32Array(matrix.values));
  }

  setUniformValue(gl, uniformName, value) {
    const uniformLocation = gl.getUniformLocation(this.shaderProgram, uniformName);
    gl.uniform1i(uniformLocation, value);
  }

  _compileShader(gl, type, source) {
  	const shader = gl.createShader(type);
    gl.shaderSource(shader, source);
    gl.compileShader(shader);         
    if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
      throw 'Shader did not compile';
    }
    return shader;
  }

}

module.exports = ShaderProgram;

/***/ }),
/* 14 */,
/* 15 */,
/* 16 */,
/* 17 */,
/* 18 */,
/* 19 */,
/* 20 */,
/* 21 */,
/* 22 */,
/* 23 */,
/* 24 */,
/* 25 */,
/* 26 */,
/* 27 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


const Scene = __webpack_require__(0);

module.exports = {
  Scene: Scene
};


/***/ })
/******/ ]);