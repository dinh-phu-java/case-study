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
    createGameBoard.interval=setInterval(updateProgram,20);
    myShip = new spaceObj('spaceship.png', createGameBoard.mid_screen, createGameBoard.bottom_screen, 50, 50,createGameBoard.myShipStable); // khởi tạo đối tượng tàu
    myShip.createObj(); // vẽ tàu
    console.log(myShip.stable);
    makeEnemyShip();
    makeEnemyGun();
}


function updateProgram() {
    if (stop_btn=== true){
        return true;
    }
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
    gameOver();
    enemySpaceMove();
    enemySpaceShootGun();
    enemyDestroy();
    myShipCollapse();
    winGame();
}



let lv1= document.getElementById("lv1");
let lv2= document.getElementById("lv2");
let lv3= document.getElementById("lv3");
let lv4= document.getElementById("lv4");
let lv5= document.getElementById("lv5");
let lv6= document.getElementById("lv6");
let reload_page=document.getElementById("reload");
let stop_continue=document.getElementById("stop-continue");
stop_continue.innerHTML="Stop";
stop_continue.style.width="100px";
let stop_btn=false;
createGameBoard.displayDefaultCanvas();


function disableBtn(){
    lv1.disabled=true;
    lv2.disabled=true;
    lv3.disabled=true;
    lv4.disabled=true;
    lv5.disabled=true;
    lv6.disabled=true;
}

stop_continue.onclick=function(){
    if(stop_btn===false){
        stop_continue.innerHTML="Continue";
        stop_btn=true;
        createGameBoard.interval=setInterval(updateProgram,20); //  stopGame() = clearInterval(this.interval);

    }else{
        stop_continue.innerHTML="Stop";
        stop_btn=false;

        clearInterval(createGameBoard.interval);
    }
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