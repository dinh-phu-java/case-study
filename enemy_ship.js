let enemyShip = function(img_src,x,y,width,height){
    spaceObj.apply(this,arguments);
    this.randomMove= function(){
        this.rand_move=  Math.floor(Math.random()*(10)-10);
        this.rand_move_positive= Math.floor(Math.random()*(10));
        if(this.x < createGameBoard.canvas.width-50 && this.x > 10 && this.y < (createGameBoard.canvas.width/2)-150  && this.y> 10 ){
            if ( createGameBoard.objPerSecond % 150 == 0) { // khởi tạo obstackle

                    this.speedX = +(this.rand_move);
                    this.speedY = +(this.rand_move);
            }
            this.updatePos();
            console.log(this.speedY);
            console.log(this.speedX);
            console.log(createGameBoard.objPerSecond);
        }else{
            if(this.x>=createGameBoard.canvas.width-50){
                this.speedX = -this.rand_move_positive;
                //this.speedX = this.rand_move_positive;
            }
            if(this.x <= 10){
                this.speedX = +this.rand_move_positive;
                //this.speedX = this.rand_move_positive;
            }
            if(this.y >= (createGameBoard.canvas.width/2)-150){
                this.speedY = -this.rand_move_positive;

            }
            if(this.y <=10 ){
                this.speedY = this.rand_move_positive;

            }
            this.updatePos();
            console.log(this.speedY);
            console.log(this.speedX);
        }


    };

}