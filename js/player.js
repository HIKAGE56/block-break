enchant();


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