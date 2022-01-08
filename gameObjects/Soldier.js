import { Sprite } from "./Sprite.js";
import {Person} from "./Person.js"
import { OverworldEvent } from "../overworld/OverworldEvent.js";
import { Stain } from "./Stain.js";

export class Soldier extends Person {
    constructor(config){
        super(config)
        
        this.condition = config.condition|| "invalid"; //there should be healthy, impatient, bleeding, invalid, infected and vomiting
        this.sprite = new Sprite({
            gameObject: this,
            src: config.src || `/images/characters/soldiers/${this.condition}.png`
        });
        this.inBed = false;
        this.behaviourLoop = [];
        this.queuingTimeRemaining = 1000;
        this.isDead = false;
        this.healingTimeRemaining = 60000;
        this.bed = null;
    }

    update(state){
        super.update(state)
        this.queuingTimeRemaining-=1;
        this.doBehaviourEvent(state.map);
        if(this.inBed){
            this.healingTimeRemaining -=1;
            // if(this.condition === "bleeding"){
            //     this.spreadInfection(state.map, "blood")
            // }
            // if(this.condition === "vomiting"){
            //     this.spreadInfection(state.map, "vomit")
            // }
        }
        if(this.healingTimeRemaining <= 0){
            this.isCured(state.map);
        }
    }

    async findBed(beds, map){
        //assigns a behaviour loop array based on AI logic
        if(!this.inBed){
            const unoccupiedBeds = beds.filter(bed => {
                    return bed.isOccupied === false;
            })

            if(unoccupiedBeds.length > 0){
                let targetBed = null;

                const sortedBeds = unoccupiedBeds.sort((a, b) => a.quality - b.quality)

                targetBed = sortedBeds[0]
                this.bed = targetBed;

                this.behaviourLoop = [{type: "getInBed", direction: "down", coordinates: [targetBed.x, targetBed.y], bed: targetBed}];
            
                //{type: "walk", direction: "right"}, {type: "walk", direction: "right"}, {type: "walk", direction: "right"}, {type: "walk", direction: "right"}, {type: "walk", direction: "down"}, {type: "walk", direction: "down"}, {type: "walk", direction: "down"}, 
            }
            else if(this.queuingTimeRemaining > 0){
                setTimeout(()=>{
                    this.findBed(beds, map);
                },400)
            }else if (this.queuingTimeRemaining <= 0 && !this.isDead){
                this.passAway(map);
            }
            else if(this.isDead){
                setTimeout(() => {this.die(map)}, 800) 
            }
        }

    }

    proceedInQueue(map){
        if(map.isSpaceTaken(this.x, this.y, "right") === 0){
            this.behaviourLoop = [{type: "walk", direction: "right"}, {type: "stand", time: this.queuingTimeRemaining}]
        }

    }

    spreadInfection(map, infectionType){
        let x = this.x + 32;
        let y = this.y;
        let previousStain = false;

        while(!previousStain){
            previousStain = this.checkForStain(x, y, map)
            if(!previousStain){
                if(y > this.y - 64){
                    y = this.y - 32
                }else{
                    y = this.y;
                    x = this.x - 32;
                }
            }
        }

        let stain = new Stain({
            type: infectionType,
            id : `${x},${y}`,
            x: x,
            y: y,
        })

        map.stains[`${x},${y}`] = stain;
    }

    checkForStain(x, y, map){
        if(`${x},${y}` in map.stains){
            return true;
        }else{
            return false;
        }
    }

    passAway(map){
        this.sprite.image.src = "/images/characters/soldiers/dead-ghost.png"
        this.isDead = true;
    }

    die(map){
        this.unmount(map);
        map.deaths++;
        delete map.gameObjects[`${this.id}`];
    }
    
    isCured(map){
        map.cures++;
        //TODO: change sprite
        //TODO: play music
        setTimeout(() => {
            this.bed.isOccupied = false;
            this.unmount(map);
            delete map.gameObjects[`${this.id}`];
        }, 800)
    }

    init(){
        
    }

}