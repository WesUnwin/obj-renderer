const Scene = require('../../src/Scene.js');
const ImageManager = require('../../src/graphics/ImageManager.js');
const Model = require('../../src/modeling/Model.js');
const Polygon = require('../../src/modeling/polygon.js');
const StaticObject = require('../../src/StaticObject.js');
const MaterialManager = require('../../src/materials/MaterialManager.js');


module.exports = {

  start: function() {
    console.clear();
    console.log('Application started');

    const onImagesLoaded = () => {
      const canvas = document.getElementById('mycanvas');
      const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
      if (!gl) alert('Unable to obtain WebGL/Experiment WebGL context');

      gl.viewportWidth = 640;
      gl.viewportHeight = 480;
      gl.viewport(0, 0, canvas.width, canvas.height);

      // Load Materials
      MaterialManager.loadMaterialFile(gl);

      // CREATE A SCENE
      let scene = new Scene(gl);

      // CREATE A MODEL (Containing just a single, textured triangle)
      let m = new Model();
      m.vertices = [
       { x: -0.5, y: 0.5, z: 0.0 },   // left, top
       { x: -0.5, y: -0.5, z: 0.0 },  // left, bottom
       { x: 0.5, y: -0.5, z: 0.0 },   // right, bottom
       { x: 0.5, y: 0.5, z: 0.0 }     // right, top
      ];

      m.addTextureCoords(0,0,0); // U = 0, V = 0  (upper left of texture image)
      m.addTextureCoords(0,1,0); // U = 0, V = 1  (bottom: v = 1, left: u = 1)
      m.addTextureCoords(1,1,0);
      m.addTextureCoords(1,0,0);

      let triangle = new Polygon('textured');
      triangle.addVertex(1, 1, 0);
      triangle.addVertex(2, 2, 0);
      triangle.addVertex(3, 3, 0);

      let triangle2 = new Polygon('textured');
      triangle2.addVertex(1, 1, 0);
      triangle2.addVertex(3, 3, 0);
      triangle2.addVertex(4, 4, 0);

      m.polygons = [triangle, triangle2];

      // Create a static game object (that uses the model)
      const gameObject = new StaticObject(m);

      scene.addObject(gameObject);

      scene.render();
    };

    const onImagesLoadFailed = () => {
      console.log("IMAGE LOADING FAILED");
    };

    ImageManager.loadImages(['brick.png'], onImagesLoaded, onImagesLoadFailed);
  },

  stop: function() {
  }

};
