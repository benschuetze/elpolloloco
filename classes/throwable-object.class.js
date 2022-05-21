class ThrowableObject extends MovableObject{


    constructor(x, y, direction) {
        super().loadImage('img/6.botella/Rotación/Mesa de trabajo 1 copia 3.png');
        this.x = x;// x and y is the position of the character
        this.y = y;           // the bottle gets positioned by the character
        this.height = 80;
        this.otherDirection = direction;
        console.log(direction);
        this.throwAndKick();
    }

    throwAndKick() { 
        this.speedY = 3; 
        this.applyGravity();
        setInterval( () => {
            if(this.otherDirection) {
            this.x -= 15;
            } else {
                this.x += 15;
            }
        }, 1000 / 50)    
    }
}