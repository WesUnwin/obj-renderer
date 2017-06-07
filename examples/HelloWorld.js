const Shaders = require('../src/shaders.js');
const Scene = require('../src/Scene.js');
const sobj = require('raw-loader!../data/unitcube.obj');
const ImageManager = require('../src/graphics/ImageManager.js');
const Model = require('../src/modeling/Model.js');
const Polygon = require('../src/modeling/polygon.js');
const StaticObject = require('../src/StaticObject.js');
const MaterialManager = require('../src/materials/MaterialManager.js');


window.helloWorld = function() {
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

    // CREATE A MODEL (Containing just a single, colored triangle)
    let m = new Model();
    m.vertices = [
     { x: 0.0, y: 0.5, z: 0.0 },
     { x: -0.5, y: -0.5, z: 0.0 },
     { x: 0.5, y: -0.5, z: 0.0 }
    ];

    let triangle = new Polygon('textured');
    triangle.addVertex(1, 0, 0);
    triangle.addVertex(2, 0, 0);
    triangle.addVertex(3, 0, 0);

    m.polygons = [triangle];

    // Create a static game object (that uses the model)
    const gameObject = new StaticObject(m);

    scene.addObject(gameObject);

    scene.render();
  };

  const onImagesLoadFailed = () => {
    console.log("IMAGE LOADING FAILED");
  };

  ImageManager.loadImages(['brick.png'], onImagesLoaded, onImagesLoadFailed);
}

window.helloWorld();