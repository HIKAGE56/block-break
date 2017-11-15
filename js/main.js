
enchant(); // initialize
window.onload = function(){
    main();
};

var SIZE = 32;
var WIDE = 11;
var HEIG = 20;
var WIDTH = SIZE * WIDE;
var HEIGHT = SIZE * HEIG;
function main(){
    game = new Game(WIDTH, HEIGHT); // game stage
    game.preload('img/IMG_1212.PNG'); 
    game.fps = 20;
    game.rootScene.backgroundColor = "black";
    player = new Player(4,17);
    ball = new Ball(5,16);
    msg = new MSG(SIZE,SIZE,"white");
    msg2 = new MSG(SIZE,SIZE * 2,"white");
    blockData = getBlocks(1,1);
    blocks = new Array();
    for(i = 0; i < HEIG; i++){
        blocks[i] = new Array();
        for(j = 0; j < WIDE; j++){
            if(blockData[i][j] != 0){
                blocks[i][j] = new Block(i,j,blockData[i][j]);
                game.rootScene.addChild(blocks[i][j]);
            }
        }
    }
    console.log(blocks);
    game.onload = function(){
        game.rootScene.addChild(player);
        game.rootScene.addChild(ball);
        game.rootScene.addChild(msg);
        game.rootScene.addChild(msg2);
    };
    game.start(); // start your game!
};


