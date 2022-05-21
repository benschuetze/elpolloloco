class FixedObject extends DrawableObject {


    setPercentage(percentage) { // we need to corelate the health percentage
        this.percentage = percentage; //  to the corresponding image index in IMAGES
        let path = this.IMAGES[this.resolveImageIndex()];
        this.img = this.imageCache[path];
    }

    resolveImageIndex() {
        if (this.percentage == 100) { // we return the index of the image
            return 5;                   // that corresponds to the health status
        } else if (this.percentage >= 80) {
            return 4;
        } else if (this.percentage >= 60) {
            return 3;
        } else if (this.percentage >= 40) {
            return 2;
        } else if (this.percentage >= 20) {
            return 1;
        } else {
            return 0;
        }
    }

}