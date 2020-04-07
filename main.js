let myShip; // myShip
let gun = [];
let count_gun = 0;
let theObstacles = [];
let reset_gun = false;
let cube_image = 'cubes_green.png';

function startProgram() {

    createGameBoard.makeCanvas(); // tạo canvas
    myShip = new spaceObj('spaceship.png', createGameBoard.mid_screen, createGameBoard.bottom_screen, 50, 50); // khởi tạo đối tượng tàu
    myShip.createObj(); // vẽ tàu

}

function makeObstacle() {
    if (createGameBoard.objPerSecond % 20 == 0) { // khởi tạo obstackle
        let x_pos = Math.floor(Math.random() * (createGameBoard.canvas.width) - 50);
        let stable;
        //chọn ảnh cho obstackle
        if (Math.floor(Math.sqrt(createGameBoard.objPerSecond)) % 2 == 0) {
            cube_image = 'cubes_yellow.png';
            stab=1;
        } else if (Math.floor(Math.sqrt(createGameBoard.objPerSecond)) % 3 == 0) {
            cube_image = 'cubes_green.png';
            stab=3
        } else {
            cube_image = 'cubes_pink.png';
            stab=2
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
    if (createGameBoard.shoot_gun == true) { //kiểm tra space có đc ấn
        if (count_gun < createGameBoard.gun_quantity) { //tối đa 3 viên đạn
            gun.push(new gunObj('gun.png', myShip.x + 10, myShip.y, 30, 25)); // tạo mảng gun
            createGameBoard.shoot_gun = false; // reset space key
            count_gun++;
        }
    }
    if (count_gun == createGameBoard.gun_quantity) {
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
    }
}
function gameOver(){
    for (let i =0; i<theObstacles.length;i++){
        if(myShip.collisionOtherObject(theObstacles[i])==false){
            createGameBoard.stopGame();
            alert("GAME OVER");
        }
    }
}
function destroyObstacle(){
    for(let i=0;i<theObstacles.length;i++){
        for(let j=0;j<gun.length;j++){
            if(theObstacles[i].collisionOtherObject(gun[j]) ==false){

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
function updateProgram() {
    createGameBoard.clearCanvas(); // xóa image cũ để update image mới

    myShip.speedX = 0;  // đặt speedx =0
    myShip.speedY = 0;  // đặt speedy =0

    myShip.move();

    makeObstacle();
    makeMultiObstacles();

    myShip.updatePos(); // tạo vị trí mới cho tàu
    myShip.createObj();  // vẽ lại tàu

    makeGun();
    makeMultiGun();

    destroyObstacle();
    gameOver();



}

window.onload = startProgram();


