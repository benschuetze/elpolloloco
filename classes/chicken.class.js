class Chicken extends MovableObject {
    height = 70;
    width = 70;
    y = 360;



    constructor() {
        super().loadImage('img/3.Secuencias_Enemy_básico/Versión_Gallinita (estas salen por orden de la gallina gigantona)/1.Ga_paso_derecho.png');  //loadImage wird von übergeordneter Klasse (MovableObject) aufgerufen
        this.x = 200 + Math.random() * 500;
        this.animate();
    }

    animate() {
        setInterval( () => {
            this.x -= 0.45;
        }, 1000 / 80)
    }

}