module.exports = {

  setupShaders: function(gl) {
    var shaderProgram;

    var vertexShaderScriptElement = document.getElementById('shader-vs');
    var vertexShader = gl.createShader(gl.VERTEX_SHADER);
    gl.shaderSource(vertexShader, vertexShaderScriptElement.text);
    gl.compileShader(vertexShader);         
    if (!gl.getShaderParameter(vertexShader, gl.COMPILE_STATUS)) {
      alert('Vertex shader did not compile');
      return;
    }

    var fragmentShaderScriptElement = document.getElementById('shader-fs');
    var fragmentShader = gl.createShader(gl.FRAGMENT_SHADER);
    gl.shaderSource(fragmentShader, fragmentShaderScriptElement.text);
    gl.compileShader(fragmentShader);           
    if (!gl.getShaderParameter(fragmentShader, gl.COMPILE_STATUS)) {
      alert('Fragment shader did not compile');
      return;
    }

    shaderProgram = gl.createProgram();
    gl.attachShader(shaderProgram, vertexShader);
    gl.attachShader(shaderProgram, fragmentShader);
    gl.linkProgram(shaderProgram);
    if (!gl.getProgramParameter(shaderProgram, gl.LINK_STATUS)) {
      alert('shader program did not link');
      return;
    }

    gl.useProgram(shaderProgram);

    var pUniform = gl.getUniformLocation(shaderProgram, "uPMatrix");
    //gl.uniformMatrix4fv(pUniform, false, new Float32Array(perspectiveMatrix.flatten()));

    var mvUniform = gl.getUniformLocation(shaderProgram, "uMVMatrix");
    //gl.uniformMatrix4fv(mvUniform, false, new Float32Array(mvMatrix.flatten()));

    return shaderProgram;
  }


};