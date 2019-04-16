(function (doc, win) {
    var docEl = doc.documentElement,
        resizeEvt = 'orientationchange' in window ? 'orientationchange' : 'resize',
        recalc = function () {
            var clientWidth = docEl.clientWidth;
            if (!clientWidth) return;
            docEl.style.fontSize = 100 * (clientWidth / 750) + 'px';
        };
    if (!doc.addEventListener) return;
    win.addEventListener(resizeEvt, recalc, false);
    doc.addEventListener('DOMContentLoaded', recalc, false);
})(document, window);
$(function () {
    var music = document.getElementById('music'),
        ms1 = document.getElementById('ms1'),
        ms2 = document.getElementById('ms2'),
        ms3 = document.getElementById('ms3'),
        ms4 = document.getElementById('ms4'),
        ms5 = document.getElementById('ms5');
    music.load();
    ms1.load();
    ms2.load();
    ms3.load();
    ms4.load();
    ms5.load();
    //bgMusic
    wx.config({
        debug: false
    });
    wx.ready(function () {
        function audioAutoPlay(id){
            var audio = document.getElementById(id),
                play = function(){
                    audio.play();
                    audio.pause();
                    document.removeEventListener("touchstart",play, false);
                };
            audio.play();
            audio.pause();
            document.addEventListener("WeixinJSBridgeReady", function () {
                play();
                music.play();
            }, false);
            document.addEventListener('YixinJSBridgeReady', function() {
                play();
                music.play();
            }, false);
            document.addEventListener("touchstart",play, false);
        }
        music.play();
        audioAutoPlay('ms1');
        audioAutoPlay('ms2');
        audioAutoPlay('ms3');
        audioAutoPlay('ms4');
        audioAutoPlay('ms5');
    });
    ~function () {
        var musicMenu = document.getElementById('musicMenu'),
            musicAudio = document.getElementById('music');

        musicMenu.addEventListener('click', function () {
            if (musicAudio.paused) {//->暂停
                musicAudio.play();
                musicMenu.className = 'music move';
                return;
            }
            musicAudio.pause();
            musicMenu.className = 'music';
        }, false);

        function controlMusic() {
            musicAudio.volume = 0.5;
            musicAudio.pause();
            musicAudio.addEventListener('canplay', function () {
                musicMenu.style.display = 'block';
                //console.log(1);
                musicMenu.className = 'music move';
            }, false);
        }
        window.setTimeout(controlMusic, 1000);
    }();
})

//显示遮罩层
function showMask() {
    $("#mask").css("height", $(document).height());
    $("#mask").css("width", $(document).width());
    $("#mask").show();
    $('body').css('position', 'fixed');
}
//隐藏遮罩层
function hideMask() {
    $("#mask").hide();
    $('body').css('position', 'unset');
}