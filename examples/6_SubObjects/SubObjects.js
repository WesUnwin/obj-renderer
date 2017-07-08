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
      setTimeout(() => {
        const canvas = document.getElementById('mycanvas');
        const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
        if (!gl) alert('Unable to obtain WebGL/Experiment WebGL context');

        gl.viewportWidth = 640;
        gl.viewportHeight = 480;
        gl.viewport(0, 0, canvas.width, canvas.height);

        MaterialManager.createMaterial(gl, 'ground',  0, 0, 0, ImageManager.getImage('grass.png'));

        MaterialManager.createMaterial(gl, 'crate', 0, 0, 0, ImageManager.getImage('Crate.png'));

        const scene = new Scene(gl);
        scene.userPerspectiveView();

        const groundModel = new OBJFile(groundObj).parse().models[0];
        const ground = new StaticObject(groundModel);
        ground.setPosition(0, -3, -10);
        scene.addObject(ground);

        const boxModel = new OBJFile(boxObj).parse().models[0];
        const box = new StaticObject(boxModel);

        scene.addObject(box);

        _interval = setInterval(() => {
          box.setPosition(0,0,0);
          box.rotate(1, 1,1,0); // causing precision leak to due successive ope
                box.setPosition(0, -2, -8);
          scene.render();
        }, 16);
      }, 3000); // some sort of race conditions causing image loading not to be fully complete before texture bufferring (fix for now with 3 sec delay before texture buffering)


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
