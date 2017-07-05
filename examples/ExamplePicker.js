const HelloWorld = require('./1_HelloWorld/HelloWorld.js');
const RotatingCube = require('./2_RotatingCube/RotatingCube.js');
const Perspective = require('./3_Perspective/Perspective.js');
const TexturedSquare = require('./4_TexturedSquare/TexturedSquare.js');
const ObjFiles = require('./5_ObjFiles/ObjFiles.js');


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
