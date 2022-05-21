class CollectableObject extends MovableObject {
    height = 80;
    y = 360;
    x;
    constructor() {
        super();
        this.x = 400 + Math.random() * 2000;
    }
}