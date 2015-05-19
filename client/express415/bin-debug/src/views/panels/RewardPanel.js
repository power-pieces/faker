var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
/**
* 赏金显示面板
*/
var RewardPanel = (function (_super) {
    __extends(RewardPanel, _super);
    function RewardPanel() {
        _super.call(this);
        this.createView();
    }
    RewardPanel.prototype.createView = function () {
        this.addChild(Texture.create("reward_png"));
        var fakeScore = DataCenter.killFake * DataCenter.cfg.fake_die_score;
        var realScore = DataCenter.killReal * DataCenter.cfg.real_die_score;
        var reward = fakeScore + realScore;
        if (reward < 0) {
            reward = 0;
        }
        var front = Texture.create("reward_front_png");
        var behind = Texture.create("reward_behind_png");
        var rewardTF = Texture.createBitmapTF("pink_80_b_fnt");
        rewardTF.text = reward.toString();
        var hgroup = new HGroup([front, rewardTF, behind], 2, 10);
        this.addChild(hgroup);
        hgroup.width;
        hgroup.anchorX = 0.5;
        hgroup.anchorY = 0.5;
        hgroup.y = 360;
        hgroup.x = 287;
        //rewardTF.anchorX = 0;
        //rewardTF.anchorY = 1;
        //rewardTF.x = 260;
        //rewardTF.y = 388;
        //this.addChild(rewardTF);
        //front.x = rewardTF.x - 10;
        //behind.x = front.x + rewardTF.width + 20;
        //front.y = behind.y = rewardTF.y;
        var tf;
        tf = Texture.createBitmapTF("white_40_b_fnt", "+" + fakeScore, 0.5, 1);
        tf.x = 360;
        tf.y = 447;
        this.addChild(tf);
        tf = Texture.createBitmapTF("white_40_b_fnt", "-" + (realScore * -1).toString(), 0.5, 1);
        tf.x = 360;
        tf.y = 505;
        this.addChild(tf);
        this.alpha = 0;
        this.scaleX = 0;
        this.scaleY = 0;
        this.anchorX = this.anchorY = 0.5;
        ViewManager.instance.putToCenter(this);
    };
    RewardPanel.prototype.onAddedToStage = function () {
        AudioDevice.playEffect("score_show_mp3");
        egret.Tween.get(this).to({ alpha: 1, scaleX: 1, scaleY: 1 }, 500).wait(2000, true).to({ alpha: 0, scaleX: 0, scaleY: 0 }, 500).call(this.onHidden, this);
    };
    RewardPanel.prototype.onHidden = function () {
        this.dispose();
        ViewManager.instance.showPanel(new ResultMenuPanel(), false);
    };
    return RewardPanel;
})(AView);
RewardPanel.prototype.__class__ = "RewardPanel";
//# sourceMappingURL=RewardPanel.js.map