
var Scene = function() {
  this.objects = [];

  this.render = function(gl) {
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

    perspectiveMatrix = makePerspective(45, 640.0/480.0, 0.1, 100.0);

    loadIdentity();
    mvTranslate([-0.0, 0.0, -6.0]);

    for(var i = 0; i < this.objects.length; i++) {
      this.objects[i].render();
    }
  }

};