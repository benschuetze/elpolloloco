class MovableObject extends DrawableObject {
    
    speed = 0.3;
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
        if(this instanceof ThrowableObject) { // to let the bottle fall through
            return true;
        } else {
        return this.y < 138;
        }
    }

    isEndBoss() {
        if(this instanceof Endboss) {
            return true
        }
    }

    isColliding(mo) {
        return this.x + this.width > mo.x &&
            this.y + this.height > mo.y &&
            this.x < mo.x &&
            this.y < mo.y + mo.height
    }

    hit() {
        if (this.health > 0 && this instanceof Character) {
            this.health--;
            this.lastHit = new Date().getTime(); //time since a fixed date in the past in digits
        }
    }

    isHurt() {
        let timepassed = new Date().getTime() - this.lastHit; // time gets requested again 
        timepassed = timepassed / 1000;                       // and the time that was requested 
        return timepassed < 1;                                // before gets subtracted from the new one                                                          // we get the difference in ms
    }                                                         // the function returns 'true' when timepassed < 1

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
        this.speedY = 8;
    }

    enemyMove() {
        if (!this.isDead()) {
            if(this.x > this.character.x) {
            this.moveLeft();
            this.otherDirection = false;
            } 
            if(this.x - this.character.x < -0) {
                    this.moveRight(); 
                    this.otherDirection = true;

            }
        }
    };
}