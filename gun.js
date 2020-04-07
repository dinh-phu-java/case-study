let gunObj= function(img_src,x,y,width,height){
    spaceObj.apply(this,arguments); // kế thừa lớp spaceObj
    this.gunThrough=function(){
        this.y-=(createGameBoard.baseSeed+4);
    };
    this.clearGun= function(){
        this.x= -100;
        this.y=-100;
    }
};