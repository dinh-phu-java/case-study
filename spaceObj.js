let spaceObj = function(img_src,x,y,width,height){
    this.width=width;
    this.height=height;
    this.x=x;
    this.y=y;
    this.speedX=0;
    this.speedY=0;
    this.img= new Image();  // tạo image
    this.img.src='img/'+img_src; // img là thư mục chứa ảnh
    this.createObj= function(){
        let ctx= createGameBoard.context;
        ctx.drawImage(this.img,this.x,this.y,this.width,this.height); // vẽ tàu
    }
    this.updatePos=function(){
        this.x +=this.speedX; // thay đổi vị trí x của tàu
        this.y +=this.speedY; //thay đổi vị trí y của tàu
    }
    this.move= function(){
        if(createGameBoard.keys && createGameBoard.keys[39]) {
            // console.log("chiều dài của canvas:"+ createGameBoard.canvas.width);
            if(this.x < createGameBoard.canvas.width-50){
                this.speedX = +(createGameBoard.baseSeed+createGameBoard.myShipSpeed);
            }
        } // di chuyển phải
        if(createGameBoard.keys && createGameBoard.keys[38]) {
            if(this.y > 380){
                this.speedY = -(createGameBoard.baseSeed+createGameBoard.myShipSpeed);
            }
        } // di chuyển lên
        if(createGameBoard.keys && createGameBoard.keys[40]) {
            if(this.y < 650){
                this.speedY = +(createGameBoard.baseSeed+createGameBoard.myShipSpeed);
            }
        }// di chuyển xuống
        if(createGameBoard.keys && createGameBoard.keys[37]) {

            if(this.x > 1){
                this.speedX = -(createGameBoard.baseSeed+createGameBoard.myShipSpeed);
            }
        }
    }
    this.collisionOtherObject=function(otherObject){
        let myLeft= this.x+10;
        let myRight= this.x+this.width-10;
        let myTop= this.y+20;
        let myBottom= this.y+this.height-16;
        let otherLeft = otherObject.x;
        let otherRight= otherObject.x+otherObject.width;
        let otherTop=otherObject.y;
        let otherBottom=otherObject.y+otherObject.height;
        let collision=false;
        if(myLeft > otherRight || myTop > otherBottom || myRight < otherLeft || myBottom  < otherTop){
            collision=true;
        }
        return collision;
    };
    this.clearObj= function(){
        this.x=0;
        this.y=0;
        this.width=0;
        this.height=0;
    }
}