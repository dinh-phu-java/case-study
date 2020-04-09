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
    ctx.fillText("My Heart: "+(myShip.stable+1),2,createGameBoard.canvas.height-50);
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
            if (myShip.stable ===0){
                myShip.clearObj();
                theObstacles[i].clearObj();
                checkOver=true;
            }else{
                myShip.stable--;
                theObstacles[i].clearObj();
            }

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
        if(myShip.collisionOtherObject(enemyGun[i]) === false){
            if(myShip.stable===0) {
                myShip.clearObj();
                enemyGun[i].clearGun();
                gameOverText("Game Over", (createGameBoard.canvas.width / 2) - 250, 100);
                console.log(myShip.stable);
            }else{
                myShip.stable--;
                enemyGun[i].x=enemySpace[i].x;
                enemyGun[i].y=enemySpace[i].y;
            }
        }
    }
}
function winGame(){
    if (createGameBoard.baseEnemyShip == 0){

        gameOverText("You Win!",(createGameBoard.canvas.width/2) -250 ,createGameBoard.canvas.height/2);

    }
};