import { GameObject } from "./GameObject.js";

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
            hero: new GameObject({
                x: 5,
                y: 6,
            }),
            npc1: new GameObject({
            x: 7,
            y: 9,
            src: "./images/characters/people/npc1.png"
            })
        }
    }
}