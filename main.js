

let createGameBoard= {
    canvas: document.createElement("canvas"),
    makeCanvas(){
        this.canvas.width=960;  // canvas width
        this.canvas.height=700; // canvas height
        this.mid_screen=createGameBoard.canvas.width/2-50;  //đặt vị trí của tàu cố định dưới màn hình
        this.bottom_screen=createGameBoard.canvas.height-70; //đặt vị trí của tàu cố định dưới màn hình
        this.context=this.canvas.getContext("2d");// context 2d
        document.body.appendChild(this.canvas); // gắn vào body
        this.interval= setInterval(updateProgram,20);  // set time out update cho screen;

        window.addEventListener('keydown',function(ev){
            createGameBoard.keys= (createGameBoard.keys || []); // thiết lập mảng cho event bàn phím
            createGameBoard.keys[ev.keyCode] = true;

        }); // event keydown
        window.addEventListener('keyup',function(ev){
            createGameBoard.keys = (createGameBoard.keys || []);
            createGameBoard.keys[ev.keyCode] =false;
        }); // reset keyup event

    },
    clearCanvas(){
        this.context.clearRect(0,0,this.canvas.width,this.canvas.height);
    }
}

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


}

let myShip; // myShip

function startProgram(){

    createGameBoard.makeCanvas(); // tạo canvas
    myShip = new spaceObj('spaceship.png',createGameBoard.mid_screen,createGameBoard.bottom_screen,50,50); // khởi tạo đối tượng tàu
    myShip.createObj(); // vẽ tàu

}

function updateProgram(){
    myShip.speedX=0;  // đặt speedx =0
    myShip.speedY =0;  // đặt speedy =0
    if(createGameBoard.keys && createGameBoard.keys[39]) {myShip.speedX = +1;} // di phai
     if(createGameBoard.keys && createGameBoard.keys[38]) {myShip.speedY = -1;} // di tren
     if(createGameBoard.keys && createGameBoard.keys[40]) {myShip.speedY = +1;}// di duoi
     if(createGameBoard.keys && createGameBoard.keys[37]) {myShip.speedX = -1;}// di trai
    createGameBoard.clearCanvas(); // xóa image cũ để update image mới
    myShip.updatePos(); // tạo vị trí mới cho tàu
    myShip.createObj();  // vẽ lại tàu

}




window.onload=startProgram();
//
// let mid_screen=createGameBoard.canvas.width/2-50;  //đặt vị trí của tàu cố định dưới màn hình
// let bottom_screen=createGameBoard.canvas.height-70; //đặt vị trí của tàu cố định dưới màn hình
// myShip = new Ship('spaceship.png',mid_screen,bottom_screen,50,50); // khởi tạo đối tượng tàu
// myShip.createShip(); // vẽ tàu
// window.addEventListener('keydown',function(ev){
//     console.log("access out ");
//     myShip.speedX = 0;
//     myShip.speedY = 0;
//    // console.log(myShip);
//     if(createGameBoard.keys && createGameBoard.keys[39]) {myShip.speedX = +1;}
//     if(createGameBoard.keys && createGameBoard.keys[38]) {myShip.speedY = -1;}
//     if(createGameBoard.keys && createGameBoard.keys[40]) {myShip.speedY = +1;}
//     if(createGameBoard.keys && createGameBoard.keys[37]) {myShip.speedY = -1;}
//     createGameBoard.clearCanvas();
//     myShip.updatePos();
//     myShip.createShip();
// })


