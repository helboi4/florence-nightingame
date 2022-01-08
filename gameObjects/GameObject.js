import { Sprite } from "./Sprite.js";
import { OverworldEvent } from "../overworld/OverworldEvent.js";

export class GameObject {

    constructor(config){
        this.id = config.id || null;
        this.isMounted = false;
        this.x = config.x || 0;
        this.y = config.y || 0;
        this.direction = config.direction || "down";
        
        this.behaviourLoop = config.behaviourLoop || [];
        this.behaviourLoopIndex = 0;
        this.isBed = config.isBed || false;

        this.sprite = new Sprite({
            gameObject: this,
            src: config.src || "/images/characters/people/hero.png",
            noSheet: this.isBed
        });

        
    }

    mount(map){
        this.isMounted = true;
        map.addWall(this.x, this.y)

        //If we have a behaviour loop, kick off after short delay

        setTimeout(() =>{
            this.doBehaviourEvent(map);
        }, 10)

    }

    unmount(map){
        this.isMounted = false;
        map.removeWall(this.x, this.y)
    }

    update(){

    }

    async doBehaviourEvent(map){

        //Don't loop if cutscene is happening or there is no loop
        if(map.isCutscenePlaying || this.behaviourLoop.length === 0 || this.isStanding || this.inBed){
            return;
        }

        let eventConfig = this.behaviourLoop[this.behaviourLoopIndex];
        eventConfig.who = this.id;

        //Create an event instance out of our next config
        const eventHandler = new OverworldEvent(map, eventConfig)
        await eventHandler.init();

        //Setting up the next in the loop event to fire
        this.behaviourLoopIndex += 1;
        if(this.behaviourLoopIndex === this.behaviourLoop.length){
            this.behaviourLoopIndex = 0;
        }

        //Next iteration of the loop

        this.doBehaviourEvent(map)

    }

}