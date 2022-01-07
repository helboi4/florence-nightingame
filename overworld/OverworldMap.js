import { GameObject } from "../gameObjects/GameObject.js";
import { utils } from "../utils/utils.js";
import { Person } from "../gameObjects/Person.js";
import { OverworldEvent } from "./OverworldEvent.js";

export class OverworldMap {
    constructor(config){
        this.gameObjects = config.gameObjects;
        this.walls = config.walls || {};
        this.image = new Image();
        this.image.src = config.imageSrc;
        this.isCutscenePlaying = false;
    }

    drawBackground(ctx, cameraPerson){
        ctx.drawImage(
            this.image, 
            utils.mapPlacement(7) - cameraPerson.x, 
            utils.mapPlacement(4.5) - cameraPerson.y
        )
    }

    isSpaceTaken(currentX, currentY, direction){
        const {x,y} = utils.nextPosition(currentX, currentY, direction);
        return this.walls[`${x},${y}`] || false;
    }

    mountObjects() {
        Object.keys(this.gameObjects).forEach (key => {
            
            let object = this.gameObjects[key]
            object.id = key;

            //TODO: determine if object should mount
            object.mount(this)
        })
    }

    async startCutscene(events){
        this.isCutscenePlaying = true;

        //Start a loop of async events
        for(let i = 0; i < events.length; i++){
            const eventHandler = new OverworldEvent(this, events[i] )
            await eventHandler.init();
        }
        //await each one

        this.isCutscenePlaying = false;

        //Reset NPCs to do their idle behaviour
        Object.values(this.gameObjects).forEach(object =>{
            object.doBehaviourEvent(this)
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
        imageSrc: "./images/maps/background-grid.png",
        gameObjects: {
            hero: new Person({
                isPlayerControlled: true,
                x: utils.withGridX(5),
                y: utils.withGridY(6),
            }),
            box: new GameObject({
                x: utils.withGridX(12),
                y: utils.withGridY(4),
                src: "./images/characters/box.png"
            })
        },
        walls : {
            [utils.asGridCoord(12,4)] : true,
        }
    }
}