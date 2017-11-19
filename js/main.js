
enchant(); // initialize
window.onload = function(){
    main();
};

function main(){
    game = new Core(WIDTH, HEIGHT); // game stage

    game.keybind(65, "a");
    game.keybind(68, "d");

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
    playerGroup = new PlayerGroup();
    game.collidables.push(playerGroup);
    game.paddle = playerGroup;
    ball = new Ball(5,12);
    game.ball = ball;
    stage = new Stage();
    game.collidables.push(stage);
    var message = new Message();
	game.message = message;
    var info = new Information();
	game.rootScene.addChild(info);
	game.info = info;
    
    game.onload = function(){
        game.rootScene.addChild(stage);
        game.rootScene.addChild(playerGroup);
        game.rootScene.addChild(ball);
        game.rootScene.addChild(msg);
        game.rootScene.addChild(message);
    };
    game.start(); // start your game!
};


