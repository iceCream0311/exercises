$(function() {
    var t_img; // 定时器
    var isLoad = true; // 控制变量
    var baseHeight = 170;
    var baseWidth = 200;
    var baseNumber = 3;
    resizeFn();

    /*屏幕尺寸变化更改图片个数并重新计算*/
    window.onresize = function() {
        resizeFn()
    }

    function resizeFn() {
        deviceWidth = $("body").width();
        if (deviceWidth > 960) {
            baseHeight = 170
            baseNumber = Math.ceil(960 / 200);
        } else if (deviceWidth > 1920) {
            baseHeight = 250;
            baseNumber = Math.ceil(1920 / 300);
        } else if (deviceWidth < 960) {
            baseHeight = 100;
            baseNumber = 3
        }
        $("body").html("")
        creatImage(baseHeight, baseNumber)
        finalheight()
    }
    /*最终高度调整方法*/
    function finalheight() {
        var imgIndex = $("img").length - 1;
        $("img").eq(imgIndex).on('load', function() {
            for (var j = 0; j < $(".img_container").length; j++) {
                divW = $(".img_container").eq(j).width();
                /*计算调整高度=现在图片高度/盒子宽度*浏览器宽度*/
                var currentHeight = baseHeight / divW * deviceWidth;
                $(".img_container").eq(j).children("img").height(currentHeight)
            }
        })
    }

    /*创建图片方法*/
    function creatImage(baseHeight, baseNumber) {
        var container = $('<div></div>');
        for (var i = 0; i < nameArr.length; i++) {
            if (i % baseNumber == 0) { //将图片添加到盒子内，并创建新的图片容器
                $("body").append(container);
                container = $('<div></div>');
                container.height(baseHeight);
                container.addClass('img_container')
            }
            //图片
            var img = $('<img src="" />')
            img[0].src = `./nice/${nameArr[i]}`
            img.height(baseHeight)
            container.append(img)
        }
    }
})
