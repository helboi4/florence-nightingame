import { Overworld } from "./overworld/Overworld.js";

(function(){
    console.log("running")

    const overworld = new Overworld({
        element: document.querySelector(".game-container")
    })

    overworld.init();

}())