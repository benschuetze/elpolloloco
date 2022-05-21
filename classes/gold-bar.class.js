class GoldBar extends FixedObject {

IMAGES = [
    'img/7.Marcadores/Barra/Marcador moneda/Naranja/0_.png',
    'img/7.Marcadores/Barra/Marcador moneda/Naranja/20_ .png',
    'img/7.Marcadores/Barra/Marcador moneda/Naranja/40_.png',
    'img/7.Marcadores/Barra/Marcador moneda/Naranja/60_.png',
    'img/7.Marcadores/Barra/Marcador moneda/Naranja/80_ _1.png',
    'img/7.Marcadores/Barra/Marcador moneda/Naranja/100__1.png'
];

percentage = 0;

constructor() {
    super();
    this.loadImages(this.IMAGES);
    this.height = 45;
    this.width= 170;
    this.x = 35;
    this.y = 40;
    this.setPercentage(this.percentage);
}

}