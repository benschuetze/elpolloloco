let canvas;
let world;
let keyboard = new Keyboard();

function init() {
    document.getElementById('restart').style.display = 'none';
    canvas = document.getElementById('canvas');
    world = new World(canvas, keyboard);
}

function restart() {
    location.reload();
}

function hideButton() {
    document.getElementById('restart').style.display = 'none';
}



window.addEventListener('keydown', (event) => {
    if (event.keyCode == 39) {
        keyboard.RIGHT = true;
    }
    if (event.keyCode == 37) {
        keyboard.LEFT = true;
    }
    if (event.keyCode == 38) {
        keyboard.UP = true;
    }
    if (event.keyCode == 40) {
        keyboard.DOWN = true;
    }
    if (event.keyCode == 32) {
        keyboard.SPACE = true;
    }
    if (event.keyCode == 68) {
        keyboard.D = true;
    }
    if (event.keyCode == 67) {
        keyboard.C = true;
    }
    if (event.keyCode == 66) {
        keyboard.B = true;
    }
});

window.addEventListener('keyup', (event) => {
    if (event.keyCode == 39) {
        keyboard.RIGHT = false;
    }
    if (event.keyCode == 37) {
        keyboard.LEFT = false;
    }
    if (event.keyCode == 38) {
        keyboard.UP = false;
    }
    if (event.keyCode == 40) {
        keyboard.DOWN = false;
    }
    if (event.keyCode == 32) {
        keyboard.SPACE = false;
    }

    if (event.keyCode == 68) {
        keyboard.D = false;
    }
    if (event.keyCode == 67) {
        keyboard.C = false;
    }
    if (event.keyCode == 66) {
        keyboard.B = false;
    }
});