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