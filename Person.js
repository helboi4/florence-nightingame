import { GameObject } from "./GameObject.js";

export class Person extends GameObject {
    constructor(config){
        super(config);
        this.movingProgressRemaining = 0;

        this.isPlayerControlled = config.isPlayerControlled || false;

        this.directionUpdate = {
            "up": ["y", -1],
            "down": ["y", 1],
            "left": ["x", -1],
            "right": ["x", 1],
        }
    }

    update(state){
        if (this.movingProgressRemaining > 0){
            this.updatePosition();
        }else{

            if( this.isPlayerControlled && this.movingProgressRemaining === 0 && state.arrow) {
                this.startBehaviour(state, {
                    type: "walk",
                    direction: state.arrow,
                })
            }
            this.updateSprite(state);
        }
    }

    startBehaviour(state, behaviour){
        this.direction = behaviour.direction;
        if(behaviour.type === "walk"){
            //Stop if space is not free
            if(state.map.isSpaceTaken(this.x, this.y, this.direction)){
                return;
            }
            //Walk if it is free
            state.map.moveWall(this.x, this.y, this.direction);
            this.movingProgressRemaining = 32;
        }
    }

    updatePosition() {
        const [property, change] = this.directionUpdate[this.direction];
        this[property] += change;
        this.movingProgressRemaining -= 1;

    }

    updateSprite(state){

        if(this.movingProgressRemaining > 0){
            this.sprite.setAnimation("walk-"+this.direction);
            return;
        }
            this.sprite.setAnimation("idle-"+this.direction);
    }
}