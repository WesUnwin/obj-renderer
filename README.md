# OBJ Renderer

A simple library to parse and render Wavefront 3D (.OBJ) files
and Material Template Library (.MTL) files.

## Installation

```javascript
npm install obj-renderer
```

## Under Construction
This library is actively being developed and will soon reach
a usable state. Stay tuned for updates!

## Renderer
The principle type of object used with this library is a Renderer. A renderer performs the task of
rendering a given scene over a canvas, and limits the rendering to a rectangular area of the canvas
(the viewport).

```javascript
const Renderer = require('obj-renderer').Renderer;

const renderer = new Renderer(canvas);
renderer.renderScene(myScene); // where myScene is an instance of require('obj-renderer').Scene
```

| Method | Description |
| --- | --- |
| `constructor(canvasElement, viewportX, viewportY, viewportWidth, viewportHeight)` | Creates a renderer instance for drawing to an HTML canvas element. If no viewport arguments are given, the entire area of the canvas is used. |
| `setViewPort(x, y, width, height)` | Changes the area of the canvas that the final rendered image should be drawn to. |
| `addModel(model)` | Adds the specified model to the internal list of models the renderer can draw. |
| `loadOBJFile(objFileContents, defaultModelName)` | Loads all models defined in the given .obj file (file contents should be passed in as a string), adding them to the renderers list of models. Models not assigned a name via a preceeding "o modelName" statement are assigned the defaultModelName. |
| `addMaterial(material)` | Add the given material object to the renderer's list of materials. |
| `loadMTLFile(mtlFileContents)` | Loads all materials defined in an .mtl file (file contents should be passed in as a string), adding them to the renderers list of materials.
| `renderScene(scene)` | Draws the given scene object to the renderer's underlying canvas. |


## Scene
A scene object represents a 3D world, with a camera, and an array scene objects.
The objects can themselves have objects, forming a hierarchy of objects under the scene.
A scene can be constructed and initialized by passing in an object literal:

```javascript
  const Scene = require('obj-renderer').Scene;

  const myScene = new Scene({
    camera: {
      x: 0,
      y: 2,
      z: 10,
      yaw: -20
    },
    objects: [
      { 
        modelName: 'Box',
        x: 0,
        y: 0,
        z: 0
      }
    ]
  });
```

| Method | Description |
| --- | --- |
| `constructor(json)` | Creates a scene populating with the objects and camera defined in json. |
| `addObject(object)` | Adds an object to the scenes list of objects. |
