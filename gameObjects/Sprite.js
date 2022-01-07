import { utils } from "../utils/utils.js";

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
            "idle-down": [[0,0]],
            "idle-right": [[0,0]],
            "idle-up": [[0,0]],
            "idle-left": [[0,0]],
            "walk-down": [[0,0]],
            "walk-right": [[0,0]],
            "walk-up": [[0,0]],
            "walk-left": [[0,0]]
        }

        this.currentAnimation = config.currentAnimation || "idle-down";
        this.currentAnimationFrame = 0;

        this.animationFrameLimit = config.animationFrameLimit || 8;
        this.animationFrameProgress = this.animationFrameLimit;

        //Reference the game object
        this.gameObject = config.gameObject;
        this.noSheet = config.noSheet;
    }

    get frame() {
        return this.animations[this.currentAnimation][this.currentAnimationFrame]
    }

    setAnimation(key) {
        if (this.currentAnimation !== key){
            this.currentAnimation = key;
            this.currentAnimationFrame = 0;
            this.animationFrameProgress = this.animationFrameLimit;
        }
    }

    updateAnimationProgress() {
        //Downtick frame progress
        if(this.animationFrameProgress > 0){
            this.animationFrameProgress -=1;
            return;
        }

        //Reset if reaches 0
        this.animationFrameProgress = this.animationFrameLimit;
        this.currentAnimationFrame += 1;

        if(this.frame === undefined){
            this.currentAnimationFrame = 0;
        }

    }

    draw(ctx, cameraPerson){
        const x = this.gameObject.x + 30 +  utils.withGridX(7) - cameraPerson.x;
        const y = this.gameObject.y  - 64 + utils.withGridY(4.5) - cameraPerson.y;

        if(this.noSheet){
            this.isLoaded && ctx.drawImage(this.image,
            0,0,
            121, 174,
            x - 5,y - 16,
            85,
            128)
        } else{

            const[frameX, frameY] = this.frame;

            this.isLoaded && ctx.drawImage(this.image,
                frameX * 60,frameY * 120,
                60, 120,
                x,y,
                50,
                90)

            this.updateAnimationProgress();
        }
    }

}