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
/******/ 	return __webpack_require__(__webpack_require__.s = 3);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


const Camera = __webpack_require__(17);


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

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


class Model {

  constructor(modelName) {
    this.name = modelName;
    this.vertices = [];
    this.textureCoords = [];
    this.vertexNormals = [];
    this.polygons = [];
  }

  getName() {
    return this.name;
  }

  addVertex(x, y, z) {
    this.vertices.push({x: x, y: y, z: z});
  }

  addTextureCoords(u, v, w) {
    this.textureCoords.push({u: u, v: v, w: w});
  }

  addVertexNormal(x, y, z) {
    this.vertexNormals.push({x: x, y: y, z: z});
  }

  addPolygon(polygon) {
    this.polygons.push(polygon);
  }

  // Returns an array listed all the names of all materials
  // used by the polygons of this model.
  getMaterialsUsed() {
    let materials = [];
    this.polygons.forEach((p) => {
      if (materials.indexOf(p.materialName) === -1)
        materials.push(p.materialName);
    });
    return materials;
  }

  getPolygonsByMaterial(materialName) {
    return this.polygons.filter((p) => {
      return p.materialName === materialName;
    });
  }

}

module.exports = Model;

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


class Polygon {

  constructor(materialName) {
    this.materialName = materialName;
    this.vertices = [];
  }

  addVertex(vertexIndex, textureCoordsIndex, normalIndex) {
    this.vertices.push({
      vertexIndex:        vertexIndex,
      textureCoordsIndex: textureCoordsIndex,
      normalIndex:        normalIndex
    });
  }

}

module.exports = Polygon;

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


const Renderer = __webpack_require__(9);
const Scene = __webpack_require__(0);


module.exports = {
	Renderer: Renderer,
  Scene: Scene
};


/***/ }),
/* 4 */,
/* 5 */,
/* 6 */,
/* 7 */
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
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


const Model = __webpack_require__(1);
const Polygon = __webpack_require__(2);


class OBJFile {

  constructor(fileContents) {
    this._reset();
    this.fileContents = fileContents;
  }

  _reset() {
    this.models = [];
    this.currentMaterial = '';
    this.materialLibs = [];
  }

  parse() {
    this._reset();

    const lines = this.fileContents.split("\n");
    for(let i = 0; i < lines.length; i++) {
      const line = this._stripComments(lines[i]);

      const lineItems = line.replace(/\s\s+/g, ' ').trim().split(' ');
      
      switch(lineItems[0].toLowerCase())
      {
        case 'o':  // Start A New Model
          this._parseObject(lineItems);
          break;
        case 'g': // Start a new polygon group
          throw "NOT IMPLEMENTED";
          break;
        case 'v':  // Define a vertex for the current model
          this._parseVertexCoords(lineItems);
          break;
        case 'vt': // Texture Coords
          this._parseTextureCoords(lineItems);
          break;
        case 'vn': // Define a vertex normal for the current model
          this._parseVertexNormal(lineItems);
          break;
        case 's':  // Smooth shading statement
          this._parseSmoothShadingStatement(lineItems);
          break;
        case 'f': // Define a Face/Polygon
          this._parsePolygon(lineItems);
          break;
        case 'mtllib': // Reference to a material library file (.mtl)
          this._parseMtlLib(lineItems);
          break;
        case 'usemtl': // Sets the current material to be applied to polygons defined from this point forward
          this._parseUseMtl(lineItems);
          break;
      }

    }

    return {
      models: this.models,
      materialLibs: this.materialLibs
    };
  }

  _currentModel() {
    if(this.models.length == 0)
      this.models.push(new Model("Untitled"));

    return this.models[this.models.length - 1];
  }

  _stripComments(lineString) {
    let commentIndex = lineString.indexOf('#');
    if(commentIndex > -1)
      return lineString.substring(0, commentIndex);
    else
      return lineString;
  }

