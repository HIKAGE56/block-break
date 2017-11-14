enchant();
Ball = Class.create(Sprite,{
    initialize: function(x,y){
        Sprite.call(this,SIZE,SIZE);
        this.x = x * SIZE;
        this.y = y * SIZE;
        this.backgroundColor = "red";
        this.Xdir = SIZE;
        this.Ydir = -SIZE;
    },
    onenterframe: function(){
        if(this.intersect(player)){
            this.Ydir = -this.Ydir;
        }else{
            this.backgroundColor = "blue";
            if(this.x >= WIDTH - SIZE || this.x <= 0){
                this.Xdir = -this.Xdir;
            }
            if(this.y >= HEIGHT - SIZE || this.y <= 0){
                this.Ydir = -this.Ydir;
            }
            this.x += this.Xdir;
            this.y += this.Ydir;
            msg.text = "(" + ball.Xdir + "," + ball.Ydir + ")";
            msg2.text = "(" + ball.x + "," + ball.y + ")";
        }
    }
});