let myShip; // myShip
let gun = [];
let count_gun = 0;
let theObstacles = [];
let enemySpace=[];
let enemyGun=[];
let cube_image = 'cubes_green.png';
let gun_sound=[];


function startProgram() {

    createGameBoard.makeCanvas(); // tạo canvas
    myShip = new spaceObj('spaceship.png', createGameBoard.mid_screen, createGameBoard.bottom_screen, 50, 50); // khởi tạo đối tượng tàu
    myShip.createObj(); // vẽ tàu
    makeEnemyShip();
    makeEnemyGun();



}
function makeEnemyShip(){
    for (let i =0 ;i <createGameBoard.baseEnemyShip ; i++){

        enemySpace.push(new enemyShip('enemyship.png',10+ (30*i),10,50,50,createGameBoard.gameLevel));
    }
    for (let i=0;i<createGameBoard.baseEnemyShip;i++){
        enemySpace[i].createObj();
    }
}
function makeEnemyGun(){
    for (let i=0; i<enemySpace.length;i++){
            enemyGun.push(new gunObj('gun_red.png',enemySpace[i].x,enemySpace[i].y,30,25));
    }
    for (let i=0; i<enemySpace.length;i++){
        enemyGun[i].createObj();
    }
}
function makeObstacle() {
    if (createGameBoard.objPerSecond % 10 === 0) { // khởi tạo obstackle
        let x_pos = Math.floor(Math.random() * (createGameBoard.canvas.width) - 50);
        let stable;
        //chọn ảnh cho obstackle
        if (Math.floor(Math.sqrt(createGameBoard.objPerSecond)) % 2 === 0) {
            cube_image = 'cubes_yellow.png';
            stab=3;
        } else if (Math.floor(Math.sqrt(createGameBoard.objPerSecond)) % 3 === 0) {
            cube_image = 'cubes_green.png';
            stab=1;
        } else {
            cube_image = 'cubes_pink.png';
            stab=2;
        }
        theObstacles.push(new spaceObstacle(cube_image, x_pos, 10, 50, 50,stab));
        createGameBoard.objPerSecond++;

    } else {
        createGameBoard.objPerSecond++;
    }
}

function makeMultiObstacles() {
    for (let i = 0; i < theObstacles.length; i++) {
        theObstacles[i].createObj();
        theObstacles[i].dropThrough();
    }
}
function makeGun(){
    if (createGameBoard.shoot_gun === true) { //kiểm tra space có đc ấn
        if (count_gun < createGameBoard.gun_quantity) { //tối đa 3 viên đạn
            gun.push(new gunObj('gun.png', myShip.x + 10, myShip.y, 30, 25)); // tạo mảng gun
            //gun_sound.push( new sound('sound/gun_music1.mp3'));
            createGameBoard.shoot_gun = false; // reset space key
            count_gun++;
        }
    }
    if (count_gun === createGameBoard.gun_quantity) {
        setTimeout(function () {
            count_gun = 0;
            gun = [];
        }, 1000); // bắn xong 3 viên delay đạn 1s
    }
}
function makeMultiGun(){
    for (let i = 0; i < gun.length; i++) {
        gun[i].createObj(); //  bắn gun
        gun[i].gunThrough();// bắn gun
        //gun_sound[i].play();
    }
}
function displayGunQuantity(){
    let ctx= createGameBoard.context;
    ctx.fillStyle= "white";
    ctx.font="14px Arial";
    ctx.fillText("Bullet: "+(createGameBoard.gun_quantity-count_gun),2 ,createGameBoard.canvas.height-10);
    ctx.stroke();
    ctx.fillText("Game Level: "+createGameBoard.gameLevel,2,createGameBoard.canvas.height - 30);
    ctx.fillStyle="red";
    ctx.font="14px Arial bold";
    //ctx.fillText("Heart 2: "+(enemySpace[1].stable+1),2,32);
    for (let i=0;i<createGameBoard.baseEnemyShip;i++){
        ctx.fillText("Heart "+ (i+1)+" :" +(enemySpace[i].stable+1),2,(17 *i) + 12 );
        ctx.stroke();
    }

}

