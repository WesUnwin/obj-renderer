let OBJFileParser = require('../src/OBJFileParser.js');

describe('OBJ File Parser', () => {

  it('i', () => {
    console.log(OBJFileParser.parseFile('a    b c \n d e f'));
  });


});