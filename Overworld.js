import { DirectionInput } from "./DirectionInput.js";
import { GameObject } from "./GameObject.js";
import { OverworldMap } from "./OverworldMap.js";

export class Overworld {
    constructor(config){
        this.element = config.element;
        this.canvas = this.element.querySelector(".game-canvas");
        this.ctx = this.canvas.getContext("2d");
        this.map = null;
        this.directionInput = null;
    }

    startGameLoop() {
        const step = () => {

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

            requestAnimationFrame(() => {
                step();
            })
        }
        step();
    }

    init(){

        this.map = new OverworldMap(window.OverworldMaps.Hospital);
        this.map.mountObjects()

        this.directionInput = new DirectionInput();
        this.directionInput.init();

        this.startGameLoop();

        this.map.startCutscene([
            {type:"textMessage", 
            text: "20th September 1854 \n The Battle Of Alma. \n The British forced the Russians to retreat with superior firepower, however there were 2,000 British fatalities. A lot of soldiers will be coming in today. We're counting on you Florence. "}
        ])

    }
}
