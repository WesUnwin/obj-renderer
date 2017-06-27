const HelloWorld = require('./HelloWorld/HelloWorld.js');
const TexturedSquare = require('./TexturedSquare/TexturedSquare.js');
const RotatingCube = require('./RotatingCube/RotatingCube.js');
const ObjFiles = require('./ObjFiles/ObjFiles.js');


const examples = {
	'HelloWorld': HelloWorld,
	'TexturedSquare': TexturedSquare,
	'RotatingCube': RotatingCube,
	'ObjFiles': ObjFiles
};


const showExample = (exampleName) => {
	examples[exampleName].start();
};


showExample('ObjFiles');