  _parseObject(lineItems) {
    let modelName = lineItems.length >= 2 ? lineItems[1] : "Untitled";
    this.models.push(new Model(modelName)); // Attach to list of models to be returned
  }

  _parseVertexCoords(lineItems) {
    let x = lineItems.length >= 2 ? parseFloat(lineItems[1]) : 0.0;
    let y = lineItems.length >= 3 ? parseFloat(lineItems[2]) : 0.0;
    let z = lineItems.length >= 4 ? parseFloat(lineItems[3]) : 0.0;
    
    this._currentModel().addVertex(x, y, z);
  }

  _parseTextureCoords(lineItems) {
    let u = lineItems.length >= 2 ? parseFloat(lineItems[1]) : 0.0;
    let v = lineItems.length >= 3 ? parseFloat(lineItems[2]) : 0.0;
    let w = lineItems.length >= 4 ? parseFloat(lineItems[3]) : 0.0;
    
    this._currentModel().addTextureCoords(u, v, w);
  }

  _parseVertexNormal(lineItems) {
    let x = lineItems.length >= 2 ? parseFloat(lineItems[1]) : 0.0;
    let y = lineItems.length >= 3 ? parseFloat(lineItems[2]) : 0.0;
    let z = lineItems.length >= 4 ? parseFloat(lineItems[3]) : 0.0;
    
    this._currentModel().addVertexNormal(x, y, z);
  }

  _parsePolygon(lineItems) {
    let totalVertices = (lineItems.length - 1);
    if(totalVertices < 3)
      throw ("Face statement has less than 3 vertices" + this.filePath + this.lineNumber);
    
    let polygon = new Polygon(this.currentMaterial);
    for(let i = 0; i<totalVertices; i++)
    {
      let vertexString = lineItems[i + 1];
      let vertexValues = vertexString.split("/");
      
      if(vertexValues.length < 1 || vertexValues.length > 3)
        throw ("Two many values (separated by /) for a single vertex" + this.filePath + this.lineNumber);
      
      let vertexIndex = 0;
      let textureCoordsIndex = 0;
      let vertexNormalIndex = 0;
      vertexIndex = parseInt(vertexValues[0]);
      if(vertexValues.length > 1 && (!vertexValues[1] == ""))
        textureCoordsIndex = parseInt(vertexValues[1]);
      if(vertexValues.length > 2)
        vertexNormalIndex = parseInt(vertexValues[2]);
      
      if (vertexIndex == 0)
        throw "Faces uses invalid vertex index of 0";

      // Negative vertex indices refer to the nth last defined vertex
      // convert these to postive indices for simplicity
      if (vertexIndex < 0)
        vertexIndex = this._currentModel().vertices.length + 1 + vertexIndex;

      polygon.addVertex(vertexIndex, textureCoordsIndex, vertexNormalIndex);
    }
    this._currentModel().addPolygon(polygon);
  }

  _parseMtlLib(lineItems) {
    if(lineItems.length >= 2)
      this.materialLibs.push(lineItems[1]);
  }

  _parseUseMtl(lineItems) {
    if(lineItems.length >= 2)
      this.currentMaterial = lineItems[1];
  }

  _parseSmoothShadingStatement(lineItems) {
    throw "NOT IMPLEMENTED";
  }
}

module.exports = OBJFile;

/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


const OBJFile = __webpack_require__(8);
const MTLFile = __webpack_require__(16);
const ShaderProgram = __webpack_require__(15);
const DefaultVertexShaderSource = __webpack_require__(14);
const DefaultFragmentShaderSource = __webpack_require__(13);
const TexturedVertexShaderSource = __webpack_require__(12);
const TexturedFragmentShaderSource = __webpack_require__(11);


class Renderer {

