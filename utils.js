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
        console.log(direction)
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
    }
}
