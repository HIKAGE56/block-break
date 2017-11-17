enchant();


Player = Class.create(Sprite,{
    initialize: function(x,y){
        Sprite.call(this,SIZE,SIZE);
        this.startX = x * SIZE;
        this.startY = y * SIZE;
        this.speed = 4*(60/game.fps);
        this.backgroundColor = "green";
        this.reboundDirection = "d_up";
        this.reset();
    }, 
    onenterframe: function(){
        if(this.x<=WIDTH-SIZE*2)if(game.input.right){this.x+=SIZE;}
        if(this.x>0-SIZE*2)if(game.input.left){this.x-=SIZE;}
    },
    reset: function() {
		this.x = this.startX;
		this.y = this.startY;
	}
});

Guard = Class.create(Sprite,{
    initialize: function(x,y){
        Sprite.call(this,SIZE,SIZE*3);
        this.startX = x * SIZE;
        this.startY = y * SIZE;
        this.backgroundColor = "yellow";
        this.reboundDirection = "d_up";
        this.reset();
    },  
    onenterframe: function(){
        if(this.x<=WIDTH-SIZE*2)if(game.input.right){this.x+=SIZE;}
        if(this.x>0-SIZE*2)if(game.input.left){this.x-=SIZE;}
    },
    reset: function() {
		this.x = this.startX;
		this.y = this.startY;
	}
});

PlayerGroup = Class.create(Group,{
    initialize: function(x,y){
        Group.call(this);
        player = new Player(x,y);
        guard1 = new Guard(x-3,y-1);
        guard2 = new Guard(x+3,y-1);
        guard1.originX = player.x+SIZE/2;
        guard2.originX = -player.x+SIZE/2;
        this.addChild(player);
        this.addChild(guard1);
        this.addChild(guard2);
        game.paddle = player;
        msg2 = new MSG(4,4,"white");
        game.rootScene.addChild(msg2);
    },
    onenterframe: function(){
        if(game.input.a){
            msg2.text = "a";
            guard1.rotate(12);
            guard2.rotate(12);
        }else if(game.input.d){
            msg2.text = "d";
            guard1.rotate(-12);
            guard2.rotate(-12);
        }else{
            msg2.text = "no";
        }
        childPlayer = this.childNodes;
        gb = game.ball;
        for(var c in childPlayer){
            cp = childPlayer[c];
            if(gb.collisionRect.intersect(cp)){
                direction = (gb.y+gb.height*0.5 < cp.y+cp.height*0.5)?"d_up":"d_down";
                gb.rebound(direction);
            }
        }
    },
    reset: function(){
        guard1.x = player.x-3;
        guard2.x = player.x+3;
    }
});