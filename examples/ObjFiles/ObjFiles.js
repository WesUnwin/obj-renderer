const Scene = require('Scene.js');
const ImageManager = require('graphics/ImageManager.js');
const OBJFile = require('modeling/OBJFile.js');
const Model = require('modeling/Model.js');
const Polygon = require('modeling/polygon.js');
const StaticObject = require('StaticObject.js');
const MaterialManager = require('materials/MaterialManager.js');
const objFileContents = require('raw-loader!./Cube.obj');

let _interval;

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

      MaterialManager.loadMaterialFile(gl);

      // Load Materials
      MaterialManager.createMaterial('front', 1, 0, 0);         // red
      MaterialManager.createMaterial('right', 0, 1, 0);         // green
      MaterialManager.createMaterial('back',  0, 0, 1);         // blue
      MaterialManager.createMaterial('left',  1, 1, 0);         // yellow
      MaterialManager.createMaterial('top',  1, 1, 1);          // white
      MaterialManager.createMaterial('bottom',  0.5, 0.5, 0.5); // grey

      // CREATE A SCENE
      const scene = new Scene(gl);

      const objFile = new OBJFile(objFileContents);
      const { models, materialLibs } = objFile.parse();

      const cube = models[0];

      // Create a static game object (that uses the model)
      const gameObject = new StaticObject(cube);
      gameObject.setPosition(0,0,0);

      scene.addObject(gameObject);
      gameObject.rotate(45, 1, 0, 0);

      _interval = setInterval(() => {
        gameObject.rotate(1, 0,1,0);
        scene.render();
      }, 16);
      
    };

    const onImagesLoadFailed = () => {
      console.log("IMAGE LOADING FAILED");
    };

    ImageManager.loadImages(['brick.png'], onImagesLoaded, onImagesLoadFailed);
  },

  stop: function() {
    clearInterval(_interval);
  }

};
