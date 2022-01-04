import { GameObject } from "./GameObject.js";
import { utils } from "./utils.js";
import { Person } from "./Person.js";

export class OverworldMap {
    constructor(config){
        this.gameObjects = config.gameObjects;
        this.image = new Image();
        this.image.src = config.imageSrc;
    }

    drawBackground(ctx){
        ctx.drawImage(this.image, 0, 0)
    }
}

window.OverworldMaps = {
    Hospital: {
        imageSrc: "./images/maps/wood.jpeg",
        gameObjects: {
            hero: new Person({
                isPlayerControlled: true,
                x: utils.withGrid(5),
                y: utils.withGrid(6),
            }),
            // npc1: new Person({
            // x: utils.withGrid(7),
            // y: utils.withGrid(9),
            // src: "./images/characters/people/npc1.png"
            // })
        }
    }
}