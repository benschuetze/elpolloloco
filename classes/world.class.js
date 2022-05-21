class World {
    start = new Start();
    end = new GameOver();
    won = new GameWon();
    character = new Character();
    level = level1;
    canvas;
    ctx;
    keyboard;
    camera_x = 0;
    healthBar = new HealthBar();
    goldBar = new GoldBar();
    bottleBar = new BottleBar();
    throwableObjects = [];
    collectedBottles = 0;
    collectedCoins = 0;
    enemiesKilled = 0;
    gameIsRunning = false;
    gameOver = false;
    gameWon = false;
    endBoss = this.level.enemies[this.level.enemies.length - 1]
    bottleSound = new Audio('audio/bottle-crash.mp3');
    chickenCrushedSound = new Audio('audio/chicken-crushed.mp3');
    chickenSound = new Audio('audio/chickens.mp3');
    coinSound = new Audio('audio/coin-collected.mp3');
    pepeHurtSound = new Audio('audio/pepe-hurt.mp3');
    throwSound = new Audio('audio/throw.mp3');
    grabBottleSound = new Audio('audio/grab.mp3');
    winSound = new Audio('audio/win.mp3');
    bottlesBuyedSound = new Audio('audio/bottles-buyed.mp3');
    backgroundMusic = new Audio('audio/background-music.mp3');
    chickenAttackSound = new Audio('audio/chicken-attacks.mp3')
    chickenScreamSound = new Audio('audio/chicken-scream.mp3');
    lastYPositionOfCharacter;

    constructor(canvas, keyboard) {
        this.ctx = canvas.getContext('2d');
        this.canvas = canvas;
        this.keyboard = keyboard;
        this.setWorld();
        this.draw();
        this.run();
        this.checkGameStarted();
        console.log('goldbar Images', this.goldBar.img);
    }

    setWorld() {
        this.character.world = this; // passing this into character to have access to the variables of world in character
        this.level.enemies.forEach((enemy) => {
            enemy.character = this.character;
        });
        this.endBoss.character = this.character;
    }

   collisionWatch() {
        this.checkEnemies();
        this.checkBottles();
        this.checkCoins();
        this.checkThrowables();
        this.checkEndboss();
    }

    checkThrowObjects() {
        this.checkIfThrowed();
        this.checkIfKicked();
    }

    run() {
        setInterval(() => {
            if (this.gameIsRunning) {
                this.collisionWatch();
                this.checkThrowObjects();
                this.checkFullGoldBar();
                this.checkDistanceCharacterEndboss();
                this.checkIfGameIsOver();
                this.playBackgroundSounds();
                this.getLastYPositionOfCharacter(); 
            }
        }, 120);
    }

    getLastYPositionOfCharacter() {
        this.lastYPositionOfCharacter = this.character.y; // 
    }

    playBackgroundSounds() {
        this.chickenSound.volume = 0.3;
        this.backgroundMusic.volume = 0.2;
        this.chickenSound.play();
        this.backgroundMusic.play();
    }

    checkIfGameIsOver() {
        if (this.character.health == 0) {
            this.gameIsRunning = false;
            this.gameOver = true;
        }
        if (this.endBoss.health == 0) {
            this.gameIsRunning = false,
            this.gameWon = true;
        }
    }

    checkDistanceCharacterEndboss() {
        let distance = this.endBoss.x - this.character.x;
        if (distance < 600 && !this.endBoss.isDead() && this.gameIsRunning) {
            this.endBossStartsMoving();
        } else {
            this.chickenAttackSound.pause();
        }
        if (distance < 300 && !this.endBoss.isDead() && this.gameIsRunning) {
            this.endBossAttacks();
        } else {
            this.chickenScreamSound.pause();
        }
    }

    endBossStartsMoving() {
        this.backgroundMusic.pause();
        this.chickenAttackSound.volume = 0.5;
        this.chickenAttackSound.play();
        this.endBoss.isChillin = false;
        this.endBoss.isAttacking = false;
        this.endBoss.isMoving = true;
        this.endBoss.speed = 0.15 + Math.random() * 20;;
        this.endBoss.enemyMove();
    }
    
    endBossAttacks() {
        this.chickenScreamSound.volume = 0.5;
        this.chickenScreamSound.play();
        this.endBoss.isChillin = false;
        this.endBoss.isMoving = false;
        this.endBoss.isAttacking = true;
        this.endBoss.speed = 0.5 + Math.random() * 20;;
        this.endBoss.enemyMove();
    }


    checkFullGoldBar() {
        if (this.goldBar.percentage == 100) {
            this.buyBottles();
        }
    }

    buyBottles() {
        if (this.keyboard.B) {
            this.bottlesBuyedSound.play();
            this.collectedBottles = 100;
            this.bottleBar.percentage = 100;
            this.collectedCoins = 0;
            this.goldBar.percentage = 0;
            this.bottleBar.setPercentage(this.collectedBottles);
            this.goldBar.setPercentage(this.goldBar.percentage);
        }
    }

    draw() {
        if (this.gameIsRunning && !this.gameOver) {
            this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
            this.ctx.translate(this.camera_x, 0); 
            this.addObjectsToMap(this.level.backgroundObjects)
            this.ctx.translate(-this.camera_x, 0); 
            this.addToMap(this.healthBar);
            this.addToMap(this.goldBar);
            this.addToMap(this.bottleBar);
            this.ctx.translate(this.camera_x, 0);
            this.addToMap(this.character);
            this.addObjectsToMap(this.level.enemies);
            this.addObjectsToMap(this.level.clouds);
            this.addObjectsToMap(this.level.coins);
            this.addObjectsToMap(this.level.bottles);
            this.addObjectsToMap(this.throwableObjects);
            this.ctx.translate(-this.camera_x, 0);
        }

        if (!this.gameIsRunning) {
            this.addToMap(this.start);
        }

        if (this.gameOver || this.gameWon) {
            this.addToMap(this.end);
            document.getElementById('restart').style.display = 'block';
        }

        if (this.gameWon) {
            this.addToMap(this.won);
        }
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


    addToMap(mo) {
        if (mo.otherDirection) { 
            this.ctx.save(); 
            this.ctx.translate(mo.width, 0); 
            this.ctx.scale(-1, 1); 
            mo.x = mo.x * -1;
        }
        mo.draw(this.ctx);
        if (mo.otherDirection) {
            mo.x = mo.x * -1;
            this.ctx.restore(); 
        }
    }

    // checking functions

    checkGameStarted() {
        let i = 0;
        window.addEventListener('keydown', () => {
            if (i < 1) {
                document.getElementById('press-key').classList.add('opacity-0');
                document.getElementById('press-key').classList.remove('pulsate');
                this.gameIsRunning = true;
                this.level.enemies.forEach((enemy) => {
                    enemy.animate();
                    i++;
                })
            }
        });
    }

    checkEnemies() {
        this.level.enemies.forEach((enemy) => {
            let fallIndex = this.character.y - this.lastYPositionOfCharacter; // this is < 0 when characetr is jumping up and > 0 when he is coming down
            if (this.character.isColliding(enemy) && !this.character.isAboveGround() && !enemy.isDead() && this.gameIsRunning) {
                this.characterHurt();
            } else {
                if (this.character.isColliding(enemy) && !enemy.isEndBoss() && fallIndex > 0 && this.gameIsRunning) {
                    this.chickenCrushedSound.volume = 0.3;
                    enemy.health = 0;
                    setTimeout(() => {
                        this.killChicken();
                    }, 250)
                }
            }
        })
    }

    killChicken() {
        this.level.enemies.forEach((enemy) => {
            if (enemy.health == 0) {
                this.level.enemies.splice(this.level.enemies.indexOf(enemy), 1);
                this.chickenCrushedSound.play();
            }
        })
    }

    characterHurt() {
        this.pepeHurtSound.volume = 0.3;
        this.pepeHurtSound.play();
        this.character.hit();
        this.healthBar.setPercentage(this.character.health)
    }

    checkBottles() {
        //check bottles
        this.level.bottles.forEach((bottle) => {
            if (this.character.isColliding(bottle) && this.collectedBottles < 100) {
                this.grabBottleSound.play();
                let bottleIndex = this.level.bottles.indexOf(bottle);
                this.collectedBottles += 20;
                console.log('flaschen gesammelt', this.collectedBottles)
                this.level.bottles.splice(bottleIndex, 1); // deleting the collected bottle from the array
                this.bottleBar.percentage = this.collectedBottles;
                this.bottleBar.setPercentage(this.collectedBottles)
            }
        })
    }

    checkCoins() {
        //check coins 
        this.level.coins.forEach((coin) => {
            if (this.character.isColliding(coin) && this.collectedCoins < 100) {
                this.coinSound.play();
                let coinIndex = this.level.coins.indexOf(coin);
                this.collectedCoins += 20;
                this.level.coins.splice(coinIndex, 1);
                this.goldBar.percentage = this.collectedCoins;
                this.goldBar.setPercentage(this.collectedCoins);
            }
        })
    }

    checkThrowables() {
        //check throwables
        this.throwableObjects.forEach((to) => {
            this.level.enemies.forEach((enemy) => {
                let enemyIndex = this.level.enemies.indexOf(enemy);
                let throwableIndex = this.throwableObjects.indexOf(to);
                if (enemy.isColliding(to) && enemy instanceof Chicken) {
                    this.bottleSound.play();
                    console.log('enemy health is', enemy.health);
                    enemy.health = 0;
                    console.log('enemy health is', enemy.health);
                    this.throwableObjects.splice(throwableIndex, 1);
                    setTimeout(() => {
                        this.level.enemies.splice(enemyIndex, 1);
                    }, 250)
                }
            })
        })
    }

    checkEndboss() {
        //check endboss 
        this.throwableObjects.forEach((to) => {
            this.level.enemies.forEach((enemy) => {
                let enemyIndex = this.level.enemies.indexOf(enemy);
                let throwableIndex = this.throwableObjects.indexOf(to);
                if (enemy.isColliding(to) && enemy instanceof Endboss && enemy.health > 0) {
                    console.log(enemy.health);
                    enemy.health -= 20;
                    this.throwableObjects.splice(throwableIndex, 1);
                    console.log(enemy.health);
                }
                if (enemy.health == 0) {
                    enemy.isMoving = false;
                    enemy.isChillin = false;
                    this.gameWon == true;
                    setTimeout(() => {
                        this.level.enemies.splice(enemyIndex, 1);
                    }, 1000)
                }
            })
        })
    }

    checkIfThrowed() {
        if (this.keyboard.D && this.collectedBottles > 0) {
            let bottle = new ThrowableObject(this.character.x + 120, this.character.y + 120, this.character.otherDirection); // new bottle is created
            this.throwSound.play();
            this.collectedBottles -= 20;
            this.bottleBar.setPercentage(this.collectedBottles);
            this.throwableObjects.push(bottle);
        }
    }
    checkIfKicked() {
        if (this.keyboard.C && this.collectedBottles > 0) {
            let bottle = new ThrowableObject(this.character.x + 120, this.character.y + 220, this.character.otherDirection); // new bottle is created
            this.collectedBottles -= 20;
            this.bottleBar.setPercentage(this.collectedBottles);
            this.throwableObjects.push(bottle);
        }
    }

}