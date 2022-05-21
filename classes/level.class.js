class Level {
    enemies;
    clouds;
    backgroundObjects;
    level_end_x = 2250;
    bottles;
    coins;

    constructor(enemies, clouds, backgroundObjects, bottles, coins) { // the three variables are the arrays
        this.enemies = enemies;                       // that are passed from level-1.js  
        this.clouds = clouds;
        this.backgroundObjects = backgroundObjects;
        this.bottles = bottles;
        this.coins = coins;
    }
}