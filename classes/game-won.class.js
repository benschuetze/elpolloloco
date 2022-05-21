class GameWon extends DrawableObject {

    IMAGE = ['img/9.Intro _ Outro Image/_Game over_ screen/3.Game over.png'];
    
    constructor() {
        super().loadImage(this.IMAGE[0]);

        this.x = 0;
        this.y = 0;
        this.height = 480;
        this.width = 720;
    }
}