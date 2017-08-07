const Renderer = require('main.js').Renderer;
const Scene = require('../../src/scenes/Scene.js');
const sobj = require('raw-loader!../assets/models/cube.obj');
const ImageManager = require('../../src/graphics/ImageManager.js');
const Model = require('../../src/modeling/Model.js');
const Polygon = require('../../src/modeling/polygon.js');
const StaticObject = require('../../src/scenes/StaticObject.js');
const Material = require('../../src/materials/Material.js');


module.exports = {

  start: function() {
    const canvas = document.getElementById('mycanvas');

    const renderer = new Renderer(canvas);
    const scene = new Scene();

    renderer.addMaterial(new Material('mat', 1, 0, 0));

    // CREATE A MODEL (Containing just a single, colored triangle)
    const m = new Model('modelName');
    m.vertices = [
     { x: 0.0, y: 0.5, z: 0.0 },
     { x: -0.5, y: -0.5, z: 0.0 },
     { x: 0.5, y: -0.5, z: 0.0 }
    ];
    renderer.addModel(m);

    const triangle = new Polygon('mat');
    triangle.addVertex(1, 0, 0);
    triangle.addVertex(2, 0, 0);
    triangle.addVertex(3, 0, 0);

    m.polygons = [triangle];

    // Create a static game object (that uses the model)
    const gameObject = new StaticObject('modelName');

    scene.addObject(gameObject);

    renderer.renderScene(scene);
  },

  stop: function() {
  }

};