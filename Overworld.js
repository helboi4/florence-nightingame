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

            // this.map.drawBackground(this.ctx);

            Object.values(this.map.gameObjects).forEach(object =>{
                object.update({
                    arrow: this.directionInput.direction,
                    map: this.map
                });
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
        console.log(this.map.walls)

        this.directionInput = new DirectionInput();
        this.directionInput.init();

        this.startGameLoop();

    }
}
