import { GameObject } from "./GameObject.js";

export class Bed extends GameObject{

    constructor(config){
        super(config)

        this.isOccupied = false;
        this.quality = config.quality;

    }

}