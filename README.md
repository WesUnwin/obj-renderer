# OBJ Renderer

A simple library to parse and render Wavefront 3D (.OBJ) files
and Material Template Library (.MTL) files.

# Installation

```javascript
npm install obj-renderer
```

# Under Construction
This library is actively being developed and will soon reach
a usable state. Stay tuned for updates!

# Renderer
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
| `loadOBJFile(objFileContents, defaultModelName)` | Loads an object file contents (as a string) into the renderer. This adds to the collection of models that this renderer can draw. If the obj file does not assign a string name to model(s) in the file the model will adopt a name of the given defaultModelName. |

# Scene
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

