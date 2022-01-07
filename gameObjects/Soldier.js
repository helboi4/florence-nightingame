import { Sprite } from "./Sprite.js";
import {Person} from "./Person.js"
import { OverworldEvent } from "../overworld/OverworldEvent.js";

export class Soldier extends Person {
    constructor(config){
        super(config)
        
        this.condition = config.condition|| "invalid"; //there should be healthy, impatient, bleeding, invalid, infected and vomiting
        this.sprite = new Sprite({
            gameObject: this,
            src: `/images/characters/soldiers/${this.condition}.png`
        });
        this.inBed = false;
        this.behaviourLoop = [];
    }

    async findBed(beds, soldierMap){
        //returns a behaviour loop array based on AI logic
        if(!this.inBed){
            const unoccupiedBeds = beds.filter(bed => {
                    return bed.isOccupied === false;
            })

            let targetBed = null;

            const sortedBeds = unoccupiedBeds.sort((a, b) => a.quality - b.price)

            targetBed = sortedBeds[0]

            this.behaviourLoop = [{type: "walk", direction: "right"}, {type: "walk", direction: "right"}, {type: "walk", direction: "right"}, {type: "walk", direction: "right"}, {type: "walk", direction: "down"}, {type: "walk", direction: "down"}, {type: "walk", direction: "down"}, {type: "getInBed", direction: "down", coordinates: [targetBed.x, targetBed.y], bed: targetBed}];
        

            
        }

    }

    proceedInQueue(){
        //TODO: make soldier check if they can move forward in queue and then move when possible

    }

    spreadInfection(){
        //logic for how the bleeding, coughing and vomiting will leave infectious muck everywhere
    }

    init(){
        
    }

}