class ImageManager {

  static loadImages(imagePaths, onLoadComplete, onFailure) {
    this.images = [];
    this.imageStatuses = {};
    this.successCallback = onLoadComplete;
    this.errorCallback = onFailure;

    imagePaths.forEach((imagePath) => {
      this.imageStatuses[imagePath] = "loading";
      let img = new Image();
      let self = this;
      img.onload = () => { 
        self._onImageLoaded(img);
      };
      img.onerror = () => {
        self._onImageLoadFailed(img);
      };
      img.src =  imagePath;

      this.images.push(img);
    });
  }

  static _onImageLoaded(img) {
    console.log('IMAGE LOADED: ' + img.src);
    this.imageStatuses[img.src] = 'loaded';
    this.checkComplete();
  }

  static _onImageLoadFailed(imgs) {
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

}

module.exports = ImageManager;