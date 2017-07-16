const Scene = require('Scene.js');
const ImageManager = require('graphics/ImageManager.js');
const OBJFile = require('modeling/OBJFile.js');
const Model = require('modeling/Model.js');
const Polygon = require('modeling/polygon.js');
const StaticObject = require('StaticObject.js');
const MaterialManager = require('materials/MaterialManager.js');
const groundObj = require('raw-loader!./Ground.obj');
const boxObj = require('raw-loader!./Box.obj');

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

      MaterialManager.createMaterial(gl, 'ground',  0, 0, 0, ImageManager.getImage('grass.png'));

      MaterialManager.createMaterial(gl, 'crate', 0, 0, 0, ImageManager.getImage('Crate.png'));

      const scene = new Scene(gl);
      scene.camera.usePerspectiveView();

      const groundModel = new OBJFile(groundObj).parse().models[0];
      const ground = new StaticObject(groundModel);
      ground.setPosition(0, -3, -10);
      scene.addObject(ground);

      const boxModel = new OBJFile(boxObj).parse().models[0];
      const box = new StaticObject(boxModel);
      box.setPosition(0, -2, -10);

      const miniBox = new StaticObject(boxModel);
      miniBox.setScale(0.5, 0.5, 0.5);
      miniBox.setPosition(3, 0, 0);
      box.addObject(miniBox);

      scene.addObject(box);

      let pitch = 0;
      _interval = setInterval(() => {
        pitch += 1;
        if (pitch >= 360) pitch = 0;

        box.setPitch(pitch);
        miniBox.setPitch(pitch);

        scene.render();
      }, 15);
    };

    const onImagesLoadFailed = () => {
      console.log("IMAGE LOADING FAILED");
    };

    ImageManager.loadImages(['grass.png', 'Crate.png'], onImagesLoaded, onImagesLoadFailed);
  },

  stop: function() {
    clearInterval(_interval);
  }

};
