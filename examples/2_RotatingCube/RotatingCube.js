const Renderer = require('main.js').Renderer;
const Scene = require('../../src/scenes/Scene.js');
const sobj = require('raw-loader!../assets/models/cube.obj');
const ImageManager = require('../../src/graphics/ImageManager.js');
const Model = require('../../src/modeling/Model.js');
const Polygon = require('../../src/modeling/polygon.js');
const StaticObject = require('../../src/scenes/StaticObject.js');
const MaterialManager = require('../../src/materials/MaterialManager.js');


let _interval;

module.exports = {

  start: function() {
    const canvas = document.getElementById('mycanvas');

    const renderer = new Renderer(canvas);
    const scene = new Scene();

    // Load Materials
    MaterialManager.createMaterial(renderer._gl, 'front', 1, 0, 0);         // red
    MaterialManager.createMaterial(renderer._gl, 'right', 0, 1, 0);         // green
    MaterialManager.createMaterial(renderer._gl, 'back2',  0, 0, 1);         // blue
    MaterialManager.createMaterial(renderer._gl, 'left',  1, 1, 0);         // yellow
    MaterialManager.createMaterial(renderer._gl, 'top',  1, 1, 1);          // white
    MaterialManager.createMaterial(renderer._gl, 'bottom',  0.5, 0.5, 0.5); // grey

    // CREATE A MODEL (Containing just a single, colored triangle)
    const cube = new Model();
    cube.vertices = [
     { x: -0.5, y: 0.5, z: 0.5 },   // 1 Front, top left
     { x: -0.5, y: -0.5, z: 0.5 },  // 2 Front, bottom left
     { x: 0.5, y: -0.5, z: 0.5 },   // 3 Front, bottom right
     { x: 0.5, y: 0.5, z: 0.5 },    // 4 Front, top right

     { x: -0.5, y: 0.5, z: -0.5 },  // 5 Back, top left
     { x: -0.5, y: -0.5, z: -0.5 }, // 6 Back, bottom left
     { x: 0.5, y: -0.5, z: -0.5 },  // 7 Back, bottom right
     { x: 0.5, y: 0.5, z: -0.5 }    // 8 Back, top right
    ];

    const front1 = new Polygon('front');
    front1.addVertex(1, 0, 0);
    front1.addVertex(2, 0, 0);
    front1.addVertex(3, 0, 0);

    const front2 = new Polygon('front');
    front2.addVertex(4, 0, 0);
    front2.addVertex(1, 0, 0);
    front2.addVertex(3, 0, 0);

    const leftSide1 = new Polygon('left');
    leftSide1.addVertex(5, 0, 0);
    leftSide1.addVertex(6, 0, 0);
    leftSide1.addVertex(2, 0, 0);

    const leftSide2 = new Polygon('left');
    leftSide2.addVertex(5, 0, 0);
    leftSide2.addVertex(2, 0, 0);
    leftSide2.addVertex(1, 0, 0);

    const rightSide1 = new Polygon('right');
    rightSide1.addVertex(4, 0, 0);
    rightSide1.addVertex(3, 0, 0);
    rightSide1.addVertex(7, 0, 0);

    const rightSide2 = new Polygon('right');
    rightSide2.addVertex(4, 0, 0);
    rightSide2.addVertex(7, 0, 0);
    rightSide2.addVertex(8, 0, 0);

    const back1 = new Polygon('back2');
    back1.addVertex(5, 0, 0);
    back1.addVertex(6, 0, 0);
    back1.addVertex(7, 0, 0);

    const back2 = new Polygon('back2');
    back2.addVertex(8, 0, 0);
    back2.addVertex(5, 0, 0);
    back2.addVertex(7, 0, 0);

    const top1 = new Polygon('top');
    top1.addVertex(5, 0, 0);
    top1.addVertex(1, 0, 0);
    top1.addVertex(4, 0, 0);

    const top2 = new Polygon('top');
    top2.addVertex(5, 0, 0);
    top2.addVertex(4, 0, 0);
    top2.addVertex(8, 0, 0);

    const bottom1 = new Polygon('bottom');
    bottom1.addVertex(6, 0, 0);
    bottom1.addVertex(2, 0, 0);
    bottom1.addVertex(3, 0, 0);

    const bottom2 = new Polygon('bottom');
    bottom2.addVertex(6, 0, 0);
    bottom2.addVertex(3, 0, 0);
    bottom2.addVertex(7, 0, 0);

    cube.polygons = [front1, front2, rightSide1, rightSide2, back1, back2, leftSide1, leftSide2, top1, top2, bottom1, bottom2];

    // Create a static game object (that uses the model)
    const gameObject = new StaticObject(cube);
    gameObject.setPosition(0,0,0);

    scene.addObject(gameObject);
    gameObject.rotate(45, 1, 0, 0);

    _interval = setInterval(() => {
      gameObject.rotate(1, 0,1,0);
      renderer.renderScene(scene);
    }, 16);
  },

  stop: function() {
    clearInterval(_interval);
  }

};
