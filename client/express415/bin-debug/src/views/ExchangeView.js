var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var ExchangeView = (function (_super) {
    __extends(ExchangeView, _super);
    function ExchangeView(args) {
        _super.call(this);
        this._hotZones = [
            new egret.Rectangle(428, 767, 163, 91),
            new egret.Rectangle(428, 895, 163, 91),
            new egret.Rectangle(428, 1021, 163, 91),
            new egret.Rectangle(428, 1145, 163, 91),
            new egret.Rectangle(428, 1273, 163, 91),
            new egret.Rectangle(428, 1399, 163, 91),
            new egret.Rectangle(10, 10, 150, 80)
        ];
        this._args = args;
        this.createView();
    }
    ExchangeView.prototype.createView = function () {
        this._spr = new egret.Sprite();
        var bg = Texture.create("exchange_jpg");
        bg.touchEnabled = true;
        this._bg = bg;
        this._spr.addChild(bg);
        var scrollView = new egret.ScrollView(this._spr);
        this.addChild(scrollView);
        scrollView.height = ViewManager.stage.stageHeight;
        var rewardTF = new egret.BitmapText();
        var font = RES.getRes("pink_35_b_fnt");
        rewardTF.font = font;
        rewardTF.text = "x" + DataCenter.reward;
        rewardTF.x = 536;
        rewardTF.y = 40;
        this._spr.addChild(rewardTF);
        this._rewardTF = rewardTF;
        this.touchEnabled = true;
        this.touchChildren = true;
    };
    ExchangeView.prototype.addListeners = function () {
        this._bg.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.touchBeginHandler, this);
    };
    ExchangeView.prototype.removeListeners = function () {
        this._bg.removeEventListener(egret.TouchEvent.TOUCH_BEGIN, this.touchBeginHandler, this);
    };
    ExchangeView.prototype.touchBeginHandler = function (e) {
        for (var i = 0; i < this._hotZones.length; i++) {
            if (this._hotZones[i].contains(e.localX, e.localY)) {
                this.hotZoneActive(i);
                break;
            }
        }
        e.preventDefault();
        e.stopImmediatePropagation();
        e.stopPropagation();
    };
    ExchangeView.prototype.hotZoneActive = function (index) {
        AudioDevice.playEffect("btn_click_mp3");
        if (index >= 6) {
            NoticeManager.sendNotice(new Notice(Notice.CHANGE_VIEW, this._args, ViewName.EXCHANGE_VIEW));
            return;
        }
        var goodId = DataCenter.cfg.exchange_id[index];
        var need = DataCenter.cfg.exchange_need[index];
        if (DataCenter.reward < need) {
            ViewManager.instance.showPanel(new MessagePanel("您的赏银不足！", DataCenter.cfg.msg_delay));
            return;
        }
        NetManager.call("exchange", { goodId: goodId, need: need }, this.onExchange, this);
    };
    ExchangeView.prototype.onExchange = function (data, params) {
        if (0 == data) {
            ViewManager.instance.showPanel(new ExchangeResultPanel(2, params.goodId));
        }
        else {
            ViewManager.instance.showPanel(new ExchangeResultPanel(1, params.goodId));
            DataCenter.reward -= params.need;
            this._rewardTF.text = "x" + DataCenter.reward;
        }
    };
    return ExchangeView;
})(AView);
ExchangeView.prototype.__class__ = "ExchangeView";
//# sourceMappingURL=ExchangeView.js.map