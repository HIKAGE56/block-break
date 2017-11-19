enchant();
//
//  Stage make
//
Stage = Class.create(Group,{
    initialize: function(){
        Group.call(this);
        blockData = getBlocks(1,1);
        for(i = 0; i < HEIG; i++){
            for(j = 0; j < WIDE; j++){
                if(blockData[i][j] != 0){
                    this.addChild(new Block(j,i,blockData[i][j]));
               }
            }
        }
        childBlocks = this.childNodes;
        msg.text = childBlocks.length;
    },
    onenterframe: function(){
        childBlocks = this.childNodes;
        ba = game.ball;
        for(var b in childBlocks){
            cb = childBlocks[b];
            /*
            if(ba.intersect(cb)){
                direction = (ba.y+ba.height*0.5 < cb.y+cb.height*0.5)?"d_up":"d_down";
                ba.rebound(direction);
                this.removeChild(cb);
            }
            */
            ba.contact(function(cb){
                direction = (ba.y+ba.height*0.5 < cb.y+cb.height*0.5)?"d_up":"d_down";
                ba.rebound(direction);
                //this.removeChild(cb);
                cb.destroy();
            });
            if(childBlocks.length == 0){
                showMessage("stage_clear");
            }
        }
        msg.text = childBlocks.length;
    }
});
//
//jar file load
//
function getBlocks(AreaNo,stageNo){
    folder = "stageData";
    area = "area" + AreaNo;
    stage = "stage" + stageNo + ".csv";
    filePath = folder + "/" + area + "/" + stage;
    reader = getDataFile(filePath);
    return reader;
};

function getDataFile(path){
    allData = [];
    request = new XMLHttpRequest();
    request.open("get",path,false);
    request.send(null);

    Data = request.responseText;

    Data = Data.replace( /\r\n/g , "\n" );
    Data = Data.replace( /^(\n+)|(\n+)$/g , "" );
    lines = Data.split( /\n/g );
    sets = new Array();

    for (i = 0; i < lines.length; i++) {
        sets[i] = lines[i].split(",");
        allData.push(sets[i]);
    }

    return allData;
};

//
// Block
//
//Block = Class.create(Sprite,{
Block = Class.create(PhyBoxSprite,{
    initialize: function(x,y,no){
        Sprite.call(this,SIZE,SIZE);
        PhyBoxSprite.call(this,SIZE, SIZE,STATIC_SPRITE, 1.0, 0.5, 0.2, true);
        this.x = x * SIZE;
        this.y = y * SIZE;
        if(no == 1){
            this.backgroundColor = "blue";
        }else if(no == 2){
            this.backgroundColor = "pink";
        }else{
            this.backgroundColor = "white";
        }
    },
    destroy: function() {
        world.DestroyBody(this.body.m_body);
        this.body.Destroy();
        this.parentNode.removeChild(this);
        this.delete();
    }
});

//var Wall = enchant.Class.create(Sprite, {
Wall  = Class.create(PhyBoxSprite,{
	//左・右・上部の壁
	initialize: function(loc) {
		var obj = {
			left:  { rect: [-SIZE*2, 0, SIZE*2, HEIGHT], direction: "right" },
			right: { rect: [WIDTH, 0, SIZE*2, HEIGHT], direction: "left" },
			upper: { rect: [-SIZE*2, -SIZE*2, WIDTH+SIZE*4, SIZE*2], direction: "down" }
		};
		var r = obj[loc].rect,
			left = r[0], top = r[1], width = r[2], height = r[3];
		//Sprite.call(this, width, height);
        PhyBoxSprite.call(this,width, height,STATIC_SPRITE, 1.0, 0.5, 0.2, true);
		this.x = left;
		this.y = top;
		this.reboundDirection = obj[loc].direction;
	}
});

