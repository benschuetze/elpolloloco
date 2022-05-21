class GameOver extends DrawableObject {

    IMAGE = ['img/9.Intro _ Outro Image/_Game over_ screen/2.oh no you lost!.png'];
    
    constructor() {
        super().loadImage(this.IMAGE[0]);

        this.x = 0;
        this.y = 0;
        this.height = 480;
        this.width = 720;
    }
}