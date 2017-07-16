'use strict';

class MTLFile {

  constructor(fileContents) {
    this._reset();
    this.fileContents = fileContents;
  }

  _reset() {
    this.materials = [];
  }

  parse() {
    this._reset();

    const lines = this.fileContents.split("\n");
    for(let i = 0; i < lines.length; i++) {
      const line = this._stripComments(lines[i]);

      const lineItems = line.replace(/\s\s+/g, ' ').trim().split(' ');
      
      switch(lineItems[0].toLowerCase())
      {
        case 'newmtl':  // Start a new material

          break;
      }

    }

    return this.materials;
  }

}

module.exports = MTLFile;