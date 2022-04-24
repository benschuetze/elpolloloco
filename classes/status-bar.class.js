class StatusBar extends DrawableObject {

    IMAGES = [
        'img/7.Marcadores/Barra/Marcador vida/verde/0_.png', // index 0
        'img/7.Marcadores/Barra/Marcador vida/verde/20_.png', // index 1
        'img/7.Marcadores/Barra/Marcador vida/verde/40_.png', // index 2
        'img/7.Marcadores/Barra/Marcador vida/verde/60_.png', // index 3
        'img/7.Marcadores/Barra/Marcador vida/verde/80_.png', // index 4
        'img/7.Marcadores/Barra/Marcador vida/verde/100_.png', // index 5
    ];

    percentage = 100;

    constructor() {
        super();
        this.loadImages(this.IMAGES);
        this.height = 50;
        this.width= 170;
        this.x = 35;
        this.y = 0;
        this.setPercentage(100);
    }

    setPercentage(percentage) { // we need to corelate the health percentage
        this.percentage = percentage; //  to the corresponding image index in IMAGES
        let path = this.IMAGES[this.resolveImageIndex()];
        this.img = this.imageCache[path];
    }

    resolveImageIndex() {
        if (this.percentage == 100) { // we return the index of the image
            return 5;                   // that corresponds to the health status
        } else if (this.percentage > 80) {
            return 4;
        } else if (this.percentage > 60) {
            return 3;
        } else if (this.percentage > 40) {
            return 2;
        } else if (this.percentage > 20) {
            return 1;
        } else {
            return 0;
        }
    }

}