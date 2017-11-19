enchant();

playerWidth = SIZE/2;
playerHeight = SIZE/2;
playerX = WIDTH/2-playerWidth;
playerY = 15*SIZE;
//guardHeight = SIZE*3;
//guardWidth = SIZE/2;
guardHeight = SIZE/2;
guardWidth = SIZE*3;

//Player = Class.create(Sprite,{
Player = Class.create(PhyCircleSprite,{
    initialize: function(x,y){
        //Sprite.call(this,playerWidth,playerHeight);
        PhyCircleSprite.call(this,playerWidth/2, DYNAMIC_SPRITE, 1.0, 0.5, 0.2, true);
        this.startX = x;
        this.startY = y;
        this.reboundDirection = "d_up";
        this.reset();
    }, 
    reset: function() {
        fillArc = new Surface(playerWidth,playerHeight);
        fillArc.context.fillStyle = "green";
        fillArc.context.beginPath();
        fillArc.context.arc(playerWidth/2, playerHeight/2, playerWidth/2, 0, Math.PI * 2, true);
        fillArc.context.fill();
        this.image = fillArc;
		this.x = playerX;
		this.y = playerY;
	}
});

//Guard = Class.create(Sprite,{
Guard = Class.create(PhyBoxSprite,{
    initialize: function(x,y){
        //Sprite.call(this,guardWidth,guardHeight);
        PhyBoxSprite.call(this,guardWidth,guardHeight,KINEMATIC_SPRITE,1.0, 0.5, 0.3, true);
        this.startX = x;
        this.startY = y;
        //this.backgroundColor = "yellow";
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
    },
    onenterframe: function(){
        if(this.x<WIDTH-guardHeight*2+playerWidth)if(game.input.right){this.x+=SIZE;}
        if(this.x>0-(playerWidth+guardHeight*2))if(game.input.left){this.x-=SIZE;}
        if(game.input.a){
            guard1.rotate(12);
            guard2.rotate(12);
            guard1.angularVelocity = 12;
            guard2.angularVelocity = 12;
        }else if(game.input.d){
            guard1.rotate(-12);
            guard2.rotate(-12);
            guard1.angularVelocity = -12;
            guard2.angularVelocity = -12;
        }
        childPlayer = this.childNodes;
        gb = game.ball;
        for(var c in childPlayer){
            cp = childPlayer[c];
            /*
            if(gb.intersect(cp)){
                direction = (gb.y+gb.height*0.5 < cp.y+cp.height*0.5)?"d_up":"d_down";
                direction = "d_up";
                gb.rebound(direction);
            }
            */
            gb.contact(function(cp){
                direction = (gb.y+gb.height*0.5 < cp.y+cp.height*0.5)?"d_up":"d_down";
                //direction = "d_up";
                gb.rebound(direction);
            });
        }
    },
    reset: function(){
        player.reset();
        guard1.x = playerX-guardWidth-guardHeight;
        guard2.x = playerX+playerWidth+guardHeight;
    }
});