class Start extends DrawableObject {

    IMAGE = ['img/9.Intro _ Outro Image/Start Screen/Opción 1.png'];
    
    constructor() {
        super().loadImage(this.IMAGE[0]);

        this.x = 0;
        this.y = 0;
        this.height = 480;
        this.width = 720;
    }
}