
enchant(); // initialize
window.onload = function(){
    main();
};

var SIZE = 32;
var WIDTH = SIZE * 11;
var HEIGHT = SIZE * 20;
function main(){
    game = new Core(WIDTH, HEIGHT); // game stage
    game.preload('img/IMG_1212.PNG'); 
    game.fps = 20;
    game.rootScene.backgroundColor = "black";
    player = new Player(4,17);
    ball = new Ball(5,16);
    msg = new MSG(SIZE,SIZE,"white");
    msg2 = new MSG(SIZE,SIZE * 2,"white");
    game.onload = function(){
        game.rootScene.addChild(player);
        game.rootScene.addChild(ball);
        game.rootScene.addChild(msg);
        game.rootScene.addChild(msg2);
    };
    game.start(); // start your game!
};


