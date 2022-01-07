import {Soldier} from "../gameObjects/Soldier.js"
import {utils} from "../utils/utils.js"

export class SoldierService {
    constructor(config){
        this.map = config.map;
        this.dayType = config.dayType || "calm";
        this.startingConditions = ["bleeding", "invalid", "sick"]

    }

    //spawn soldiers at beginning of game loop
    spawnInitialSoldiers(){

        const soldiers = {};
    
        if(this.dayType === "calm"){

            let newX = utils.withGridX(0);
            let newY = utils.withGridY(-2);

            for(let i = 0; i < 5; i++){

                let conditionIndex = Math.floor(Math.random() * this.startingConditions.length);
                let newCondition = this.startingConditions[conditionIndex];

                let soldier = new Soldier({
                    isMounted: false,
                    x: newX,
                    y: newY,
                    direction: "down",
                    condition: newCondition,
                })

                soldiers[`soldier${i}`] = soldier;

                newX = newX + 64;
            }
        }

        if(this.dayType === "battle"){

            let newX = utils.withGrid(0);
            let newY = utils.withGrid(1);

            for(let i = 0; i < 4; i++){
                

                let newCondition = "bleeding";

                let soldier = new Soldier({
                    isMounted: false,
                    x: newX,
                    y: newY,
                    direction: "down",
                    condition: newCondition,
                })

                soldiers[`soldier${i}`] = soldier;

                newX = newX + 64;
            }

            for(let i = 4; i < 9; i++){

                let conditionIndex = Math.floor(Math.random() * this.startingConditions.length);
                let newCondition = this.startingConditions[conditionIndex];

                let soldier = new Soldier({
                    isMounted: false,
                    x: newX,
                    y: newY,
                    direction: "down",
                    condition: newCondition,
                })

                soldiers[`soldier${i}`] = soldier;

                newX = newX + 64;
            }
        }

        if(this.dayType === "outbreak"){

            let newX = utils.withGrid(0);
            let newY = utils.withGrid(1);

            for(let i = 0; i < 5; i++){

                let newCondition = "sick";

                let soldier = new Soldier({
                    isMounted: false,
                    x: newX,
                    y: newY,
                    direction: "down",
                    condition: newCondition,
                })

                soldiers[`soldier${i}`] = soldier;

                newX = newX + 64;
            }

            for(let i = 5; i < 9; i++){

                let conditionIndex = Math.floor(Math.random() * this.startingConditions.length);
                let newCondition = this.startingConditions[conditionIndex];

                let soldier = new Soldier({
                    isMounted: false,
                    x: newX,
                    y: newY,
                    direction: "down",
                    condition: newCondition,
                })

                soldiers[`soldier${i}`] = soldier;

                newX = newX + 64;
            }

        }

        return soldiers;
        //We have created an object full of soldiers which we then need to add to the map in Overworld.
    }
    

}