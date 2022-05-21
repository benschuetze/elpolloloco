class HealthBar extends FixedObject {

    IMAGES = [
        'img/7.Marcadores/Barra/Marcador vida/verde/0_.png', // index 0
        'img/7.Marcadores/Barra/Marcador vida/verde/20_.png', // index 1
        'img/7.Marcadores/Barra/Marcador vida/verde/40_.png', // index 2
        'img/7.Marcadores/Barra/Marcador vida/verde/60_.png', // index 3
        'img/7.Marcadores/Barra/Marcador vida/verde/80_.png', // index 4
        'img/7.Marcadores/Barra/Marcador vida/verde/100_.png' // index 5
    ];





    percentage = 100;

    constructor() {
        super();
        this.loadImages(this.IMAGES);
        this.height = 45;
        this.width= 170;
        this.x = 35;
        this.y = 0;
        this.setPercentage(this.percentage);
    }
}