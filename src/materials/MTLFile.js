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
        case 'newmtl':  // Starts a new material, assigns a name to it

          break;
        case 'ka': // (Ka) - Ambient color of material

          break;
        case 'kd': // (Kd) - Difffuse reflectance

          break;
        case 'ks': // (Ks) - Specular reflectance
          // TODO
          break;
        case 'tf': // Transmission filter
          // TODO
          break;
        case 'ns': //
        case 'd': //
        case 'map_ka': //

          break;
        case 'map_kd': //

          break;
        case 'map_ks':
          // TODO
          break;
        case 'map_ns':
          // TODO
          break;
        case 'disp':
          // TODO
          break;
        case 'decal':
          // TODO
          break;
        case 'bump':
          // TODO
          break;
        case 'illum': // Specifies which Illumination model is to be used when rendering the current material. (eg. illum 2)

          // Abbreviations:
          //  N    Unit surface normal
          //  Ia   Itensity of the ambient light
          //  ls   # of lights
          //  Lj   Light direction (vector) of light j
          //  Ij   Light intensity (scalar) of light j

          // Illumination ModeLs:
          //  0:  Constant color   (color = Kd)

          //  1:  Diffuse illumination model (using Lambertian shading).
          //        color = KaIa + Kd { SUM j=1..ls, (N * Lj)Ij }

          //  2:  Diffuse and specular illumination model using Lambertian shading,
          //      and Blinn's interpretation of Phong's specular illumination model.

          //        color = KaIa 
          //          + Kd { SUM j=1..ls, (N*Lj)Ij }
          //          + Ks { SUM j=1..ls, ((H*Hj)^Ns)Ij }
          break;
      }

    }

    return this.materials;
  }

}

module.exports = MTLFile;