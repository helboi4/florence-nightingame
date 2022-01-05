import { Sprite } from "./Sprite.js";

export class Person extends GameObject {
    constructor(config){
        super(config)
        
        this.condition = config.condition|| "normal"; //there should be normal, impatient, bleeding, coughing, infected and vomiting
        this.sprite = new Sprite({
            gameObject: this,
            src: `/images/characters/soldiers/${this.condition}`
        });
        this.waitingTimeRemaining = 60000;
        this.inBed = false;
        this.illnessTimeRemaining = 120000;
    }

    findBed(){

    }

    spreadInfection(){
        //logic for how the bleeding, coughing and vomiting will leave infectious muck everywhere
    }

    init(){
        
    }

}