class World {

    character = new Character();
    level = level1;
    canvas;
    ctx;
    keyboard;
    camera_x = 0;
    statusBar = new StatusBar();

    constructor(canvas, keyboard) {
        this.ctx = canvas.getContext('2d');
        this.canvas = canvas;
        this.keyboard = keyboard;
        this.draw();
        this.checkCollisions();
        this.setWorld();
    }

    setWorld() {
        this.character.world = this; // passing this into character to have access to the variables of world in character
    }

    checkCollisions() {
        setInterval( () => {
            this.level.enemies.forEach( (enemy) => {
                if(this.character.isColliding(enemy)) {
                        this.character.hit();
                } 
            })
        }, 120);
    }


    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.ctx.translate(this.camera_x, 0); // the whole canvas moves by the increment of camera_x
        this.addObjectsToMap(this.level.backgroundObjects)
        this.addToMap(this.statusBar);
        this.addToMap(this.character);
        this.addObjectsToMap(this.level.enemies);
        this.addObjectsToMap(this.level.clouds);
        this.ctx.translate(-this.camera_x, 0); // this is necessary because draw() is repeated tons of times in a second
                                               // so the canvas would be translated to the left 
                                               // by this.camera_x that many times
                                               // which would result in a black canvas
                                               // and a faulty program
        //draw() is called repeatedly
        let self = this;
        requestAnimationFrame(function () {
            self.draw();
        });
    }

    addObjectsToMap(objects) {
        objects.forEach(o => {
            this.addToMap(o);
        })
    }

    // mo = movableObject
    addToMap(mo) {
        if (mo.otherDirection) { // check if object has otherDirection
            this.ctx.save(); // save current settings of context
            this.ctx.translate(mo.width, 0); // change width of character to 0 to prevent skipping
            this.ctx.scale(-1, 1); // mirror character image
            mo.x = mo.x * -1;
        }
        mo.draw(this.ctx);
        mo.drawRect(this.ctx);
        if(mo.otherDirection) {
            mo.x = mo.x * -1;
            this.ctx.restore(); // restore settings from before drawing image to prevent overlapping images
        }
    } // explanation of the code above:
      // if we would not restore after drawing the image
      // changes to the context would be permanent
      // and result in a mass of overlapping images
      // and overall glitching
      // the code is basically a loop
      // that runs as long as left key is pressed
      // saves the current state of the ctx
      // then does some changes
      // draws an image with the changed settings
      // and then restores the settings
      // that were present 
      // when starting the last iteration of the loop
}