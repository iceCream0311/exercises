/*
 * @Author: Zyan
 * @Date:   2016-07-22 15:15:38
 * @Last Modified by:   Administrator
 * @Last Modified time: 2016-07-22 15:16:29
 */

$(function() {
    /*鼠标悬浮事件*/
    $(".list").on("mouseenter mouseleave", function(e) {
        var that = $(this); // 先把当前元素存起来
        var w = $(this).width(); // 得到盒子宽度
        var h = $(this).height(); // 得到盒子高度
        var x = (e.pageX - this.offsetLeft - (w / 2)) * (w > h ? (h / w) : 1);
        // 获取x值
        var y = (e.pageY - this.offsetTop - (h / 2)) * (h > w ? (w / h) : 1);
        // 获取y值
        var direction = Math.round((((Math.atan2(y, x) * (180 / Math.PI)) + 180) / 90) + 3) % 4; //direction的值为“0,1,2,3”分别对应着“上，右，下，左”
        // 将点的坐标对应的弧度值换算成角度度数值   0 1 2 3
        if (e.type == 'mouseenter') {
            switch (direction) {
                case 0: // 鼠标从上面进来
                    comeOn("top");
                    break;
                case 1: // 鼠标从上面进来
                    comeOn("right");
                    break;
                case 2: // 鼠标从上面进来
                    comeOn("bottom");
                    break;
                case 3: // 鼠标从上面进来
                    comeOn("left");
                    break;
            }
        } else {

            switch (direction) {
                case 0: // 鼠标从上面进来
                    getOut("top");
                    break;
                case 1: // 鼠标从上面进来
                    getOut("right");
                    break;
                case 2: // 鼠标从上面进来
                    getOut("bottom");
                    break;
                case 3: // 鼠标从上面进来
                    getOut("left");
                    break;
            }
        }

        function comeOn(str) {
            that.addClass("current");
            that.children("div").removeClass().addClass(str);
            // 先清除前的类， 留下现在的
        }

        function getOut(str) {
            that.removeClass("current");
            that.children("div").removeClass().addClass(str);
        }
    });
    // 渐入
    $(".envelope").addClass("animate");
    // 点击添加cookie
    $(".envelope").eq(0).click(function() {
        // setCookies("envelope","true");
        localStorage["envelope"] = true;

    })
    if (localStorage["envelope"]) {
        $(".envelope a").css({ "background": " url(../images/sprite.png) no-repeat 0 -96px", "height": "94" })
    }


})


/*//读取cookies
function getCookie(name)
{
    var arr,reg=new RegExp("(^| )"+name+"=([^;]*)(;|$)");

    if(arr=document.cookie.match(reg))

        return unescape(arr[2]);
    else
        return null;
}
// 设置cookies
function setCookies(name,value)
{
    var Days = 30;
    var exp = new Date();
    exp.setTime(exp.getTime() + Days*24*60*60*1000);
    document.cookie = name + "="+ escape (value) + ";expires=" + exp.toGMTString();
} */
