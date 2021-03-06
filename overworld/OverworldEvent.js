import { TextMessage } from "../text/TextMessage.js";

export class OverworldEvent {
    constructor(map, event){
        this.map = map;
        this.event = event;
    }

    stand(resolve){
        const who = this.map.gameObjects[this.event.who];
        who.startBehaviour( 
            { 
                map: this.map
            }, 
            {
                type: "stand",
                direction: this.event.direction,
                time: this.event.time
            }
        )

        const completeHandler = e => {
            
            if(e.detail.whoId === this.event.who){
                document.removeEventListener("PersonStandComplete", completeHandler);
                resolve();
            }
        }

        document.addEventListener("PersonStandComplete", completeHandler)
    }

    walk(resolve){
        const who = this.map.gameObjects[this.event.who];
        who.startBehaviour( 
            { 
                map: this.map
            }, 
            {
                type: "walk",
                direction: this.event.direction,
                retry: true
            }
        )

        const completeHandler = e => {
            
            if(e.detail.whoId === this.event.who){
                document.removeEventListener("PersonWalkingComplete", completeHandler);
                resolve();
            }
        }

        document.addEventListener("PersonWalkingComplete", completeHandler)
    }

    getInBed(resolve){
        const who = this.map.gameObjects[this.event.who];
        who.startBehaviour( 
            { 
                map: this.map
            }, 
            {
                type: "getInBed",
                direction: this.event.direction,
                coordinates: this.event.coordinates,
                bed: this.event.bed
            }
        )

        const completeHandler = e => {
            
            if(e.detail.whoId === this.event.who){
                document.removeEventListener("SoldierGetInBedComplete", completeHandler);
                resolve();
            }
        }

        document.addEventListener("SoldierGetInBedComplete", completeHandler)
    }

    textMessage(resolve){
        const message = new TextMessage({
            text: this.event.text,
            onComplete: () => resolve()
        })

        message.init(document.querySelector(".game-container"))
    }


    init() {
        return new Promise(resolve => {
            this[this.event.type](resolve)
        })
    }

}