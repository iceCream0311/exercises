// 多个属性运动框架  添加回调函数
function animate(obj, json, fn) { // 给谁    json
    clearInterval(obj.timer);
    obj.timer = setInterval(function() {
        var flag = true; // 用来判断是否停止定时器   一定写到遍历的外面
        for (var attr in json) {
            // 计算步长 用 target 位置 减去当前的位置  除以 10
            var current = 0;
            if (attr == "opacity") {
                current = Math.round(parseInt(getStyle(obj, attr) * 100)) || 0;
                console.log(current);
            } else {
                current = parseInt(getStyle(obj, attr)); // 数值
            }
            var step = (json[attr] - current) / 10; // 步长  用目标位置 - 现在的位置 / 10
            step = step > 0 ? Math.ceil(step) : Math.floor(step);
            //判断透明度
            if (attr == "opacity") { // 判断用户有没有输入 opacity
                if ("opacity" in obj.style) { // 判断 我们浏览器是否支持opacity
                    obj.style.opacity = (current + step) / 100;
                } else {
                    obj.style.filter = "alpha(opacity = " + (current + step) * 10 + ")";
                }
            } else if (attr == "zIndex") {
                obj.style.zIndex = json[attr];
            } else {
                obj.style[attr] = current + step + "px";
            }

            if (current != json[attr]) { // 只要其中一个不满足条件 就不应该停止定时器  这句一定遍历里面
                flag = false;
            }
        }
        if (flag) { // 用于判断定时器的条件
            clearInterval(obj.timer);
            if (fn) { // 当定时器停止了,动画就结束. 如果有回调，就应该执行回调
                fn();
            }
        }
    }, 10)
}

function getStyle(obj, attr) {
    if (obj.currentStyle) { // ie 等
        return obj.currentStyle[attr];
    } else {
        return window.getComputedStyle(obj, null)[attr]; // w3c 浏览器
    }
}
