var Matrix = require('../src/matrix.js');

describe('Matrix', function() {

  describe('loadIdentity function', function() {

    it('loads the 4x4 identity mastrix', function() {
      var m = new Matrix();
      m.loadIdentity();
      expect(m.values).toEqual([1,0,0,0, 0,1,0,0, 0,0,1,0, 0,0,0,1]);
    });

  });

  it('passes', function() {
    console.log("test run");
    //expect(1).toBe(2);
  });

});

