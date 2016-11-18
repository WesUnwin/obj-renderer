let Model = require('../../src/modeling/model.js');
let Polygon = require('../../src/modeling/polygon.js');

describe('Model', () => {

  describe('Constructor', () => {

    it('constructs a model with the given name', () => {
      let m = new Model('ModelName');
      expect(m.name).toEqual('ModelName');
    });

    it('initializes the model to have 0 vertices and polygons', () => {
      let m = new Model();
      expect(m.vertices).toEqual([]);
      expect(m.polygons).toEqual([]);
    });

  });
  
  describe('getMaterialsUsed', () => {

    it('returns an array of all materials used by the model\'s polygons', () => {
      let m = new Model();
      m.polygons = [new Polygon('MatA'), new Polygon('MatA'), new Polygon(''), new Polygon('MatB')];
      expect(m.getMaterialsUsed()).toEqual(['MatA', '', 'MatB']);
    });

  });

  describe('getPolygonsByMaterial', () => {

    it('returns all polygons using the specified material', () => {
      var p1 = new Polygon('MatA');
      var p2 = new Polygon('MatA');
      let m = new Model();
      m.polygons = [p1, p2, new Polygon(''), new Polygon('MatB')];
      expect(m.getPolygonsByMaterial('MatA')).toEqual([p1, p2]);
    });

  });

});