/*
 * @Author: alisa
 * @Date:   2017-12-14 14:23:12
 * @Last Modified by:   Administrator
 * @Last Modified time: 2017-12-14 17:18:55
 */
/*设置右上角广告图标*/
var adPlugin = ChimeePlayer.popupFactory({
    name: 'ad',
    className: 'ad',
    body: '<a href="https://jia.360.cn" target="_blank">' +
        '<img src="https://p.ssl.qhimg.com/t018fe4570caeb23e44.png">' +
        '<em>广告示例</em>' +
        '</a>',
    title: false,
    offset: '0px 0px auto auto',
    operable: true
})
ChimeePlayer.install(adPlugin)
ChimeePlayer.install(chimeePluginDanmu)
    /*设置播放视频*/
var player = new ChimeePlayer({
    wrapper: '.chimee-box', // video dom容器
    src: './1.mp4',
    autoplay: true,
    controls: true,
    isLive: false,
    box: 'native',
    plugin: [
        adPlugin.name, {
            name: chimeePluginDanmu.name,
            mode: 'canvas',
            updateByVideo: false,
            color: 'red'
        }
    ]
});
/*发送事件*/
$('.emit').click(function() {
        var text = $('.inpt').val();
        player.__dispatcher.plugins.chimeeDanmu.sendMsg({
            text: text,
            fontSize: 'small',
            color: 'red'
        });
        $('.inpt').val("")
    })
    /*点击回车触发*/
$(document).keydown(function(event) {
    if (event.keyCode == 13) {
        $(".emit").click();
    }
});
/*监听弹幕右键点击事件*/
player.on('danmuContextmenu', function(d) {
    console.log(d);
    if (d.length) {
        alert("右击了弹幕")
    }
})
