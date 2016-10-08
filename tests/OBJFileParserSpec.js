let OBJFile = require('../src/OBJFile.js');

describe('OBJ File Parser', () => {

  describe('Vertex Definition', function() {

  	it('v statements define a vertex', () => {
  		var fileContents = "v 1.0 2.0 3.0\nv 4.0 5.0 6.0"

  	});

  });

  it('i', () => {
  	var objFile = new OBJFile();
    console.log(objFile.parseFile('a    b c \n d e f'));
  });


});