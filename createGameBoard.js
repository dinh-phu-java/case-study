let createGameBoard= {
    canvas: document.createElement("canvas"),
    makeCanvas(){
        this.canvas.width=720;  // canvas width
        this.canvas.height=700; // canvas height
        this.mid_screen=createGameBoard.canvas.width/2-50;  //đặt vị trí của tàu cố định dưới màn hình
        this.bottom_screen=createGameBoard.canvas.height-70; //đặt vị trí của tàu cố định dưới màn hình
        this.context=this.canvas.getContext("2d");// context 2d
        this.baseSeed=4; // tốc độ di chuyển cơ bản
        this.myShipSpeed=1;
        this.objPerSecond=20;
        this.gun_quantity=5;
        document.body.appendChild(this.canvas); // gắn vào body
        this.interval= setInterval(updateProgram,10);  // set time out update cho screen;
        this.keyBoardEvent();

    },
    clearCanvas(){
        this.context.clearRect(0,0,this.canvas.width,this.canvas.height);
    },
    keyBoardEvent(){
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
    stopGame(){
        clearInterval(this.interval);
    }
}