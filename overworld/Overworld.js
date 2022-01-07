import { DirectionInput } from "../utils/DirectionInput.js";
import { GameObject } from "../gameObjects/GameObject.js";
import { OverworldMap } from "./OverworldMap.js";
import {SoldierService} from "./SoldierService.js"
import { BedService } from "./BedService.js";

export class Overworld {
    constructor(config){
        this.element = config.element;
        this.canvas = this.element.querySelector(".game-canvas");
        this.ctx = this.canvas.getContext("2d");
        this.map = null;
        this.directionInput = null;
        this.dayType = "calm"
    }

    startGameLoop() {

        let soldierSpawnInterval = 0;

        const soldierService = new SoldierService({
            map: this.map,
            dayType: this.dayType
        })
        //add initial soldiers to map to be drawn
        const initialSoldiers = soldierService.spawnInitialSoldiers();
        console.log(initialSoldiers["soldier0"].constructor.name)

        this.map.gameObjects = Object.assign(this.map.gameObjects, initialSoldiers);
        console.log(this.map.gameObjects)

        const beds = Object.values(this.map.gameObjects).filter(object =>{
            return object.isBed === true;
        }
        )

        this.map.mountObjects()

         

        const step = (soldierSpawnInterval) => {

            //calculate current queue of soldiers
            let soldierQueue = Object.values(this.map.gameObjects).filter(object => {
                return object.constructor.name === "Soldier" && !object.inBed;
            })

            //last soldier in queue finds bed
            if(!this.map.isCutscenePlaying){
                soldierQueue.pop().findBed(beds, this.map)
            }

            this.ctx.clearRect(0,0, this.canvas.width, this.canvas.height)


            //Establish camera person here
            const cameraPerson = this.map.gameObjects.hero;

            //Update all objects
             Object.values(this.map.gameObjects).forEach(object =>{
                    object.update({
                        arrow: this.directionInput.direction,
                        map: this.map
                    });
            });

            //Draw background
            this.map.drawBackground(this.ctx, cameraPerson);

            //Draw game objects
            Object.values(this.map.gameObjects).sort((a,b) =>{
                return a.y - b.y;
            }).forEach(object => {
                object.sprite.draw(this.ctx, cameraPerson);
            })

            

            soldierSpawnInterval++;

            // if(soldierSpawnInterval === 100){
            //     SoldierService.spawnNewSoldier();
            //     soldierSpawnInterval = 0;
            // }

            requestAnimationFrame(() => {
                step(soldierSpawnInterval);
            })

            
        }
        step(soldierSpawnInterval);
    }

    init(){

        this.map = new OverworldMap(window.OverworldMaps.Hospital);


        this.directionInput = new DirectionInput();
        this.directionInput.init();

        const bedService = new BedService();
        const beds = bedService.populateBeds();

        this.map.gameObjects = Object.assign(this.map.gameObjects, beds)
        console.log(this.map.gameObjects)
        console.log(this.map.gameObjects["bed01"])

        this.startGameLoop();

        this.map.startCutscene([
            {type:"textMessage", 
            text: "November 1854 --- Arrival of Florence  Secretary of War, Sidney Herbert, sent for you and your team to come here, Florence. The hospital is in total disarray and there is only a dirty bucket of water for sanitisation. We're not sure a fragile lady nurse like yourself can manage, but, nonetheless, we're counting on you. "}
        ])

    }
}
