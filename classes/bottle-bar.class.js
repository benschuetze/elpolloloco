class BottleBar extends FixedObject {

    IMAGES = [
        'img/7.Marcadores/Barra/Marcador_botella/Azul/0_.png',
        'img/7.Marcadores/Barra/Marcador_botella/Azul/20_.png',
        'img/7.Marcadores/Barra/Marcador_botella/Azul/40_.png',
        'img/7.Marcadores/Barra/Marcador_botella/Azul/60_.png',
        'img/7.Marcadores/Barra/Marcador_botella/Azul/80_.png',
        'img/7.Marcadores/Barra/Marcador_botella/Azul/100_.png'
    ];

    percentage;


    constructor() {
        super();
        this.loadImages(this.IMAGES);
        this.height = 45;
        this.width= 170;
        this.x = 35;
        this.y = 80;
        this.setPercentage(this.percentage);
    }

}