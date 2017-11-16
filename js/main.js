
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
    game = new Core(WIDTH, HEIGHT); // game stage
    game.preload('img/IMG_1212.PNG'); 
    game.fps = 10;
    game.rootScene.backgroundColor = "black";
    game.collidables = [];

    ["left", "right", "upper"].forEach(function(val, idx, arr) {
		var wall = new Wall(val);
		game.rootScene.addChild(wall);
		game.collidables.push(wall);
	});
    msg = new MSG(SIZE,SIZE,"white");
    player = new Player(4,17);
    game.paddle = player;
    game.collidables.push(player);
    ball = new Ball(5,14);
    game.ball = ball;
    stage = new Stage();
    game.collidables.push(stage);
    game.onload = function(){
        game.rootScene.addChild(stage);
        game.rootScene.addChild(player);
        game.rootScene.addChild(ball);
        game.rootScene.addChild(msg);
    };
    game.start(); // start your game!
};


