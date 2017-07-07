class ImageManager {

  static loadImages(imagePaths, onLoadComplete, onFailure) {
    this.images = [];
    this.imageStatuses = {};
    this.successCallback = onLoadComplete;
    this.errorCallback = onFailure;

    imagePaths.forEach((imagePath) => {
      this.imageStatuses[imagePath] = "loading";
      let img = new Image();

      img.onload = () => { 
        this._onImageLoaded(img);
      };
      img.onerror = () => {
        this._onImageLoadFailed(img);
      };
      img.src =  imagePath;

      this.images.push(img);
    });
  }

  static _onImageLoaded(img) {
    this.imageStatuses[img.src] = 'loaded';
    this.checkComplete();
  }

  static _onImageLoadFailed(img) {
    console.log('IMAGE LOAD FAILED: ' + img.src);
    this.imageStatuses[img.src] = 'failed';
    this.checkComplete();
  }

  static checkComplete() {
    let incomplete = this.images.find((image) => {
      return this.imageStatuses[image.src] == 'loading';
    });
    if (incomplete) return;
    let failed = this.images.find((image) => {
      return this.imageStatuses[image.src] == 'failed';
    });
    if (failed) {
      this.errorCallback();
    } else {
      this.successCallback();
    }
  }

  static getImage(filePath) {
    // TODO fix this sketchy look up logic
    return this.images.find(image => {
      return image.src.includes(filePath);
    });
  }
}

module.exports = ImageManager;