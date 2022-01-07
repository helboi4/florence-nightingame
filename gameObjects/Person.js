import { GameObject } from "./GameObject.js";
import { utils } from "../utils/utils.js";

export class Person extends GameObject {
    constructor(config){
        super(config);
        this.movingProgressRemaining = 0;
        //a queued stand behaviour
        this.isStanding = false;

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

            if( !state.map.isCutscenePlaying && this.isPlayerControlled && this.movingProgressRemaining === 0 && state.arrow) {
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
            if(state.map.isSpaceTaken(this.x, this.y, this.direction) === -1){

                behaviour.retry && setTimeout(() => {
                    this.startBehaviour(state, behaviour)
                }, 10);

                return;
            }
            //Walk if it is free
            state.map.moveWall(this.x, this.y, this.direction);
            this.movingProgressRemaining = 32;
            this.updateSprite(state)
        }

        if(behaviour.type === "stand"){
            this.isStanding = true;
            setTimeout(() => {
                utils.emitEvent("PersonStandComplete", {
                    whoId: this.id
                })
                this.isStanding = false;
            }, behaviour.time)
        }

        if(behaviour.type === "getInBed"){

            console.log(behaviour)

            setTimeout(() => {
                this.x = behaviour.coordinates[0] + 16;
                this.y = behaviour.coordinates[1];
                behaviour.bed.isOccupied = true;
                this.inBed = true;
            }, 400
            )
            
        }
    }

    updatePosition() {
        const [property, change] = this.directionUpdate[this.direction];
        this[property] += change;
        this.movingProgressRemaining -= 1;

        if(this.movingProgressRemaining === 0){
            //Announce that the walk is finished
            utils.emitEvent("PersonWalkingComplete", {
                whoId: this.id
            })
        }

    }

    updateSprite(state){

        if(this.movingProgressRemaining > 0){
            this.sprite.setAnimation("walk-"+this.direction);
            return;
        }
            this.sprite.setAnimation("idle-"+this.direction);
    }
}