const Renderer = require('main.js').Renderer;
const Scene = require('scenes/Scene.js');
const ImageManager = require('graphics/ImageManager.js');
const OBJFile = require('modeling/OBJFile.js');
const Model = require('modeling/Model.js');
const Polygon = require('modeling/polygon.js');
const StaticObject = require('scenes/StaticObject.js');
const Material = require('materials/Material.js');
const objFileContents = require('raw-loader!./Cube.obj');

let _interval;

module.exports = {

  start: function() {

    const onImagesLoaded = () => {
      const canvas = document.getElementById('mycanvas');

      const renderer = new Renderer(canvas);
      const scene = new Scene();

      // Load Materials
      renderer.addMaterial(new Material('front', 1,0,0));
      renderer.addMaterial(new Material('right', 0,1,0));
      renderer.addMaterial(new Material('back', 0,0,0, 'assets/images/brick.png'));
      renderer.addMaterial(new Material('left', 1,1,0));
      renderer.addMaterial(new Material('top', 1,1,1));
      renderer.addMaterial(new Material('bottom', 0.5, 0.5, 0.5));

      renderer.loadOBJFile(objFileContents);

      // Create a static game object (that uses the model)
      const gameObject = new StaticObject('default');
      gameObject.setPosition(0,0,0);

      scene.addObject(gameObject);

      _interval = setInterval(() => {
        gameObject.rotate(1, 0,1,0);
        renderer.renderScene(scene);
      }, 16);
      
    };

    const onImagesLoadFailed = () => {
      console.log("IMAGE LOADING FAILED");
    };

    ImageManager.loadImages(['assets/images/brick.png'], onImagesLoaded, onImagesLoadFailed);
  },

  stop: function() {
    clearInterval(_interval);
  }

};
