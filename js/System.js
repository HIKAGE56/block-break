function restart(state) {
		//ゲーム再開処理
		[game.paddle, game.ball].forEach(function(e, i, arr) {
			e.reset();
			game.rootScene.addChild(e);
		});
		game.blocks = new Blocks();
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