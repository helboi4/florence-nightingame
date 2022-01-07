import { Bed } from "../gameObjects/Bed.js";
import { utils } from "../utils/utils.js";

export class BedService{
    constructor(config){
    }

    populateBeds(){
        
        let bedY = utils.withGridY(3);

        const beds = {};
        let bedsInRow = 3;

        //y axis of beds
        for(let i = 0; i < 5; i++){

            let bedX = utils.withGridX(0);
            

            for(let j = 0; j < bedsInRow; j++){
                let bed = new Bed({
                x: bedX,
                y: bedY,
                src: "/images/furniture/bed-low.png",
                isBed: true,
                quality: 0
                })

                beds[`bed${j}${i}`] = bed;

                bedX += 128;
            }
            
            bedY += 128;
            if(i === 0){
                bedsInRow += 1
            }
            if(i === 1){
                bedsInRow += 3;
            }

        }

        return beds;
    }


}