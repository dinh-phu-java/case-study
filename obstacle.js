let spaceObstacle= function(img_src, x, y, width, height,stable) {
    this.stable=stable;
    spaceObj.apply(this, arguments); // kế thừa lớp spaceObj
    this.dropThrough = function () {
        this.y += (createGameBoard.baseSeed);
    };
    this.clearObstacle= function(){
        this.x= -100;
        this.y=-100;
    }
}