'use strict';

const Scene = require('scenes/Scene.js');
const ImageManager = require('graphics/ImageManager.js');
const StaticObject = require('scenes/StaticObject.js');
const Material = require('materials/Material.js');
const groundObj = require('raw-loader!./Ground.obj');
const boxObj = require('raw-loader!./Box.obj');
const Renderer = require('main.js').Renderer;


let _interval; 

module.exports = {

  start: function() {

    const onImagesLoaded = () => {
      const canvas = document.getElementById('mycanvas');

      const renderer = new Renderer(canvas);
      const scene = new Scene();

      const camera = scene.getCamera();
      camera.usePerspectiveView();
      camera.setPosition(0, 2,10);
      camera.setYaw(-20);

      renderer.addMaterial(new Material('ground', 0,0,0, 'assets/images/grass.png'));
      renderer.addMaterial(new Material('crate', 0,0,0, 'assets/images/Crate.png'));

      renderer.loadOBJFile(groundObj);
      renderer.loadOBJFile(boxObj);

      const ground = new StaticObject('ground');
      ground.setPosition(0, 0, 0);
      scene.addObject(ground);

      const box = new StaticObject('default');
      box.setPosition(0, 1, 0);
      scene.addObject(box);

      const miniBox = new StaticObject('default');
      miniBox.setScale(0.5, 0.5, 0.5);
      miniBox.setPosition(3, 0, 0);
      box.addObject(miniBox);

      let pitch = 0;
      _interval = setInterval(() => {
        pitch += 1;
        if (pitch >= 360) pitch = 0;

        box.setPitch(pitch);
        miniBox.setPitch(pitch);

        renderer.renderScene(scene);
      }, 15);
    };

    const onImagesLoadFailed = () => {
      console.log("IMAGE LOADING FAILED");
    };

    ImageManager.loadImages(['assets/images/grass.png', 'assets/images/Crate.png'], onImagesLoaded, onImagesLoadFailed);
  },

  stop: function() {
    clearInterval(_interval);
  }

};
