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
/******/ 	return __webpack_require__(__webpack_require__.s = 6);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


const Camera = __webpack_require__(20);


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


const ModelStaticVBO = __webpack_require__(15);
const Matrix = __webpack_require__(7);
const SceneObject = __webpack_require__(21);


class StaticObject extends SceneObject {

  constructor(model) {
    super();
		this.modelStaticVBO = new ModelStaticVBO(model);
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

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


class ImageManager {

  static loadImages(imagePaths, onLoadComplete, onFailure) {
    this.images = [];

    const promises = imagePaths.map(imagePath => {
      return new Promise((resolve, reject) => {
        const img = new Image();
        img.onerror = () => reject(img);
        img.onload = () => resolve(img);
        img.src = imagePath;
      });
    });

    const onImagesSuccessfullyLoaded = (images) => {
      this.images = images;
      onLoadComplete();
    };

    Promise.all(promises).then(onImagesSuccessfullyLoaded, onFailure);
  }

  static getImage(filePath) {
    // TODO fix this sketchy look up logic
    return this.images.find(image => {
      return image.src.includes(filePath);
    });
  }
}

module.exports = ImageManager;

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


const Material = __webpack_require__(18);
const Texture = __webpack_require__(19);
const ImageManager = __webpack_require__(2);


let _materials = [];

module.exports = {

  createMaterial: function(gl, name, red, green, blue, textureImage) {
    if (_materials.indexOf(name) != -1) {
      throw new Error('Material with name ' + name + ' already exists');
    }
    const mat = new Material(name);
    mat.setColor(red, green, blue);
    if (textureImage) {
      mat.setTexture(new Texture(gl, textureImage));
    }
    _materials.push(mat);
  },

  getDefaultMaterial: function() {
  	return this.getMaterial();
  },

  getMaterial: function(materialName) {
  	const matName = materialName || '';
  	return _materials.find(mat => {
  		return mat.name == matName;
  	});
  }

};

/***/ }),
/* 4 */
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
/* 5 */
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
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


const Renderer = __webpack_require__(9);
const Scene = __webpack_require__(0);
const StaticObject = __webpack_require__(1);


module.exports = {
	Renderer: Renderer,
  Scene: Scene,
  SceneObject: StaticObject
};


/***/ }),
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


const Model = __webpack_require__(4);
const Polygon = __webpack_require__(5);


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
const MTLFile = __webpack_require__(17);
const ShaderProgram = __webpack_require__(16);
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

    this.setClearColor(0, 0, 0);
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


const MaterialManager = __webpack_require__(3);


/**
 * Represents that has non-changing
 * vertex/textureCoord/normal data that comes from a single model.
 */
class ModelStaticVBO {

  constructor(model) {
    this.model = model;
  }

  render(gl, projectionMatrix, modelViewMatrix) {
    if (!this.buffered)
      this._buffer(gl);

    this.materialMeshes.forEach((mesh) => {
      // Draw one material (a mesh) of the model at a time
      let currentMaterial = MaterialManager.getMaterial(mesh.materialName);
      currentMaterial.use(gl, projectionMatrix, modelViewMatrix);



      // TELL THE SHADER PROGRAM THE VALUES FOR EACH VERTEX ATTRIBUTE
      const shaderProgram = currentMaterial.getShaderProgram();

      // Position data
      var vertexPositionAttribute = gl.getAttribLocation(shaderProgram.getWebGLProgram(), 'aVertexPosition');
      gl.enableVertexAttribArray(vertexPositionAttribute);

      gl.bindBuffer(gl.ARRAY_BUFFER, this.vertexBuffer);
      gl.vertexAttribPointer(vertexPositionAttribute, 3, gl.FLOAT, false, 0, 0);

      // Color data
      var colorAttribute = gl.getAttribLocation(shaderProgram.getWebGLProgram(), 'aVertexColor');
      gl.enableVertexAttribArray(colorAttribute);

      gl.bindBuffer(gl.ARRAY_BUFFER, this.vertexColorBuffer);
      gl.vertexAttribPointer(colorAttribute, 4, gl.FLOAT, false, 0, 0);

      // Texture Coord. data
      var textureCoordsAttribute = gl.getAttribLocation(shaderProgram.getWebGLProgram(), 'aVertexTextureCoords');
      if (textureCoordsAttribute != -1) {
        gl.enableVertexAttribArray(textureCoordsAttribute);
        gl.bindBuffer(gl.ARRAY_BUFFER, this.textureCoordBuffer);
        gl.vertexAttribPointer(textureCoordsAttribute, 2, gl.FLOAT, false, 0, 0);
      }



      // DRAW THE MESH
      let totalMeshVertices = mesh.endIndex - mesh.startIndex + 1;
      gl.drawArrays(gl.TRIANGLES, mesh.startIndex, totalMeshVertices);
    });
  }

