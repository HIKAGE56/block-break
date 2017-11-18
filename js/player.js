enchant();

playerWidth = SIZE/2;
playerHeight = SIZE/2;
playerX = WIDTH/2+SIZE/8;
playerY = 15*SIZE;
guardHeight = SIZE*3;
guardWidth = SIZE/4;
//guardHeight = SIZE/4;
//guardWidth = SIZE*3;


Player = Class.create(Sprite,{
    initialize: function(x,y){
        Sprite.call(this,playerWidth,playerHeight);
        var fillArc = new Surface(playerWidth,playerHeight);
        fillArc.context.fillStyle = "green";
        fillArc.context.beginPath();
        fillArc.context.arc(playerWidth/2, playerHeight/2, playerWidth/2, 0, Math.PI * 2, false);
        fillArc.context.fill();
        this.image = fillArc;
        this.startX = x;
        this.startY = y;
        //this.backgroundColor = "green";
        this.reboundDirection = "d_up";
        this.reset();
    }, 
    reset: function() {
		this.x = this.startX;
		this.y = this.startY;
	}
});

Guard = Class.create(Sprite,{
    initialize: function(x,y){
        Sprite.call(this,guardWidth,guardHeight);
        this.startX = x;
        this.startY = y;
        this.backgroundColor = "yellow";
        this.reboundDirection = "d_up";
        this.reset();
    },  
    reset: function() {
		this.x = this.startX;
		this.y = this.startY;
	}
});

PlayerGroup = Class.create(Group,{
    initialize: function(){
        Group.call(this);
        player = new Player(playerX,playerY);
        guard1 = new Guard(playerX-guardWidth-guardHeight,playerY-(guardHeight-playerHeight)/2);
        guard2 = new Guard(playerX+playerWidth+guardHeight,playerY-(guardHeight-playerHeight)/2);
        guard1.originX = guardWidth+playerWidth/2+guardHeight;
        guard2.originX = -playerWidth/2-guardHeight;
        this.addChild(player);
        this.addChild(guard1);
        this.addChild(guard2);
        game.paddle = player;
    },
    onenterframe: function(){
        if(this.x<WIDTH-guardHeight*2+playerWidth)if(game.input.right){this.x+=SIZE;}
        if(this.x>0-(playerWidth+guardHeight*2))if(game.input.left){this.x-=SIZE;}
        if(game.input.a){
            guard1.rotate(12);
            guard2.rotate(12);
        }else if(game.input.d){
            guard1.rotate(-12);
            guard2.rotate(-12);
        }
        childPlayer = this.childNodes;
        gb = game.ball;
        for(var c in childPlayer){
            cp = childPlayer[c];
            if(gb.collisionRect.intersect(cp)){
                direction = (gb.y+gb.height*0.5 < cp.y+cp.height*0.5)?"d_up":"d_down";
                //direction = (gb.y+gb.height*0.5 < cp.y+cp.width*0.5)?"d_up":"d_down";
                //direction = "d_up";
                gb.rebound(direction);
            }
        }
        this.reset();
    },
    reset: function(){
        guard1.x = playerX-guardWidth-guardHeight;
        guard2.x = playerX+playerWidth+guardHeight;
    }
});