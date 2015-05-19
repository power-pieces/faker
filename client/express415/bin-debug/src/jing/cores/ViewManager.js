/**
*   显示界面管理
*/
var ViewManager = (function () {
    function ViewManager() {
        this._viewMap = {};
        this._nowView = null;
        this._mask = new Mask();
        this._panel = null;
    }
    Object.defineProperty(ViewManager, "instance", {
        //获取单例
        get: function () {
            if (null == ViewManager._instance) {
                ViewManager._instance = new ViewManager();
            }
            return ViewManager._instance;
        },
        enumerable: true,
        configurable: true
    });
    ViewManager.prototype.registView = function (name, cls) {
        this._viewMap[name] = cls;
    };
    /**
    *   展示指定的界面
    * viewName 界面名称
    * args 向目标界面传递的参数
    * clearPanel 是否清理面板
    */
    ViewManager.prototype.changeView = function (viewName, args, clearPanel) {
        if (args === void 0) { args = null; }
        if (clearPanel === void 0) { clearPanel = true; }
        if (clearPanel) {
            this.closePanel();
        }
        var view = new this._viewMap[viewName](args);
        if (null != this._nowView) {
            this._nowView.dispose();
        }
        view.addListeners();
        ViewManager.stage.addChildAt(view, 0);
        view.onAddedToStage();
        this._nowView = view;
        return view;
    };
    //显示指定面板
    ViewManager.prototype.showPanel = function (panel, isMask, lockMask, maskColor, maskAlpha) {
        if (isMask === void 0) { isMask = true; }
        if (lockMask === void 0) { lockMask = false; }
        if (maskColor === void 0) { maskColor = 0; }
        if (maskAlpha === void 0) { maskAlpha = 0.7; }
        if (this._panel) {
            this.closePanel();
        }
        var mask = this._mask;
        if (mask) {
            mask.init();
        }
        if (isMask) {
            mask.graphics.beginFill(maskColor, maskAlpha);
            mask.graphics.drawRect(0, 0, ViewManager.stage.stageWidth, ViewManager.stage.stageHeight);
            mask.graphics.endFill();
            ViewManager.stage.addChild(mask);
            mask.touchEnabled = true;
            mask.isLock = lockMask;
        }
        panel.addListeners();
        ViewManager.stage.addChild(panel);
        panel.onAddedToStage();
        this._panel = panel;
        return panel;
    };
    ViewManager.prototype.closePanel = function () {
        if (this._panel) {
            this._panel.dispose();
            this._panel = null;
            if (this._mask) {
                this._mask.init();
            }
        }
    };
    ViewManager.prototype.putToCenter = function (view) {
        if (view.anchorX == view.anchorY && view.anchorX == 0.5) {
            view.x = ViewManager.stage.stageWidth >> 1;
            view.y = ViewManager.stage.stageHeight >> 1;
        }
        else {
            view.x = (ViewManager.stage.stageWidth - view.width) >> 1;
            view.y = (ViewManager.stage.stageHeight - view.height) >> 1;
        }
    };
    ViewManager.stage = null;
    ViewManager._instance = null;
    return ViewManager;
})();
ViewManager.prototype.__class__ = "ViewManager";
//# sourceMappingURL=ViewManager.js.map