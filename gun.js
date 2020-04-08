let gunObj= function(img_src,x,y,width,height){

    spaceObj.apply(this,arguments); // kế thừa lớp spaceObj
    this.gunThrough=function(){
        this.y-=(createGameBoard.baseSeed+12);
    };
    this.clearGun= function(){
        this.x= -100;
        this.y=-100;
        this.width=0;
        this.height=0;
    };
    this.gunDown=function(enemyObj){
        this.y += (createGameBoard.baseSeed+createGameBoard.gameLevel+2);
        if(this.y >= createGameBoard.canvas.height){
            this.y = enemyObj.y;
            this.x= enemyObj.x;
        }
    }
};