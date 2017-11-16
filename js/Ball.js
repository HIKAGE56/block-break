enchant();
Ball = Class.create(Sprite,{
    initialize: function(x,y){
        Sprite.call(this,SIZE,SIZE);
        this.startX = x * SIZE;
        this.startY = y * SIZE;
        this.backgroundColor = "red";
        this.collisionRect = new Sprite(SIZE*0.8,SIZE*0.8);
        game.rootScene.addChild(this.collisionRect);
        this.reset();
    },
    onenterframe: function(){
        this.mx = Math.sin(this.angle)*this.speed;
        this.my = Math.cos(this.angle)*this.speed;
        this.moveBy(this.mx, this.my);
        this.collisionRect.moveBy(this.mx, this.my);
        var that = this;
        game.collidables.forEach(function(sprite, idx, arr) {
			if ( that.collisionRect.intersect(sprite) ) {
				that.rebound(sprite.reboundDirection);
			}
		});
        if(this.y > game.height){
            showMessage("Game Over");
        }
        //msg.text = "(" + this.mx + "," + this.my + ")";
    },
    rebound: function(direction) {
			//各方向へ反発させる
			var mv;
			if (direction == "left" || direction == "right") {
				this.angle *= -1;
				mv = 2*this.mx;
				this.x -= mv
				this.collisionRect.x -= mv;
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
			this.collisionRect.y -= mv;
		},
		reset: function() {
			this.x = this.startX;
            this.y = this.startY;
			this.angle = getRaisedAngle();
			this.speed = 3*(60/game.fps);
			this.mx = this.my = 0;
			var rSize = this.collisionRect.width;
			this.collisionRect.moveTo(this.x+(this.width-rSize)*0.5,
			                          this.y+(this.height-rSize)*0.5);
		}
});


function getRaisedAngle() {
	//立った（水平でない）角度を返す
	while (true) {
		var angle = Math.random()*2*Math.PI;
		if (Math.abs( Math.sin(angle) ) < 0.7) return angle;
	}
}