  _buffer(gl) {
    let vertexPositions = [];
    let vertexTextureCoords = [];
    let vertexNormals = [];
    const vertexColors = [];

    let meshes = []; // Array of objects, 1 for each material { startIndex, endIndex }

    // Group polygons by material
    let modelMaterials = this.model.getMaterialsUsed();

    let index = 0;
    modelMaterials.forEach((materialName) => {
      const mesh = { materialName: materialName, startIndex: index};

      let currentMaterial = MaterialManager.getMaterial(materialName);
      const polygons = this.model.getPolygonsByMaterial(materialName);

      polygons.forEach((polygon) => {
        polygon.vertices.forEach((vertex) => {
          const vertexCoords = this.model.vertices[vertex.vertexIndex - 1];
          vertexPositions.push(vertexCoords.x);
          vertexPositions.push(vertexCoords.y);
          vertexPositions.push(vertexCoords.z);

          vertexColors.push(currentMaterial.red);
          vertexColors.push(currentMaterial.green);
          vertexColors.push(currentMaterial.blue);
          vertexColors.push(currentMaterial.alpha);

          if (!vertex.textureCoordsIndex) {
            vertexTextureCoords.push(0);
            vertexTextureCoords.push(0);
          } else {
            let vertexTextureCoord = this.model.textureCoords[vertex.textureCoordsIndex - 1];
            vertexTextureCoords.push(vertexTextureCoord.u);
            vertexTextureCoords.push(vertexTextureCoord.v);
          }

          if (!vertex.normalIndex) {
            vertexNormals.push(0);
            vertexNormals.push(0);
          } else {
            let vertexNormal = this.model.vertexNormals[vertex.normalIndex - 1];
            vertexNormals.push(vertexNormal.x);
            vertexNormals.push(vertexNormal.y);
          }

          index += 1;
        });
      });

      mesh.endIndex = index - 1;
      meshes.push(mesh);
    });

    this.materialMeshes = meshes;

    // Load Vertex Position data into a Buffer Object
    this.vertexBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, this.vertexBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertexPositions), gl.STATIC_DRAW);


    this.vertexColorBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, this.vertexColorBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertexColors), gl.STATIC_DRAW);


    // load Texture Coords into a Buffer Object
    this.textureCoordBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, this.textureCoordBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertexTextureCoords), gl.STATIC_DRAW);

    this.buffered = true;


  }
}

module.exports = ModelStaticVBO;

