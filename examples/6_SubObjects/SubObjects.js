'use strict';

const Scene = require('Scene.js');
const ImageManager = require('graphics/ImageManager.js');
const OBJFile = require('modeling/OBJFile.js');
const Model = require('modeling/Model.js');
const Polygon = require('modeling/polygon.js');
const StaticObject = require('StaticObject.js');
const MaterialManager = require('materials/MaterialManager.js');
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
      scene.camera.usePerspectiveView();

      MaterialManager.createMaterial(renderer._gl, 'ground',  0, 0, 0, ImageManager.getImage('assets/images/grass.png'));

      MaterialManager.createMaterial(renderer._gl, 'crate', 0, 0, 0, ImageManager.getImage('assets/images/Crate.png'));

      const groundModel = new OBJFile(groundObj).parse().models[0];
      const ground = new StaticObject(groundModel);
      ground.setPosition(0, 0, 0);
      scene.addObject(ground);

      const boxModel = new OBJFile(boxObj).parse().models[0];
      const box = new StaticObject(boxModel);
      box.setPosition(0, 1, 0);

      const miniBox = new StaticObject(boxModel);
      miniBox.setScale(0.5, 0.5, 0.5);
      miniBox.setPosition(3, 0, 0);
      box.addObject(miniBox);

      scene.addObject(box);

      scene.camera.setPosition(0, 2,10);
      scene.camera.setYaw(-20);

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
