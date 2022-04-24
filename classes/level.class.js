class Level {
    enemies;
    clouds;
    backgroundObjects;
    level_end_x = 2250;

    constructor(enemies, clouds, backgroundObjects) { // the three variables are the arrays
        this.enemies = enemies;                       // that are passed from level-1.js  
        this.clouds = clouds;
        this.backgroundObjects = backgroundObjects;
    }
}