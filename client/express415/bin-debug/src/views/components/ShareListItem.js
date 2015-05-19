var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var ShareListItem = (function (_super) {
    __extends(ShareListItem, _super);
    function ShareListItem(data) {
        _super.call(this);
        this._data = data;
        this.createView();
    }
    ShareListItem.prototype.createView = function () {
        this.graphics.beginFill(0xFFFAF4);
        this.graphics.drawRect(0, 0, 640, 100);
        this.graphics.endFill();
        RES.getResByUrl(this._data.sender_url, function (data, url) {
            if (null != data) {
                var pic = new egret.Bitmap(data);
                pic.anchorX = pic.anchorY = 0.5;
                pic.width = pic.height = 64;
                pic.x = 64;
                pic.y = 54;
                this.addChild(pic);
                var picBorder = Texture.create("border_64_png");
                picBorder.anchorX = picBorder.anchorY = 0.5;
                picBorder.x = 64;
                picBorder.y = 54;
                this.addChild(picBorder);
            }
        }, this, "image");
        var tf = new egret.TextField();
        tf.x = 140;
        tf.y = 38;
        tf.width = 330;
        tf.height = 46;
        tf.textAlign = egret.HorizontalAlign.LEFT;
        tf.lineSpacing = 10;
        tf.textFlow = [
            { text: this._data.sender_name + "送了您", style: { "textColor": 0x745645, "size": "25", "bold": true } },
            { text: "1", style: { "textColor": 0xf471ac, "size": "25", "bold": true } },
            { text: "个包子", style: { "textColor": 0x745645, "size": "25", "bold": true } },
            { text: "" }
        ];
        this.addChild(tf);
        var timeTf = new egret.TextField();
        timeTf.x = 520;
        timeTf.y = 45;
        timeTf.size = 20;
        //timeTf.stroke = 1;
        timeTf.width = 160;
        timeTf.height = 40;
        timeTf.textColor = 0x666666;
        timeTf.text = this._data.time;
        this.addChild(timeTf);
    };
    return ShareListItem;
})(egret.Sprite);
ShareListItem.prototype.__class__ = "ShareListItem";
//# sourceMappingURL=ShareListItem.js.map