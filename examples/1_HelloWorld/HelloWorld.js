const Renderer = require('main.js').Renderer;
const Scene = require('../../src/scenes/Scene.js');
const sobj = require('raw-loader!../assets/models/cube.obj');
const ImageManager = require('../../src/graphics/ImageManager.js');
const Model = require('../../src/modeling/Model.js');
const Polygon = require('../../src/modeling/polygon.js');
const StaticObject = require('../../src/scenes/StaticObject.js');
const MaterialManager = require('../../src/materials/MaterialManager.js');


module.exports = {

  start: function() {
    const canvas = document.getElementById('mycanvas');

    const renderer = new Renderer(canvas);
    const scene = new Scene();

    MaterialManager.createMaterial(renderer._gl, null, 1, 0, 0);

    // CREATE A MODEL (Containing just a single, colored triangle)
    const m = new Model();
    m.vertices = [
     { x: 0.0, y: 0.5, z: 0.0 },
     { x: -0.5, y: -0.5, z: 0.0 },
     { x: 0.5, y: -0.5, z: 0.0 }
    ];

    const triangle = new Polygon();
    triangle.addVertex(1, 0, 0);
    triangle.addVertex(2, 0, 0);
    triangle.addVertex(3, 0, 0);

    m.polygons = [triangle];

    // Create a static game object (that uses the model)
    const gameObject = new StaticObject(m);

    scene.addObject(gameObject);

    renderer.renderScene(scene);
  },

  stop: function() {
  }

};