/***/ }),
/* 16 */
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
/* 17 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


class MTLFile {

  constructor(fileContents) {
    this._reset();
    this.fileContents = fileContents;
  }

  _reset() {
    this.materials = [];
    this.currentMaterial = null;
    this.lineNumber = 1;
    this.filename = '';
  }

  parse() {
    this._reset();

    const lines = this.fileContents.split("\n");

    lines.forEach((line, index) => {

      this.lineNumber = (index + 1);

      const lineItems = this._stripComments(line).replace(/\s\s+/g, ' ').trim().split(' ');

      if (lineItems.length == 0) {
        return; // Skip blank lines
      }

      switch(lineItems[0].toLowerCase())
      {
        case 'newmtl':  // Starts a new material, assigns a name to it
          this._parseNewMTL(lineItems);
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

        case 'ka': // (Ka) - Ambient color of material
          this._parseKa(lineItems);
          break;
        case 'kd': // (Kd) - Difffuse reflectance
          this._parseKd(lineItems);
          break;
        case 'ks': // (Ks) - Specular reflectance
          this._parseKs(lineItems);
          break;

        case 'tf': // Transmission filter
          this._parseTF(lineItems);
          break;
        case 'ns': // (Ns) - Specular Exponent
          this._parseNs(lineItems);
          break;
        case 'ni': // (Ni) - 
          this._parseNi(lineItems);
          break;
        case 'd': // Controls how the current material dissolves (becomes transparent)
          this._parseD(lineItems);
          break;
        case 'sharpness':
          this._parseSharpness(lineItems);
          break;

        case 'map_ka': //
          this._parseMapKa(lineItems);
          break;
        case 'map_kd': //
          this._parseMapKd(lineItems);
          break;
        case 'map_ks':
          this._parseMapKs(lineItems);
          break;
        case 'map_ns':
          this._parseMapNs(lineItems);
          break;

        case 'disp':
          this._parseDisp(lineItems);
          break;
        case 'decal':
          this._parseDecal(lineItems);
          break;
        case 'bump':
          this._parseBump(lineItems);
          break;

        case 'refl': // Reflection Map Statement
          this._parseRefl(lineItems);
          break;

        default:
          this._fileError(`Unrecognized statement: ${lineItems[0]}`);
      }
    });

    return this.materials;
  }

  // newmtl material_name
  _parseNewMTL(lineItems) {
    if (lineItems.length < 2) {
      throw 'newmtl statement must specify a name for the maerial (eg, newmtl brickwall)';
    }
    const newMat = new Material(lineItems[1]);
    this.materials.push(newMat);
    this.currentMaterial = newMat;
  }

  // Ka r g b         <- currently only this syntax is supported
  // Ka spectral file.rfl factor
  // Ka xyz x y z
  _parseKa(lineItems) {
    this._notImplemented('Kd');
  }

  // Kd r g b         <- currently only this syntax is supported
  // Kd spectral file.rfl factor
  // Kd xyz x y z
  _parseKd(lineItems) {
    this._notImplemented('Kd');
  }

  // Ks r g b
  // Ks spectral file.rfl factor
  // Ks xyz x y z
  _parseKs(lineItems) {
    this._notImplemented('Ks');
  }

  _parseTF(lineItems) {
    this._notImplemented('tf');
  }

  // ns 500
  // Defines how focused the specular highlight is,
  // typically in the range of 0 to 1000.
  _parseNS(lineItems) {
    this._notImplemented('Ns');
  }

  _parseNi(lineItems) {
    this._notImplemented('Ni');
  }

  // d factor
  // d -halo factor
  // Controls how much the material dissolves (becomes transparent).
  _parseD(lineItems) {
    this._notImplemented('d');
  }

  _parseSharpness(lineItems) {
    this._notImplemented('sharpness');
  }

  // map_Ka [options] textureFile
  // map_Ka -s 1 1 1 -o 0 0 0 -mm 0 1 file.mpc
  _parseMapKa(lineItems) {
    this._notImplemented('map_Ka');
  }

  // map_Kd [options] textureFile
  _parseMapKd(lineItems) {
    this._notImplemented('map_Kd');
  }

  _parseMapNs(lineItems) {
    this._notImplemented('map_Ns');
  }

  _parseDisp(lineItems) {
    this._notImplemented('disp');
  }

  _parseDecal(lineItems) {
    this._notImplemented('decal');
  }

  _parseBump(lineItems) {
    this._notImplemented('bump');
  }

  _parseRefl(lineItems) {
    this._notImplemented('bump');
  }

  _notImplemented(message) {
    console.warn(`MTL file statement not implemented: ${message}`);
  }

  _fileError(message) {
    const file = this.filename ? `File: ${this.filename}` : '';
    const material = `Material: ${this.currentMaterial.getName()}`;
    const line = `Line: ${this.lineNumber}`;
    const errorMessage = `MTL file format error (${file}  ${material}  ${line}): ${message}`;
    throw errorMessage;
  }

}

module.exports = MTLFile;

/***/ }),
/* 18 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


class Material {

  constructor(name) {
    this.name = name || '';
    this.setColor(1,0,0);
    this.texture = null;
    this.illum = 0;

    this.Ka = { red: 0, green: 0, blue: 0 };
    this.Kd = { red: 0, green: 0, blue: 0 };
    this.Ks = { red: 0, green: 0, blue: 0 };
  }

  getName() {
    return this.name;
  }

  setColor(red, green, blue, alpha = 1.0) {
    this.red = red;
    this.green = green;
    this.blue = blue;
    this.alpha = alpha; 
  }

  setTexture(texture) {
  	this.texture = texture;
  }

  use(gl, projectionMatrix, modelViewMatrix) {
    if (this.texture) {
      this.texture.use(gl);
    }

    const shaderProgram = this.getShaderProgram();
    shaderProgram.use(gl);
    shaderProgram.setProjectionMatrix(gl, projectionMatrix);
    shaderProgram.setModelViewMatrix(gl, modelViewMatrix);

    shaderProgram.setUniformValue(gl, "uSampler", 0);
  }

  getShaderProgram() {
    if (this.texture)
      return window.texturedShaderProgram;
    else
      return window.defaultShaderProgram;
  }

}

module.exports = Material;

/***/ }),
/* 19 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


class Texture {

  /**
   * image should be a new Image() kind of object.
   * Image width/height should be a power of two!
   */
  constructor(gl, image) {
    this.glTexture = gl.createTexture();
    gl.bindTexture(gl.TEXTURE_2D, this.glTexture);
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, image);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR_MIPMAP_NEAREST);
    gl.generateMipmap(gl.TEXTURE_2D);
    gl.bindTexture(gl.TEXTURE_2D, null);
  }

  use(gl) {
    gl.activeTexture(gl.TEXTURE0);
    gl.bindTexture(gl.TEXTURE_2D, this.glTexture);
  }

}

module.exports = Texture;

/***/ }),
/* 20 */
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

/***/ }),
/* 21 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


const Matrix = __webpack_require__(7);


class SceneObject {

  constructor(x, y, z) {
    this.x = x || 0;
    this.y = y || 0;
    this.z = z || 0;
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

}

module.exports = SceneObject;

/***/ })
/******/ ]);