function gameOver(){
    let checkOver=false;
    for (let i =0; i<theObstacles.length;i++){
        if(myShip.collisionOtherObject(theObstacles[i])===false){
            //createGameBoard.stopGame();
            myShip.clearObj();
            theObstacles[i].clearObj();
            checkOver=true;
        }
    }
if (checkOver==true){

    gameOverText("Game Over",(createGameBoard.canvas.width/2) -250,100);

}

}
function gameOverText(str,x,y){

    setInterval(function(){
        let ctx = createGameBoard.context;
        ctx.fillStyle="yellow";
        ctx.font="100px Arial"
        ctx.fillText(str,x, y);
    },1);
}
function destroyObstacle(){
    for(let i=0;i<theObstacles.length;i++){
        for(let j=0;j<gun.length;j++){

            if(theObstacles[i].collisionOtherObject(gun[j]) ===false){

                if(theObstacles[i].stable  > 1){
                    theObstacles[i].stable--;
                }else{
                    theObstacles[i].clearObstacle();
                }

                gun[j].clearGun();
            }
        }

    }
}

function enemySpaceMove(){
    for (let i=0 ; i<enemySpace.length;i++){
        enemySpace[i].randomMove();
        enemySpace[i].createObj();
    }
}
function enemyDestroy(){
    for(let j=0;j<enemySpace.length;j++){
        for (let i=0 ; i< gun.length ; i++){
            if(enemySpace[j].collisionOtherObject(gun[i]) === false){
                if(enemySpace[j].stable === 0){
                    enemySpace[j].removeEnemyShip();
                    // gun[i].clearGun();
                    enemyGun[j].clearGun();
                    createGameBoard.baseEnemyShip--;
                }else{
                    enemySpace[j].stable--;
                }
                gun[i].clearGun();
            }
        }
    }
}
function enemySpaceShootGun(){
    for (let i =0;i<enemySpace.length;i++){
        enemyGun[i].createObj();
        enemyGun[i].gunDown(enemySpace[i]);
    }
}
function myShipCollapse(){
    for (let i=0;i<enemyGun.length;i++){
        if(myShip.collisionOtherObject(enemyGun[i]) == false){
            myShip.clearObj();
            enemyGun[i].clearGun();
            gameOverText("Game Over",(createGameBoard.canvas.width/2) -250,100);
        }
    }
}
function winGame(){
    if (createGameBoard.baseEnemyShip == 0){

        gameOverText("You Win!",(createGameBoard.canvas.width/2) -250 ,createGameBoard.canvas.height/2);

    }
};

function updateProgram() {
    createGameBoard.clearCanvas(); // xóa image cũ để update image mới

    myShip.speedX = 0;  // đặt speedx =0
    myShip.speedY = 0;  // đặt speedy =0

    myShip.move(); // di chuyển tàu

    makeObstacle();
    makeMultiObstacles();

    myShip.updatePos(); // tạo vị trí mới cho tàu
    myShip.createObj();  // vẽ lại tàu

    makeGun();
    makeMultiGun();

    destroyObstacle(); //nếu bắn trúng thì xóa obstacle
    displayGunQuantity(); // hiên thị số đạn
    //makeEnemyShip();
    gameOver();

    enemySpaceMove();

    enemyDestroy();


   // enemyGun.createObj();
    //enemyGun.gunDown(enemySpace[0]);


    myShipCollapse();


    winGame();

    //createGameBoard.objPerSecond++;

}

//window.onload = startProgram();

let lv1= document.getElementById("lv1");
let lv2= document.getElementById("lv2");
let lv3= document.getElementById("lv3");
let lv4= document.getElementById("lv4");
let lv5= document.getElementById("lv5");
let lv6= document.getElementById("lv6");
let reload_page=document.getElementById("reload");
createGameBoard.displayDefaultCanvas();

function disableBtn(){
    lv1.disabled=true;
    lv2.disabled=true;
    lv3.disabled=true;
    lv4.disabled=true;
    lv5.disabled=true;
    lv6.disabled=true;
}

reload_page.onclick=function(){
    window.location.reload();
}

lv1.onclick=function(){
    this.blur();
    createGameBoard.gameLevel=1;
    disableBtn();
    startProgram();

};



lv2.onclick=function(){
    this.blur();
        createGameBoard.gameLevel=2;
    disableBtn();
        startProgram();

};
lv3.onclick=function(){
    this.blur();

    createGameBoard.gameLevel=3;
    disableBtn();
    startProgram();
};
lv4.onclick=function(){
    this.blur();

    createGameBoard.gameLevel=4;
    disableBtn();
    startProgram();
};
lv5.onclick=function(){
    this.blur();

    createGameBoard.gameLevel=5;
    disableBtn();
    startProgram();
};
lv6.onclick=function(){
    this.blur();

    createGameBoard.gameLevel=6;
    disableBtn();
    startProgram();
};