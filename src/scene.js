      function drawScene() {
        gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
    
        perspectiveMatrix = makePerspective(45, 640.0/480.0, 0.1, 100.0);
    
        loadIdentity();
        mvTranslate([-0.0, 0.0, -6.0]);
    
        gl.bindBuffer(gl.ARRAY_BUFFER, squareVerticesBuffer);
        gl.vertexAttribPointer(vertexPositionAttribute, 3, gl.FLOAT, false, 0, 0);
        setMatrixUniforms();
        gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
      }
