import { GameObject } from "./GameObject.js";
import {Sprite} from "./Sprite.js"

export class Stain extends GameObject {
    constructor(config){
        super(config)
        this.type = config.type || "blood";
        this.sprite = new Sprite({
            gameObject: this,
            src: config.src || `/images/effects/${this.type}/${this.type}.png`
        });
    }
}