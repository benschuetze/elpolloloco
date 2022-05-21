class Coin extends CollectableObject {
    height = 200;
    width = 200;
    constructor() {
        super().loadImage('img/8.Coin/Moneda1.png');
        this.y = 80 + Math.random() * 50;
    }
} 