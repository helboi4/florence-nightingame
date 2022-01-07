import { Sprite } from "./Sprite.js";
import {Person} from "./Person.js"

export class Soldier extends Person {
    constructor(config){
        super(config)
        
        this.condition = config.condition|| "invalid"; //there should be healthy, impatient, bleeding, invalid, infected and vomiting
        this.sprite = new Sprite({
            gameObject: this,
            src: `/images/characters/soldiers/${this.condition}.png`
        });
        this.inBed = false;
        this.behaviourLoop = [] //this.findBed() || [];
    }

    findBed(beds){
        //returns a behaviour loop array based on AI logic
        const unoccupiedBeds = beds.filter(bed => {
            bed.isOccupied = false;
        })

        let targetBed = null;

        const sortedBeds = unoccupiedBeds.sort((a, b) => a.quality - b.price)

        targetBed = sortedBeds[0]

        //TODO: Start a behaviour where the soldier moves into the room

        this.x = targetBed.x;
        this.y = targetBed.y;
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