enchant();
BallSize = SIZE/2;
//Ball = Class.create(Sprite,{
Ball = Class.create(PhyCircleSprite,{
    initialize: function(x,y){
        //Sprite.call(this,BallSize,BallSize);
		PhyCircleSprite.call(this,BallSize/2, DYNAMIC_SPRITE, 1.0, 0.5, 0.2, true);
        this.startX = x * SIZE;
        this.startY = y * SIZE;
        this.reset();
    },
    onenterframe: function(){
        this.mx = Math.sin(this.angle)*this.speed;
        this.my = Math.cos(this.angle)*this.speed;
        this.moveBy(this.mx, this.my);
        var that = this;
        game.collidables.forEach(function(sprite, idx, arr) {   
			/*
			if ( that.intersect(sprite) ) {
				that.rebound(sprite.reboundDirection);
			}
			*/
			that.contact(function(sprite){
				that.rebound(sprite.reboundDirection);
			});
		});
        if(this.y > game.height){
            showMessage("game_over");
        }
    },
    rebound: function(direction) {
			//各方向へ反発させる
			var mv;
			if (direction == "left" || direction == "right") {
				this.angle *= -1;
				mv = 2*this.mx;
				this.x -= mv
				return;
			}

			if (direction == "down" || direction == "up") {
				this.angle = Math.PI-this.angle;
			} else {
				//角度変化あり
				var v = Math.random()*20*Math.PI/180;
				if (direction == "d_down") {
					this.angle = Math.PI-this.angle+v;
				} else if (direction == "d_up") {
					this.angle = Math.PI-this.angle-v;
				}
			}
			mv = 2*this.my;
			this.y -= mv;
		},
		reset: function() {
            var fillArc = new Surface(BallSize,BallSize);
            fillArc.context.fillStyle = "red";
            fillArc.context.beginPath();
            fillArc.context.arc(BallSize/2, BallSize/2, BallSize/2, 0, Math.PI * 2, false);
            fillArc.context.fill();
            this.image = fillArc;
			this.x = this.startX;
            this.y = this.startY;
			this.angle = getRaisedAngle();
			this.speed = 3*(60/game.fps);
			this.mx = this.my = 0;
		}
});


function getRaisedAngle() {
	//立った（水平でない）角度を返す
	while (true) {
		var angle = Math.random()*2*Math.PI;
		if (Math.abs( Math.sin(angle) ) < 0.7) return angle;
	}
}