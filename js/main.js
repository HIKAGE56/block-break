
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
    game.onload = function(){
        game.rootScene.addChild(player);
        game.rootScene.addChild(ball);
    };
    game.start(); // start your game!
};


Player = Class.create(Sprite,{
    initialize: function(x,y){
        Sprite.call(this,SIZE*3,SIZE);
        this.x = x * SIZE;
        this.y = y * SIZE;
        this.backgroundColor = "green";
    },
    onenterframe: function(){
        if(this.x<=WIDTH-SIZE*2)if(game.input.right){this.x+=SIZE;}
        if(this.x>0-SIZE*2)if(game.input.left){this.x-=SIZE;}
        //if(this.y<=HEIGHT-SIZE*2)if(game.input.down){this.y+=SIZE;}
        //if(this.y>0)if(game.input.up){this.y-=SIZE;}
    }
});

Ball = Class.create(Sprite,{
    initialize: function(x,y){
        Sprite.call(this,SIZE,SIZE);
        this.x = x * SIZE;
        this.y = y * SIZE;
        this.backgroundColor = "red";
        this.Xdir = 0;
        this.Ydir = 0;
    },
    onenterframe: function(){
        if(this.intersect(player)){
        }else{
            this.backgroundColor = "blue";
        }
    }
});