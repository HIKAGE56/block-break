enchant();


Player = Class.create(Sprite,{
    initialize: function(x,y){
        Sprite.call(this,SIZE*3,SIZE);
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
        //if(this.y<=HEIGHT-SIZE*2)if(game.input.down){this.y+=SIZE;}
        //if(this.y>0)if(game.input.up){this.y-=SIZE;}
    },
    reset: function() {
		this.x = this.startX;
		this.y = this.startY;
	}
});