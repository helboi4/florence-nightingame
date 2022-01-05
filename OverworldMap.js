import { GameObject } from "./GameObject.js";
import { utils } from "./utils.js";
import { Person } from "./Person.js";

export class OverworldMap {
    constructor(config){
        this.gameObjects = config.gameObjects;
        this.walls = config.walls || {};
        this.image = new Image();
        this.image.src = config.imageSrc;
    }

    drawBackground(ctx){
        ctx.drawImage(this.image, 0, 0)
    }

    isSpaceTaken(currentX, currentY, direction){
        const {x,y} = utils.nextPosition(currentX, currentY, direction);
        return this.walls[`${x},${y}`] || false;
    }

    mountObjects() {
        Object.values(this.gameObjects).forEach (o => {
            //TODO: determine if object should mount
            o.mount(this)
        })
    }

    addWall(x, y){
        this.walls[`${x},${y}`] = true;
    }

    removeWall(x,y){
        delete this.walls[`${x},${y}`]
    }

    moveWall(wasX, wasY, direction){
        this.removeWall(wasX, wasY);
        const {x,y} = utils.nextPosition(wasX, wasY, direction);
        this.addWall(x,y);
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
            npc1: new Person({
            x: utils.withGrid(7),
            y: utils.withGrid(9),
            src: "./images/characters/people/npc1.png"
            }),
            box: new GameObject({
                x: utils.withGrid(12),
                y: utils.withGrid(4),
                src: "./images/characters/box.png"
            })
        },
        walls : {
            [utils.asGridCoord(12,4)] : true,
        }
    }
}