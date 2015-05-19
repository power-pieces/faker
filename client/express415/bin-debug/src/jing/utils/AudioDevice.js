var AudioDevice = (function () {
    function AudioDevice() {
    }
    /**
    * 在第一次捕获到点击事件时，预加载声音文件，用这个的好处是第一次准备好以后，可以在IOS或ANDROID中无点击事件时播放声音
    */
    AudioDevice.prep = function (names, stage) {
        if (stage != null && names != null) {
            this._names = names;
            this._stage = stage;
            this._stage.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.prepTriggered, this);
        }
    };
    AudioDevice.prepTriggered = function () {
        this._stage.removeEventListener(egret.TouchEvent.TOUCH_BEGIN, this.prepTriggered, this);
        var names = this._names;
        var count = names.length;
        for (var i = 0; i < names.length; i++) {
            var name = names[i];
            if (null == this._soundDic[name]) {
                var sound = AudioDevice.getSound(name);
                sound.play();
                sound.pause();
                this._soundDic[name] = sound;
            }
        }
    };
    /**
    * 播放BGM
    */
    AudioDevice.playBGM = function (name) {
        var sound = AudioDevice.getSound(name);
        sound.type = egret.Sound.MUSIC;
        sound.play(true);
        this._music = sound;
        return sound;
    };
    /**
    * 播放音效
    */
    AudioDevice.playEffect = function (name) {
        var sound = this._soundDic[name];
        if (null == sound) {
            sound = AudioDevice.getSound(name);
        }
        sound.play();
        return sound;
    };
    AudioDevice.getSound = function (name) {
        var sound = RES.getRes(name);
        return sound;
    };
    AudioDevice._soundDic = {};
    AudioDevice._names = null;
    AudioDevice._stage = null;
    return AudioDevice;
})();
AudioDevice.prototype.__class__ = "AudioDevice";
//# sourceMappingURL=AudioDevice.js.map