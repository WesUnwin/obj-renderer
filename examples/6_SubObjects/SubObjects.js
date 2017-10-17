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


      const groundMaterial = new Material('ground');
      groundMaterial.setAmbientTextureImageURL('assets/images/grass.png');
      renderer.addMaterial(groundMaterial);

      const crate = new Material('crate', 0,0,0, 'assets/images/Crate.png');
      crate.setAmbientTextureImageURL('assets/images/Crate.png');
      renderer.addMaterial(crate);

      renderer.loadOBJFile(groundObj, 'ground');
      renderer.loadOBJFile(boxObj, 'box');


      const scene = new Scene({
        camera: {
          x: 0,
          y: 2,
          z: 10,
          yaw: -20
        },
        objects: [
          { 
            modelName: 'ground',
            x: 0,
            y: 0,
            z: 0
          },
          {
            name: 'parentBox',
            modelName: 'box',
            x: 0,
            y: 1,
            z: 0,
            objects: [
              { 
                name: 'childBox',
                modelName: 'box',
                x: 3,
                y: 0,
                z: 0,
                sx: 0.5,
                sy: 0.5,
                sz: 0.5
              }
            ]
          }
        ]
      });

      const camera = scene.getCamera();
      camera.usePerspectiveView();
      camera.setPosition(0, 2,10);
      camera.setYaw(-20);

      const parentBox = scene.find('parentBox');
      const childBox = parentBox.find('childBox');

      let pitch = 0;
      _interval = setInterval(() => {
        pitch += 1;
        if (pitch >= 360) pitch = 0;

        parentBox.setPitch(pitch);
        childBox.setPitch(pitch);

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
