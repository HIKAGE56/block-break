enchant();
//
//  Stage make
//
/*
Stage = Class.create(Group,{
    initialize: function(areaNo,stageNo){
        this.stageBlock = getBlocks(areaNo,stageNo);
        block = new Array(WIDE);
        for(i = 0; i < WIDE; i++){
            block[i] = new Array(HEIG);
            for(j = 0; j < HEIG; j++){
                block[i][j] = new Block(i,j,this.stageBlock[i][j]);
                game.rootScene.addChild(block[i][j]);
            }
        }
    }
});
*/
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
Block = Class.create(Sprite,{
    initialize: function(y,x,no){
        if(no == 0){
        }else{
            Sprite.call(this,SIZE,SIZE);
            this.x = x * SIZE;
            this.y = y * SIZE;
            if(no == 1){
                this.backgroundColor = "blue";
            }else if(no == 2){
                this.backgroundColor = "pink";
            }else{
                this.backgroundColor = "white";
            }
        }
    },
    onenterflame: function(){
        if(intersect(Ball)){
            this.parentNode.remove(this);
        }
    }
});