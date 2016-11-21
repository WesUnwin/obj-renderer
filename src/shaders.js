let DefaultVertexShaderSource = require('../data/shaders/vertexshader.shader');
let DefaultFragmentShaderSource = require('../data/shaders/fragmentshader.shader');

module.exports = {

  setupShaders: function(gl) {
    var shaderProgram;

    var vertexShader = gl.createShader(gl.VERTEX_SHADER);
    gl.shaderSource(vertexShader, DefaultVertexShaderSource);
    gl.compileShader(vertexShader);         
    if (!gl.getShaderParameter(vertexShader, gl.COMPILE_STATUS)) {
      alert('Vertex shader did not compile');
      return;
    }

    var fragmentShader = gl.createShader(gl.FRAGMENT_SHADER);
    gl.shaderSource(fragmentShader, DefaultFragmentShaderSource);
    gl.compileShader(fragmentShader);           
    if (!gl.getShaderParameter(fragmentShader, gl.COMPILE_STATUS)) {
      alert('Fragment shader did not compile');
      return;
    }

    var shaderProgram = gl.createProgram();
    gl.attachShader(shaderProgram, vertexShader);
    gl.attachShader(shaderProgram, fragmentShader);
    gl.linkProgram(shaderProgram);
    if (!gl.getProgramParameter(shaderProgram, gl.LINK_STATUS)) {
      alert('shader program did not link');
      return;
    }

    gl.useProgram(shaderProgram);


    return shaderProgram;
  }


};