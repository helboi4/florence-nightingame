import { Sprite } from "./Sprite.js";
import { OverworldEvent } from "../overworld/OverworldEvent.js";

export class GameObject {

    constructor(config){
        this.id = null;
        this.isMounted = false;
        this.x = config.x || 0;
        this.y = config.y || 0;
        this.direction = config.direction || "down";
        this.sprite = new Sprite({
            gameObject: this,
            src: config.src || "/images/characters/people/hero.png"
        });

        this.behaviourLoop = config.behaviourLoop || [];
        this.behaviourLoopIndex = 0;
    }

    mount(map){
        this.isMounted = true;
        map.addWall(this.x, this.y)

        //If we have a behaviour loop, kick off after short delay

        setTimeout(() =>{
            this.doBehaviourEvent(map);
        }, 10)

    }

    update(){

    }

    async doBehaviourEvent(map){

        //Don't loop if cutscene is happening or there is no loop
        if(map.isCutscenePlaying || this.behaviourLoop.length === 0 || this.isStanding){
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