export class Sprite{
    
    constructor(config){

        //set up the image
        this.image = new Image();
        this.image.src = config.src;
        this.image.onload = () => {
            this.isLoaded = true;
        }

        //configuring animation an inital state
        this.animations = config.animations || {
            idleDown: [
                [0,0]
            ]
        }

        this.currentAnimation = config.currentAnimation || "idleDown";
        this.currentAnimationFrame = 0;

        //Reference the game object
        this.gameObject = config.gameObject;
    }

    draw(ctx){
        const x = this.gameObject.x * 32 - 16;
        const y = this.gameObject.y * 32 - 36;

        this.isLoaded && ctx.drawImage(this.image,
            0,0,
            32, 32,
            x,y,
            64,
            64)
    }
}