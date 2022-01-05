export const utils = {
    withGrid(n) {
        return n * 32;
    },

    asGridCoord(x,y){
        return `${x*32},${y*32}`
    },

    nextPosition(initialX, initialY, direction){
        let x = initialX;
        let y = initialY;
        const size = 32;
        if (direction === "left"){
            x-=size;
        }
        if(direction === "right"){
            x += size;
        }
        if(direction === "up"){
            y-=size;
        }
        if(direction === "down"){
            y+=size;
        }
        return {x,y};
    },

    emitEvent(name, detail ){
        const event = new CustomEvent(name, {
            detail
        });
        document.dispatchEvent(event);
    },

    oppositeDirection(direction){
        if(direction === "left"){return "right"};
        if(direction === "right"){return "left"};
        if(direction === "up"){return "down"};
        return "up";
    }
}