	constructor(canvasElement, viewportX, viewportY, viewportWidth, viewportHeight) {
    const gl = canvasElement.getContext('webgl') || canvasElement.getContext('experimental-webgl');
    if (!gl) alert('Unable to obtain WebGL/Experiment WebGL context');

		this._gl = gl;

    this._models = [];
    this._materials = [];

		this.setViewPort(viewportX || 0, viewportY || 0, viewportWidth || canvasElement.width, viewportHeight || canvasElement.height);
    window.defaultShaderProgram = new ShaderProgram(this._gl, DefaultVertexShaderSource, DefaultFragmentShaderSource);
    window.texturedShaderProgram = new ShaderProgram(this._gl, TexturedVertexShaderSource, TexturedFragmentShaderSource);

    this._setRenderingDefaults();
	}

  setViewPort(x, y, width, height) {
    this._gl.viewport(x, y, width, height);
  }

  loadOBJFile(objFileContents) {
    const objFile = new OBJFile(objFileContents);
    const { models, materialLibs } = objFile.parse();
    models.forEach(model => {
      this.addModel(model);
    })
  }

  addModel(model) {
    if (this._models.some(m => { return m.getName() == model.getName(); })) {
      throw `Scene models must have unique names - a model already with name: ${model.getName()} already exists`;
    }
    this._models.push(model);
  }

  getModelNames() {
    return this._models.map(m => m.getName());
  }

  loadMTLFile(mtlFileContents) {
    const mtlFile = new MTLFile(mtlFileContents);
  }

  addMaterial(material) {
    if (this._materials.some(mat => { return mat.getName() == material.getName(); })) {
      throw `Scene materials must have unique names - a material already with name: ${material.getName()} already exists`;
    }
    this._materials.push(material);
  }

  _setRenderingDefaults() {
    this._gl.clearDepth(1.0);  // Sets the value to clear the depth buffer to when using gl.clear() 
                               // (does not actual clear the buffer)

    this.setBackDropColor(0, 0, 0);
    this.enableBackFaceCulling(false);
    this.enableDepthTest(true);
  }

  setClearColor(red, green, blue) {
    // Set values to clear framebuffer bits to:
    this._gl.clearColor(red, green, blue, 1.0);  // Clear to black, fully opaque
  }

  enableBackFaceCulling(cullBackFaces = true) {
    const gl = this._gl;
    if (cullBackFaces) {
      gl.enable(gl.CULL_FACE);   // Turn on face-culling
      gl.frontFace(gl.CCW);      // Counter clockwise (CCW) vertex winding means your facing the front of a polygon
      gl.cullFace(gl.BACK);      // Cull (don't draw) polygons when their back is facing the camera
    } else {
      gl.disable(gl.CULL_FACE);
    }
  }

  enableDepthTest(useDepthTesting = true) {
    const gl = this._gl;
    if (useDepthTesting) { 
      gl.enable(gl.DEPTH_TEST);  // Enable depth testing
      gl.depthFunc(gl.LESS);     // Draw pixels with a Z value less than the z value of the pixel already drawn at the same location on the frame buffer
      gl.depthMask(true);        // allow writing to Z-buffer
    } else {
      gl.disable(gl.DEPTH_TEST);
    }
  }

  renderScene(scene) {
    // Clear the framebuffer bits:  (to the currently set clearColor and clearDepth values)
    this._gl.clear(this._gl.COLOR_BUFFER_BIT | this._gl.DEPTH_BUFFER_BIT);

    const camera = scene.getCamera();
    const projMatrix = camera.getProjectionMatrix();
    const modelViewMatrix = camera.getModelViewMatrix();

    const objects = scene.getObjects();
    objects.forEach(obj => {
      obj.render(this._gl, projMatrix, modelViewMatrix);
    });
  }
}

module.exports = Renderer;

