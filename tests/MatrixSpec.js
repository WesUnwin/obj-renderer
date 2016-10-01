var Matrix = require('../src/matrix.js');

describe('Matrix', () => {

  describe('constructor', () => {

    it('inits the values to the identity matrix when given no args', () => {
      var m = new Matrix();
      expect(m.values).toEqual([1,0,0,0, 0,1,0,0, 0,0,1,0, 0,0,0,1]);
    });

    it('inits the values to the given 16 values when given an array', () => {
      var v = [1,2,3,4, 5,6,7,8, 9,10,11,12, 13,14,15,16];
      var m = new Matrix(v);
      expect(m.values).toEqual(v);
    });

    it('raises an error if given array of more than 16 values', () => {
      var v = [1,2,3,4, 5,6,7,8, 9,10,11,12, 13,14,15,16, 17];
      expect(() => { Matrix(v) }).toThrow();
    });

    it('raises an error if the argument is not an array', () => {
      expect(() => { Matrix("poo"); }).toThrow();
    });

  });

  describe('loadIdentity', () => {

    it('loads the 4x4 identity mastrix', () => {
      var m = new Matrix();
      m.loadIdentity();
      expect(m.values).toEqual([1,0,0,0, 0,1,0,0, 0,0,1,0, 0,0,0,1]);
    });

  });

  describe('multiply', () => {

    it('multiplies itself (the left matrix) by the given matrix (the right matrix)', () => {
      var m = new Matrix([2,2,1,3, 1,2,-1,3, 1,4,1,2, -1,2,1,3]);
      m.multiply([0,3,2,0, 1,4,2,3, -3,1,2,1, 1,3,2,2]);
      expect(m.values).toEqual([2,24,16,13, 8,19,10,11, 3,26,16,17, 2,15,10,13]);
    });

  });

  describe('translate', () => {
    
    it('multiples the matrix by a translation matrix that shifts points by x,y,z units', () => {

    });

  });

});

