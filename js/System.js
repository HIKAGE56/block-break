enchant();

var SIZE = 32;
var WIDE = 11;
var HEIG = 20;
var WIDTH = SIZE * WIDE;
var HEIGHT = SIZE * HEIG;

function restart(state) {
		//ゲーム再開処理
		[game.paddle, game.ball].forEach(function(e, i, arr) {
			e.reset();
			game.rootScene.addChild(e);
		});
		game.blocks = new Stage();
		game.rootScene.addChild(game.blocks);
		switch (state) {
		case "game_over":
			game.info.resetScore();
			game.info.resetStage();
			break;
		case "stage_clear":
			game.info.increaseStage();
			break;
		default:
			throw "must not happen";
		}
	}

Message = Class.create(Label, {
		//ゲームオーバー・ステージクリアを表示するクラス
		initialize: function() {
			Label.call(this, SIZE*3, SIZE);
			this.x = (WIDTH-this.width)/2;
			this.y = (HEIGHT-this.height)/2;
			this._frmIdx = { game_over: 0, stage_clear: 1 };
			this.color = "white";
			this.tl.hide();
		},
		change: function(state) {
			this.frame = this._frmIdx[state];
			if(this.frame == 0){
				this.text = "Game Over";
			}else if(this.frame == 1){
				this.text = "Clear!";
			}
		}
	});

MSG = Class.create(Label,{
  initialize:function(x,y,color){
    Label.call(this,x,y,color);
    this.x = x;
    this.y = y;
    this.color = color;
    this.font = "bold 30px Meiryo";
  }
});

function showMessage(state) {
		//動きのある物体をシーンから削除
		[game.paddle, game.ball, game.blocks].forEach(function(e, i, arr) {
			game.rootScene.removeChild(e);
		});
		//メッセージを表示後、ゲーム再開
		game.message.change(state);
		game.message.tl.fadeIn(30).delay(60).then(function() {
			this.tl.hide();
			restart(state);
		});
	}

function rotate_xy(x,y){
    var ua = navigator.userAgent;
    var VENDER_PREFIX='';
    if(x==null){x="50%"}
    if(y==null){y=x;}
    if (ua.indexOf('Opera') != -1) {
        VENDER_PREFIX = 'O';
    } else if (ua.indexOf('MSIE') != -1) {
        VENDER_PREFIX = 'ms';
    } else if (ua.indexOf('WebKit') != -1) {
        VENDER_PREFIX = 'webkit';
    } else if (navigator.product == 'Gecko') {
        VENDER_PREFIX = 'Moz';
    } else {
        VENDER_PREFIX = '';
    }
    this._style[VENDER_PREFIX + 'TransformOrigin'] = x + " " + y;
    //alert(x);
}
enchant.Entity.prototype.rotate_xy = rotate_xy;

Information = Class.create(Group, {
		//スコア・ステージ数を表示するラベルをまとめたクラス
		initialize: function() {
			Group.call(this);
			var that = this;
			[ ["score",     [SIZE*4, 10] ],
			  ["highScore", [10, 10] ],
			  ["stage",     [SIZE*7, 10] ] ].forEach(
				function(a, i, arr) {
					var key = a[0],
						pos = a[1];
					var label = new Label();
					label.color = "white";
					label.font = "16px sans-serif";
					label.x = pos[0];
					label.y = pos[1];
					that[key] = label;
					that.addChild(label);
				}
			);
			this._removedBlocks = 0;
			this.resetStage();
			this.resetScore();
			this.resetHighScore();
		},
		increaseScore: function() {
			this._removedBlocks += 1;
			this._score += this._removedBlocks*10;
			this._updateScore();
			if (this._score > this._highScore) {
				this._highScore = this._score;
				this._updateHighScore();
			}
		},
		increaseStage: function() {
			this._removedBlocks = 0;
			this._stage += 1;
			this._updateStage();
		},
		resetScore: function() {
			this._score = 0;
			this._updateScore();
		},
		resetHighScore: function() {
			this._highScore = 0;
			this._updateHighScore();
		},
		resetStage: function() {
			this._removedBlocks = 0;
			this._stage = 1;
			this._updateStage();
		},
		_updateScore: function() {
			this.score.text = "Score: "+this._score;
		},
		_updateHighScore: function() {
			this.highScore.text = "High Score: "+this._highScore;
		},
		_updateStage: function() {
			this.stage.text = "Stage: "+this._stage;
		}
	});