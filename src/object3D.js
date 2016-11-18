var Matrix = require('./matrix.js');

var Object3D = function() {
  this._matrix = new matrix();
  this._x = 0;
  this._y = 0;
  this._z = 0;
  this._scaleX = 0;
  this._scaleY = 0;
  this._scaleZ = 0;
  this._vertices = [];
  this._triangles = [];

  this.setPosition(x,y,z) = function() {
  	this._x = x;
  	this._y = y;
  	this._z = z;
  };

  this.setScale(x,y,z) = function() {
  	this._scaleX = x;
  	this._scaleY = y;
  	this._scaleZ = z;
  };

  this.setMatrix(matrix) {
  	this._matrix = matrix;
  };

  this.render = function(gl) {

  };
};
