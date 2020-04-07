let gunObj= function(img_src,x,y,width,height){
    spaceObj.apply(this,arguments); // kế thừa lớp spaceObj
    this.gunThrough=function(){
        this.y-=(createGameBoard.baseSeed+12);
    };
    this.clearGun= function(){
        this.x= -100;
        this.y=-100;
    };
    this.gunDown=function(){

        this.y += ((createGameBoard.baseSeed));
    }
};