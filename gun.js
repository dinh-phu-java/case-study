let gunObj= function(img_src,x,y,width,height){
    spaceObj.apply(this,arguments); // kế thừa lớp spaceObj
    this.gunThrough=function(){
        this.y-=(createGameBoard.baseSeed+4);
    }
};