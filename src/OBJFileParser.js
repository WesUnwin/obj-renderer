class OBJFileParser {

  static parseFile(fileContents) {
    const lines = fileContents.split("\n");
    for(let i = 0; i < lines.length; i++) {
      const line = lines[i];

      const symbols = line.replace(/\s\s+/g, ' ').trim().split(' ');

      for(let s = 0; s < symbols.length; s++)
        console.log('sym' + symbols[s]);
      


    }
  }

  

}

module.exports = OBJFileParser;