/***/ }),
/* 10 */,
/* 11 */
/***/ (function(module, exports) {

module.exports = "precision mediump float;\n\nvarying vec3 vTextureCoords;\n\nuniform sampler2D uSampler;\n\nvoid main(void) {\n  gl_FragColor = texture2D(uSampler, vec2(vTextureCoords.s, vTextureCoords.t));\n}"

/***/ }),
/* 12 */
/***/ (function(module, exports) {

module.exports = "attribute vec3 aVertexPosition;\nattribute vec4 aVertexColor;\nattribute vec3 aVertexTextureCoords;\n\nuniform mat4 uMVMatrix;\nuniform mat4 uPMatrix;\n\nvarying vec4 vColor;\nvarying vec3 vTextureCoords;\n\nvoid main(void) {\n  vColor = aVertexColor;\n  vTextureCoords = aVertexTextureCoords;\n\n  gl_Position = uPMatrix * uMVMatrix * vec4(aVertexPosition, 1.0);\n}"

/***/ }),
/* 13 */
/***/ (function(module, exports) {

module.exports = "precision mediump float;\n\nvarying vec4 vColor;\n\nvoid main(void) {\n  gl_FragColor = vColor;\n}"

/***/ }),
/* 14 */
/***/ (function(module, exports) {

module.exports = "attribute vec3 aVertexPosition;\nattribute vec4 aVertexColor;\nattribute vec3 aVertexTextureCoords;\n\nuniform mat4 uMVMatrix;\nuniform mat4 uPMatrix;\n\nvarying vec4 vColor;\n\nvoid main(void) {\n  vColor = aVertexColor;\n\n  gl_Position = uPMatrix * uMVMatrix * vec4(aVertexPosition, 1.0);\n}"

/***/ }),
/* 15 */
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
/* 16 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


class MTLFile {

  constructor(fileContents) {
    this._reset();
    this.fileContents = fileContents;
  }

  _reset() {
    this.materials = [];
  }

  parse() {
    this._reset();

    const lines = this.fileContents.split("\n");
    for(let i = 0; i < lines.length; i++) {
      const line = this._stripComments(lines[i]);

      const lineItems = line.replace(/\s\s+/g, ' ').trim().split(' ');
      
      switch(lineItems[0].toLowerCase())
      {
        case 'newmtl':  // Starts a new material, assigns a name to it

          break;
        case 'ka': // (Ka) - Ambient color of material

          break;
        case 'kd': // (Kd) - Difffuse reflectance

          break;
        case 'ks': // (Ks) - Specular reflectance
          // TODO
          break;
        case 'tf': // Transmission filter
          // TODO
          break;
        case 'ns': //
        case 'd': //
        case 'map_ka': //

          break;
        case 'map_kd': //

          break;
        case 'map_ks':
          // TODO
          break;
        case 'map_ns':
          // TODO
          break;
        case 'disp':
          // TODO
          break;
        case 'decal':
          // TODO
          break;
        case 'bump':
          // TODO
          break;
        case 'illum': // Specifies which Illumination model is to be used when rendering the current material. (eg. illum 2)

          // Abbreviations:
          //  N    Unit surface normal
          //  Ia   Itensity of the ambient light
          //  ls   # of lights
          //  Lj   Light direction (vector) of light j
          //  Ij   Light intensity (scalar) of light j

          // Illumination ModeLs:
          //  0:  Constant color   (color = Kd)

          //  1:  Diffuse illumination model (using Lambertian shading).
          //        color = KaIa + Kd { SUM j=1..ls, (N * Lj)Ij }

          //  2:  Diffuse and specular illumination model using Lambertian shading,
          //      and Blinn's interpretation of Phong's specular illumination model.

          //        color = KaIa 
          //          + Kd { SUM j=1..ls, (N*Lj)Ij }
          //          + Ks { SUM j=1..ls, ((H*Hj)^Ns)Ij }
          break;
      }

    }

    return this.materials;
  }

}

module.exports = MTLFile;

/***/ }),
/* 17 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


const Matrix = __webpack_require__(7);


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

/***/ })
/******/ ]);