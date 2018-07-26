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

// Create a renderer for drawing to a HTML canvas element
const renderer = new Renderer(canvas);

// Customize rendering parameters
renderer.setClearColor(0, 0, 255); // blue backdrop

// Load model data from .obj files
const boxObj = require('raw-loader!./Crate.obj'); // gets file's contents as a string
renderer.loadOBJFile(boxObj);

// Draw a scene of objects to the canvas
renderer.renderScene(myScene);
```

| Method | Description |
| --- | --- |
| `constructor(canvasElement, viewportX, viewportY, viewportWidth, viewportHeight)` | Creates a renderer instance for drawing to an HTML canvas element. If no viewport arguments are given, the entire area of the canvas is used. |
| `setViewPort(x, y, width, height)` | Changes the area of the canvas that the final rendered image should be drawn to. |
| `loadOBJFile(objFileContents, defaultModelName)` | Loads all models defined in the given .obj file (file contents should be passed in as a string), adding them to the renderers list of models. Models not assigned a name via a preceeding "o modelName" statement are assigned the defaultModelName. |
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
      },
      {
        name: 'parentBox',
        modelName: 'Crate',
        x: 0,
        y: 1,
        z: 0,
        objects: [
          { 
            name: 'childBox',
            modelName: 'Crate',
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
```

| Method | Description |
| --- | --- |
| `constructor(json)` | Creates a scene populating with the objects and camera defined in json. |
| `addObject(object)` | Adds an object to the scenes list of objects. |
| `removeObject(object)` | Removes the specified object from the scene. |
| `find(objectName)` | Returns the first scene object in the scene's hierarchy of objects with the given name. |
| `getCamera()` | Returns the Camera object associated with this scene. |


## Scene Objects
A scene object represents a 3D object that can be placed in a scene.
Each scene object can be directly attached to the scene, or another object within a scene.

Each scene object has a position (x, y, z) and a rotation (pitch, yaw), that position it relative
to its parent object (or the scene itself for top-level objects).

A scene object can be assigned a model name or not.
When assigned a model name, that model is rendered at the position of the scene object.
Scene objects with no model name will not render anything (but can be used to group child objects
that may or may not render a model).

```javascript
  const SceneObject = require('obj-renderer').SceneObject;

  const anObject = new SceneObject({ modelName: 'Crate', x: 0, y: 0, z: 0 });

  anObject.setScale(1, 2, 1); // Stretch vertically by a factor of two

  anObject.rotate(45, 0, 1, 0); // Then rotate it 45 degrees to the left
```

| Method | Description |
| --- | --- |
| `constructor(json)` | Creates a new scene object initializing with the given values and optionally sub-objects |
| `resetTransform()` | Resets the position to (0,0,0) and rotation to (0,0). |
| `setPosition(x, y, z)` | Sets the position of the object relative to its parent, to the given coordinates. |
| `setScale(sx, sy, sz)` | Sets the scaling factors, scaling the object by the given multiplication factors along the x, y, and z axis. |
| `setPitch(degrees)` | Sets the pitch rotation in degrees, a positive value rotates the object counter-clockwise from looking downwards on the object from the sky. |
| `setYaw(degrees)` | Sets the yaw rotation in degrees, a positive value tilts the object upwards from the horizon. |
| `rotate(degrees, x, y, z)` | Rotates the object (in addition to its current position/rotation) the specified degrees clockwise around the vector formed from looking in the direction of point x,y,z from being situated at the origin (0,0,0). |
| `scale(sx, sy, sz)` | Scales the object by the given factors, across the x, y, z axis. |
| `addObject(object)` | Adds a scene object as a child object of this object. |
| `find(objectName)` | Finds the first object that is a descendent of this object with the given object name. |
