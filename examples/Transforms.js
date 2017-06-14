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
    MaterialManager.getDefaultMaterial().setColor(1,0,0,1);

    // CREATE A SCENE
    const scene = new Scene(gl);

    // CREATE A MODEL (Containing just a single, colored triangle)
    const cube = new Model();
    cube.vertices = [
     { x: -0.5, y: 0.5, z: 0.5 },
     { x: -0.5, y: -0.5, z: 0.5 },
     { x: 0.5, y: -0.5, z: 0.5 },
     { x: 0.5, y: 0.5, z: 0.5 },

     { x: -0.5, y: 0.5, z: -0.5 },
     { x: -0.5, y: -0.5, z: -0.5 },
     { x: 0.5, y: -0.5, z: -0.5 },
     { x: 0.5, y: 0.5, z: -0.5 }
    ];

    const front1 = new Polygon();
    front1.addVertex(1, 0, 0);
    front1.addVertex(2, 0, 0);
    front1.addVertex(3, 0, 0);

    const front2 = new Polygon();
    front2.addVertex(4, 0, 0);
    front2.addVertex(1, 0, 0);
    front2.addVertex(3, 0, 0);

    cube.polygons = [front1, front2];

    // Create a static game object (that uses the model)
    const gameObject = new StaticObject(cube);
    gameObject.setPosition(0.5,0,0);

    scene.addObject(gameObject);

    scene.render();
  };

  const onImagesLoadFailed = () => {
    console.log("IMAGE LOADING FAILED");
  };

  ImageManager.loadImages(['brick.png'], onImagesLoaded, onImagesLoadFailed);
}

window.helloWorld();