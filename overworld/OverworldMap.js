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
            utils.withGrid(14) - cameraPerson.x, 
            utils.withGrid(9) - cameraPerson.y
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
        imageSrc: "./images/maps/map.png",
        gameObjects: {
            hero: new Person({
                isPlayerControlled: true,
                x: utils.withGrid(5),
                y: utils.withGrid(6),
            }),
            npc1: new Person({
            x: utils.withGrid(7),
            y: utils.withGrid(9),
            src: "./images/characters/people/npc1.png",
            behaviourLoop: [
                {type: "walk", direction: "left"},
                {type: "stand", direction: "up", time: 800},
                {type: "walk", direction: "up"},
                {type: "walk", direction: "right"},
                {type: "walk", direction: "down"},
            ]
            }),
            npc2: new Person({
                x: utils.withGrid(3),
                y: utils.withGrid(7),
                src: "./images/characters/people/npc2.png",
                behaviourLoop: [
                    {type: "stand", direction: "left", time:800},
                    {type: "stand", direction: "up", time: 800},
                    {type: "stand", direction: "right", time:1200},
                    {type: "stand", direction: "left", time: 300},
                    {type: "stand", direction: "right", time: 600},

                ]
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