const HelloWorld = require('./HelloWorld/HelloWorld.js');
const TexturedSquare = require('./TexturedSquare/TexturedSquare.js');
const RotatingCube = require('./RotatingCube/RotatingCube.js');
const Perspective = require('./Perspective/Perspective.js');
const ObjFiles = require('./ObjFiles/ObjFiles.js');


const examples = {
	'HelloWorld': HelloWorld,
	'TexturedSquare': TexturedSquare,
	'RotatingCube': RotatingCube,
	'Perspective': Perspective,
	'ObjFiles': ObjFiles
};


const showExample = (exampleName) => {
	if (window.currentExample) window.currentExample.stop();
	window.currentExample = examples[exampleName];
	window.currentExample.start();
};

window.radioClicked = () => {
  let radios = document.getElementsByName('example');
	for (var i = 0, length = radios.length; i < length; i++) {
	    if (radios[i].checked) {
	        showExample(radios[i].value);
	        break;
	    }
	}
};

let html = "";
html += "<table>";
html += "  <tr>";
html += "    <td with='200px'>";
for (let key in examples) {
	html += "      <label><input type='radio' name='example' value='" + key + "' onClick='radioClicked()'/>" + key + "</label><br />";
}
html += "    </td>";
html += "    <td>";
html += "      <canvas id='mycanvas' width='640' height='480'></canvas>";
html += "    </td>";
html += "  </tr>";
html += "</table>";

document.getElementById('examplepicker').innerHTML += html;


showExample('HelloWorld');
