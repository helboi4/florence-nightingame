import { DirectionInput } from "../utils/DirectionInput.js";
import { GameObject } from "../gameObjects/GameObject.js";
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
            text: "November 1854 --- Arrival of Florence  Secretary of War, Sidney Herbert, sent for you and your team to come here, Florence. The hospital is in total disarray and there is only a dirty bucket of water for sanitisation. We're not sure a fragile lady nurse like yourself can manage, but, nonetheless, we're counting on you. "}
        ])

    }
}
