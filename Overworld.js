import { GameObject } from "./GameObject.js";
import { OverworldMap } from "./OverworldMap.js";

export class Overworld {
    constructor(config){
        this.element = config.element;
        this.canvas = this.element.querySelector(".game-canvas");
        this.ctx = this.canvas.getContext("2d");
        this.map = null;
    }

    startGameLoop() {
        const step = () => {

            this.ctx.clearRect(0,0, this.canvas.width, this.canvas.height)

            this.map.drawBackground(this.ctx);

            Object.values(this.map.gameObjects).forEach(object =>{
                object.sprite.draw(this.ctx);
            })

            requestAnimationFrame(() => {
                step();
            })
        }
        step();
    }

    init(){

        this.map = new OverworldMap(window.OverworldMaps.Hospital);
        console.log(this.map)

        this.startGameLoop();

    }
}
