class OBJFile {

  constructor() {
    this.models = [];
    this.currentMaterial = '';
    this.materialLibs = [];
  }

  static parseFile(fileContents) {
    const lines = fileContents.split("\n");
    for(let i = 0; i < lines.length; i++) {
      const line = lines[i];

      const lineItems = line.replace(/\s\s+/g, ' ').trim().split(' ');

      for(let s = 0; s < lineItems.length; s++)
        console.log('sym' + lineItems[s]);
      
      switch(lineItems[0].toLowerCase())
      {
        case 'o':  // Start A New Model
          String modelName = lineItems.length >= 2 ? lineItems[1] : "Untitled";
          models.add(new Model(modelName)); // Attach to list of models to be returned
          break;
        case 'v':  // Define a vertex for the current model
          _parseVertexCoords(lineItems);
          break;
        case 'vt': // Texture Coords
          _parseTextureCoords(lineItems);
          break;
        case 'vn': // Define a vertex normal for the current model
          _parseVertexNormal(lineItems);
          break;
        case 's':  // Smooth shading statement
          parseSmoothShadingStatement(lineItems);
          break;
        case 'f': // Define a Face/Polygon
          _parsePolygon(lineItems);
          break;
        case 'mtllib': // Reference to a material library file (.mtl)
          //if(lineItems.length >= 2)
          //  this.materialLibs.add(lineItems[1]);
          break;
        case 'usemtl': // Sets the current material to be applied to polygons defined from this point forward
          //if(lineItems.length >= 2)
          //  this.currentMaterial = lineItems[1];
          break;
      }

    }
  }

  static _parseVertexCoords(lineItems) {
    // if(this.models.size() == 0)
    //   this.models.add(new Model("Untitled"));
    
    // float x = lineItems.length >= 2 ? Float.parseFloat(lineItems[1]) : 0.0f;
    // float y = lineItems.length >= 3 ? Float.parseFloat(lineItems[2]) : 0.0f;
    // float z = lineItems.length >= 4 ? Float.parseFloat(lineItems[3]) : 0.0f;
    
    // this.models.get(this.models.size() - 1).addVertex(x,y,z);
  }

  static _parseTextureCoords(lineItems) {
    // if(this.models.size() == 0)
    //   this.models.add(new Model("Untitled"));
    
    // float u = lineItems.length >= 2 ? Float.parseFloat(lineItems[1]) : 0.0f;
    // float v = lineItems.length >= 3 ? Float.parseFloat(lineItems[2]) : 0.0f;
    // float w = lineItems.length >= 4 ? Float.parseFloat(lineItems[3]) : 0.0f;
    
    // this.models.get(this.models.size() - 1).addTextureCoords(u,v,w);
  }

  static _parseVertexNormal(lineItems) {
    // if(this.models.size() == 0)
    //   this.models.add(new Model("Untitled"));
    
    // float x = lineItems.length >= 2 ? Float.parseFloat(lineItems[1]) : 0.0f;
    // float y = lineItems.length >= 3 ? Float.parseFloat(lineItems[2]) : 0.0f;
    // float z = lineItems.length >= 4 ? Float.parseFloat(lineItems[3]) : 0.0f;
    
    // this.models.get(this.models.size() - 1).addVertexNormal(x,y,z);
  }

  static _parsePolygon(lineItems) {
    // if(this.models.size() == 0)
    //   this.models.add(new Model("Untitled"));
    
    // int totalVertices = (lineItems.length - 1);
    // if(totalVertices < 3)
    //   throw new OBJFileFormatException("Face statement has less than 3 vertices", this.filePath, this.lineNumber);
    
    // Polygon polygon = new Polygon(this.currentMaterial);
    // for(int i = 0; i<totalVertices; i++)
    // {
    //   String vertexString = lineItems[i + 1];
    //   String[] vertexValues = vertexString.split("/");
      
    //   if(vertexValues.length < 1 || vertexValues.length > 3)
    //     throw new OBJFileFormatException("Two many values (separated by /) for a single vertex", this.filePath, this.lineNumber);
      
    //   int vertexIndex = 0;
    //   int textureCoordsIndex = 0;
    //   int vertexNormalIndex = 0;
    //   vertexIndex = Integer.parseInt(vertexValues[0]);
    //   if(vertexValues.length > 1 && !vertexValues[1].equals(""))
    //     textureCoordsIndex = Integer.parseInt(vertexValues[1]);
    //   if(vertexValues.length > 2)
    //     vertexNormalIndex = Integer.parseInt(vertexValues[2]);
      
    //   polygon.addVertex(vertexIndex, textureCoordsIndex, vertexNormalIndex);
    // }
    // this.models.get(this.models.size() - 1).addPolygon(polygon);
  }

  static _parseMtlLib(lineItems) {

  }

  static _parseUseMtl(lineItems) {

  }

}

module.exports = OBJFileParser;