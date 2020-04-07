

let createGameBoard= {
    canvas: document.createElement("canvas"),
    makeCanvas(){
        this.canvas.width=720;  // canvas width
        this.canvas.height=700; // canvas height
        this.mid_screen=createGameBoard.canvas.width/2-50;  //đặt vị trí của tàu cố định dưới màn hình
        this.bottom_screen=createGameBoard.canvas.height-70; //đặt vị trí của tàu cố định dưới màn hình
        this.context=this.canvas.getContext("2d");// context 2d
        this.baseSeed=3; // tốc độ di chuyển cơ bản
        this.myShipSpeed=1;
        this.objPerSecond=50;
        this.gun_quantity=4;
        document.body.appendChild(this.canvas); // gắn vào body
        this.interval= setInterval(updateProgram,10);  // set time out update cho screen;

        window.addEventListener('keydown',function(ev){
            createGameBoard.keys= (createGameBoard.keys || []); // thiết lập mảng cho event bàn phím
            createGameBoard.keys[ev.keyCode] = true;

        }); // event keydown
        window.addEventListener('keyup',function(ev){
            createGameBoard.keys = (createGameBoard.keys || []);
            createGameBoard.keys[ev.keyCode] =false;

        }); // reset keyup event
        window.addEventListener('keypress',function(ev){
            if(ev.keyCode == 32){
                createGameBoard.shoot_gun=true; // lấy event nút cách
            }
        })
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

let gunObj= function(img_src,x,y,width,height){
    spaceObj.apply(this,arguments); // kế thừa lớp spaceObj
    this.gunThrough=function(){
        this.y-=(createGameBoard.baseSeed+4);
    }
};
let spaceObstackle= function(img_src,x,y,width,height){
    spaceObj.apply(this,arguments); // kế thừa lớp spaceObj
    this.dropThrough= function(){
        this.y += (createGameBoard.baseSeed+2);
    }
}

let myShip; // myShip
let gun=[];
let count_gun=0;
let theObstackles=[];
let reset_gun=false;
let cube_image='cubes_green.png';

function startProgram(){

    createGameBoard.makeCanvas(); // tạo canvas
    myShip = new spaceObj('spaceship.png',createGameBoard.mid_screen,createGameBoard.bottom_screen,50,50); // khởi tạo đối tượng tàu
    myShip.createObj(); // vẽ tàu
    //theObstackles= new spaceObstackle('cubes_green.png',createGameBoard.mid_screen,10,50,50);
    //theObstackles.createObj();
}

function updateProgram(){
    createGameBoard.clearCanvas(); // xóa image cũ để update image mới

    myShip.speedX=0;  // đặt speedx =0
    myShip.speedY =0;  // đặt speedy =0
    if(createGameBoard.keys && createGameBoard.keys[39]) {
        console.log("chiều dài của canvas:"+ createGameBoard.canvas.width);
        if(myShip.x < createGameBoard.canvas.width-50){
            myShip.speedX = +(createGameBoard.baseSeed+createGameBoard.myShipSpeed);
        }
    } // di chuyển phải
     if(createGameBoard.keys && createGameBoard.keys[38]) {
         if(myShip.y > 380){
             myShip.speedY = -(createGameBoard.baseSeed+createGameBoard.myShipSpeed);
         }
     } // di chuyển lên
     if(createGameBoard.keys && createGameBoard.keys[40]) {
         if(myShip.y < 650){
             myShip.speedY = +(createGameBoard.baseSeed+createGameBoard.myShipSpeed);
         }
     }// di chuyển xuống
     if(createGameBoard.keys && createGameBoard.keys[37]) {

         if(myShip.x > 1){
             myShip.speedX = -(createGameBoard.baseSeed+createGameBoard.myShipSpeed);
         }
     }// di chuyển trái
    // if(createGameBoard.objPerSecond % 2 == 0){
    //     //cube_image='cubes_pink.png';
    // }else{
    //     cube_image='cubes_yellow.png';
    // }
    console.log(createGameBoard.objPerSecond);
    if(createGameBoard.objPerSecond % 50  ==0){


        let x_pos = Math.floor( Math.random()*(createGameBoard.canvas.width)-50 )


        if(Math.floor(Math.sqrt(createGameBoard.objPerSecond))   %2 ==0){
             cube_image='cubes_yellow.png';
         }else if(Math.floor(Math.sqrt(createGameBoard.objPerSecond))   %3 ==0){
             cube_image='cubes_green.png';
         }else {
             cube_image='cubes_pink.png';
        }
        theObstackles.push(new spaceObstackle(cube_image,x_pos,10,50,50));
        createGameBoard.objPerSecond++;
       // console.log(theObstackles);
    }else{
        createGameBoard.objPerSecond++;
    }
    for (let i =0 ;i<theObstackles.length;i++){
        theObstackles[i].createObj();
        theObstackles[i].dropThrough();
    }
    //createGameBoard.objPerSecond++;
    myShip.updatePos(); // tạo vị trí mới cho tàu
    myShip.createObj();  // vẽ lại tàu
    if (createGameBoard.shoot_gun ==true){ //kiểm tra space có đc ấn
        if(count_gun<createGameBoard.gun_quantity){ //tối đa 3 viên đạn
            gun.push(new gunObj('gun.png',myShip.x+10,myShip.y,30,25)); // tạo mảng gun
            createGameBoard.shoot_gun=false; // reset space key
            count_gun++;
        }
    }
    if(count_gun==createGameBoard.gun_quantity){
        setTimeout(function(){
            count_gun =0;
            gun = [];
        },1000); // bắn xong 3 viên delay đạn 1s
    }

    for(let i = 0 ;i<gun.length;i++){
        gun[i].createObj(); //  bắn gun
        gun[i].gunThrough();// bắn gun
    }




}










window.onload=startProgram();


