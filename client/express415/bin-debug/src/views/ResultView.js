var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var ResultView = (function (_super) {
    __extends(ResultView, _super);
    function ResultView(args) {
        _super.call(this);
        this._hotZones = [
            new egret.Rectangle(400, 0, 233, 100),
        ];
        //跳过动画
        this._jumpEf = false;
        if (args == ViewName.EXCHANGE_VIEW) {
            this._jumpEf = true;
        }
        if (false == this._jumpEf) {
            this.updateData();
        }
        this.createView();
    }
    ResultView.prototype.updateData = function () {
        //扣体力
        DataCenter.remain -= 1;
        var fakeScore = DataCenter.killFake * DataCenter.cfg.fake_die_score;
        var realScore = DataCenter.killReal * DataCenter.cfg.real_die_score;
        var reward = fakeScore + realScore;
        if (reward < 0) {
            reward = 0;
        }
        if (reward > 0) {
            //增加赏金
            DataCenter.reward += reward;
        }
        DataCenter.killCount += DataCenter.killFake;
        NetManager.implicitCall("addReward", { isResult: 1, amount: reward, killCount: DataCenter.killFake });
    };
    ResultView.prototype.addListeners = function () {
        this.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.touchBeginHandler, this);
    };
    ResultView.prototype.removeListeners = function () {
        this.removeEventListener(egret.TouchEvent.TOUCH_BEGIN, this.touchBeginHandler, this);
    };
    ResultView.prototype.touchBeginHandler = function (e) {
        for (var i = 0; i < this._hotZones.length; i++) {
            if (this._hotZones[i].contains(e.localX, e.localY)) {
                this.hotZoneActive(i);
                break;
            }
        }
    };
    ResultView.prototype.hotZoneActive = function (index) {
        AudioDevice.playEffect("btn_click_mp3");
        switch (index) {
            case 0:
                console.log("兑换奖品");
                NoticeManager.sendNotice(new Notice(Notice.CHANGE_VIEW, ViewName.EXCHANGE_VIEW, ViewName.RESULT_VIEW));
                break;
        }
    };
    ResultView.prototype.createView = function () {
        this.addChild(Texture.create("result_bg_png"));
        this.touchEnabled = true;
        var bossFace = Texture.createMC("boos_face_mc", "boss_face");
        bossFace.x = 223;
        bossFace.y = 197;
        this.addChild(bossFace);
        bossFace.play(-1);
        var mc = Texture.createMC("punish_mc", "punish");
        this.addChild(mc);
        mc.play(-1);
        var tf;
        tf = Texture.createBitmapTF("pink_35_b_fnt");
        tf.text = "x" + DataCenter.reward;
        tf.x = 180;
        tf.y = 50;
        this.addChild(tf);
        var talk = Texture.create("boss_says_png");
        talk.x = 380;
        talk.y = 330;
        talk.anchorY = 1;
        talk.scaleX = 0;
        talk.scaleY = 0;
        this.addChild(talk);
        egret.Tween.get(talk).to({ scaleX: 1, scaleY: 1 }, 500);
    };
    ResultView.prototype.onAddedToStage = function () {
        if (this._jumpEf) {
            ViewManager.instance.showPanel(new ResultMenuPanel(), false);
        }
        else {
            this._timeoutKey = egret.setTimeout(function () {
                ViewManager.instance.showPanel(new RewardPanel(), true, true);
            }, this, 2000);
        }
    };
    ResultView.prototype.dispose = function () {
        egret.Tween.removeAllTweens();
        egret.clearTimeout(this._timeoutKey);
        _super.prototype.dispose.call(this);
    };
    return ResultView;
})(AView);
ResultView.prototype.__class__ = "ResultView";
//# sourceMappingURL=ResultView.js.map