'use strict';

class ImageManager {

  static loadImages(imagePaths, onLoadComplete, onFailure) {
    this.images = [];

    const promises = imagePaths.map(imagePath => {
      return new Promise((resolve, reject) => {
        const img = new Image();
        img.onerror = () => reject(img);
        img.onload = () => resolve(img);
        img.src = imagePath;
      });
    });

    const onImagesSuccessfullyLoaded = (images) => {
      this.images = images;
      onLoadComplete();
    };

    Promise.all(promises).then(onImagesSuccessfullyLoaded, onFailure);
  }

  static getImage(filePath) {
    // TODO fix this sketchy look up logic
    return this.images.find(image => {
      return image.src.includes(filePath);
    });
  }
}

module.exports = ImageManager;