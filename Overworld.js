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

        // this.map.startCutscene([
        //     {who: "hero", type: "walk", direction: "down"},
        //     {who:"hero", type: "walk", direction: "down"},
        //     {who: "hero", type: "walk", direction: "right"},
        //     {who: "npc1", type: "walk", direction: "up"},
        //     {who: "npc1", type: "stand", direction: "left"}
        // ])

    }
}
