let spaceObstacle= function(img_src, x, y, width, height,stable) {
    this.stable=stable;
    spaceObj.apply(this, arguments); // kế thừa lớp spaceObj
    this.dropThrough = function () {
        this.y += (createGameBoard.baseSeed+createGameBoard.gameLevel);
    };
    this.clearObstacle= function(){
        this.x= -1000;
        this.y=-1000;
        this.width=0;
        this.height=0;
    }
}