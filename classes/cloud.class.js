class Cloud extends MovableObject {
    y = 50;
    width = 600;
    height = 300;
    constructor() {
        super().loadImage('img/5.Fondo/Capas/4.nubes/1.png');  //loadImage wird von übergeordneter Klasse (MovableObject) aufgerufen
        this.x = Math.random() * 400;
        this.animate();
    }

    animate() {
        this.moveLeft();
    }
}