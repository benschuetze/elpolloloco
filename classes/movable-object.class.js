class MovableObject extends DrawableObject {
    
    speed = 0.04;
    otherDirection = false;
    speedY = 0; // the speed in which the object is falling
    acceleration = 0.14; // the acceleration per a given interval
    health = 100;
    lastHit = 0;

    applyGravity() {

        setInterval(() => {
            if (this.isAboveGround() || this.speedY > 0) { // warum funktioniert das? wenn y kleiner wird müsste er doch eigentlich aufsteigen
                this.y -= this.speedY;
                this.speedY -= this.acceleration;
            }
        }, 1000 / 80)
    }

    isAboveGround() {
        return this.y < 138;
    }

    isColliding(mo) {
        return this.x + this.width > mo.x &&
            this.y + this.height > mo.y &&
            this.x < mo.x &&
            this.y < mo.y + mo.height
    }

    hit() {
        if (this.health > 0) {
            this.health--;
            this.lastHit = new Date().getTime(); //time since a fixed date in the past in digit format
        }
    }

    isHurt() {
        let timepassed = new Date().getTime() - this.lastHit; // time gets requested again 
        timepassed = timepassed / 1000;                       // and the time that was requested 
        return timepassed < 1;                                // before gets subtracted from the new one
                                                              // we get the difference in ms
    }                                                         // the function returns 'true' when timepassed < 5

    isDead() {
        return this.health == 0;
    }




    /**
     * 
     * @param {Array} arr - [img/image1.png, img/image2.png, ...]
     */



    moveRight() {
        this.x += this.speed;
        this.otherDirection = false;
    }

    moveLeft() {
        this.x -= this.speed;
    }

    playAnimation(images) {
        let i = this.currentImage % images.length; // i ist Rest aus Division
        // i = 0, 1, 2, 3, 4, 5, 0, 1, 2, 3, 4, 5, 0, 1, 2, 3, 4, 5, ...
        let path = images[i];
        this.img = this.imageCache[path];
        this.currentImage++;
    }

    jump() {
        this.speedY = 7;
    }
}