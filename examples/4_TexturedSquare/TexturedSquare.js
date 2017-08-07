const Renderer = require('main.js').Renderer;
const Scene = require('../../src/scenes/Scene.js');
const ImageManager = require('../../src/graphics/ImageManager.js');
const Model = require('../../src/modeling/Model.js');
const Polygon = require('../../src/modeling/polygon.js');
const StaticObject = require('../../src/scenes/StaticObject.js');
const Material = require('../../src/materials/Material.js');


module.exports = {

  start: function() {

    const onImagesLoaded = () => {
      const canvas = document.getElementById('mycanvas');

      const renderer = new Renderer(canvas);
      const scene = new Scene();

      renderer.addMaterial(new Material('textured', 0,0,0, 'assets/images/brick.png'));

      // CREATE A MODEL (Containing just a single, textured triangle)
      const m = new Model('square');
      m.vertices = [
       { x: -0.5, y: 0.5, z: 0.0 },   // left, top
       { x: -0.5, y: -0.5, z: 0.0 },  // left, bottom
       { x: 0.5, y: -0.5, z: 0.0 },   // right, bottom
       { x: 0.5, y: 0.5, z: 0.0 }     // right, top
      ];
      renderer.addModel(m);

      m.addTextureCoords(0,0,0); // U = 0, V = 0  (upper left of texture image)
      m.addTextureCoords(0,1,0); // U = 0, V = 1  (bottom: v = 1, left: u = 1)
      m.addTextureCoords(1,1,0);
      m.addTextureCoords(1,0,0);

      const triangle = new Polygon('textured');
      triangle.addVertex(1, 1, 0);
      triangle.addVertex(2, 2, 0);
      triangle.addVertex(3, 3, 0);

      const triangle2 = new Polygon('textured');
      triangle2.addVertex(1, 1, 0);
      triangle2.addVertex(3, 3, 0);
      triangle2.addVertex(4, 4, 0);

      m.polygons = [triangle, triangle2];

      // Create a static game object (that uses the model)
      const gameObject = new StaticObject('square');

      scene.addObject(gameObject);

      renderer.renderScene(scene);
    };

    const onImagesLoadFailed = () => {
      console.log("IMAGE LOADING FAILED");
    };

    ImageManager.loadImages(['assets/images/brick.png'], onImagesLoaded, onImagesLoadFailed);
  },

  stop: function() {
  }

};
