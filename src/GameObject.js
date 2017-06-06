const ModelStaticVBO = require('../src/graphics/ModelStaticVBO.js');


class GameObject {

  constructor(model) {
		this.modelStaticVBO = new ModelStaticVBO(model);
  }

  render(gl, shaderProgram) {
  	this.modelStaticVBO.render(gl, shaderProgram);
  }

}

module.exports = GameObject;