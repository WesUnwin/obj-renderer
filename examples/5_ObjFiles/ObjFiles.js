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

      // Load Materials
      MaterialManager.createMaterial(gl, 'front', 1, 0, 0);         // red
      MaterialManager.createMaterial(gl, 'right', 0, 1, 0);         // green
      MaterialManager.createMaterial(gl, 'back',  0, 0, 0, ImageManager.getImage('brick.png'));         // blue
      MaterialManager.createMaterial(gl, 'left',  1, 1, 0);         // yellow
      MaterialManager.createMaterial(gl, 'top',  1, 1, 1);          // white
      MaterialManager.createMaterial(gl, 'bottom',  0.5, 0.5, 0.5); // grey

      // CREATE A SCENE
      const scene = new Scene(gl);

      const objFile = new OBJFile(objFileContents);
      const { models, materialLibs } = objFile.parse();

      const cube = models[0];

      // Create a static game object (that uses the model)
      const gameObject = new StaticObject(cube);
      gameObject.setPosition(0,0,0);

      scene.addObject(gameObject);

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
