enchant();
MSG = Class.create(Label,{
  initialize:function(x,y,color){
    Label.call(this,x,y,color);
    this.x = x;
    this.y = y;
    this.color = color;
    this.font = "bold 30px Meiryo";
  }
});