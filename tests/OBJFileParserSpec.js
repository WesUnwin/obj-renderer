let OBJFile = require('../src/OBJFile.js');

describe('OBJ File Parser', () => {

  describe('Vertex Definition', function() {

    it('v statements define a vertex', () => {
      var fileContents = "v 1.0 2.0 3.0\nv 4.0 5.5 6.0"
      var model = new OBJFile(fileContents).parse().models[0];
      expect(model.vertices.length).toBe(2);
      expect(model.vertices[0]).toEqual({x: 1.0, y: 2.0, z: 3.0 });
      expect(model.vertices[1]).toEqual({x: 4.0, y: 5.5, z: 6.0 });  
    });

  });

  describe('Texture Coord Definition', function() {

    it('vt statements define a texture coords', () => {
      var fileContents = "vt 1.0 2.0 3.0\nvt 4.0 5.5 6.0"
      var model = new OBJFile(fileContents).parse().models[0];
      expect(model.textureCoords.length).toBe(2);
      expect(model.textureCoords[0]).toEqual({u: 1.0, v: 2.0, w: 3.0 });
      expect(model.textureCoords[1]).toEqual({u: 4.0, v: 5.5, w: 6.0 });  
    });

  });

  describe('Vertex Normal Definition', function() {

    it('vn statements define vertex normals', () => {
      var fileContents = "vn 1.0 2.0 3.0\nvn 4.0 5.5 6.0"
      var model = new OBJFile(fileContents).parse().models[0];
      expect(model.vertexNormals.length).toBe(2);
      expect(model.vertexNormals[0]).toEqual({x: 1.0, y: 2.0, z: 3.0 });
      expect(model.vertexNormals[1]).toEqual({x: 4.0, y: 5.5, z: 6.0 });  
    });

  });

  describe('Comments', () => {

    it('strips everthing from the # to the end of the line', () => {
      const line = "abc#def";
      expect(new OBJFile()._stripComments(line)).toBe('abc');
    });

  });

});