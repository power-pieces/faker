var Extend = (function () {
    function Extend() {
    }
    /**
    * 调用外部方法
    */
    Extend.callWindow = function (funName) {
        if (null == window[funName]) {
            return null;
        }
        var result = window[funName]();
        return result;
    };
    Extend.callReadyShare = function (record) {
        if (null == window["readyShare"]) {
            return null;
        }
        var result = window["readyShare"](record);
        return result;
    };
    return Extend;
})();
Extend.prototype.__class__ = "Extend";
//# sourceMappingURL=Extend.js.map