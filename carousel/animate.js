function animate(obj,json,fn) {
    clearInterval(obj.timer);
    obj.timer = setInterval(function() {
        var flag = true;  //用来判断是否停止定时器一定写到遍历的外面
        for(var attr in json){   // attr属性 json[attr]值
           /* 当前的位置*/
            var current = 0;
            if(attr == "opacity"){
                current = Math.round(parseInt(getStyle(obj,attr)*100)) || 0;
            }else{
                current = parseInt(getStyle(obj,attr));
            }
            /*步长  (用目标位置 - 现在的位置 / 10)*/
            var step = ( json[attr] - current) / 10;
            step = step > 0 ? Math.ceil(step) : Math.floor(step);
            /*判断透明度*/
            if(attr == "opacity"){
                if("opacity" in obj.style){// 判断 我们浏览器是否支持opacity
                    obj.style.opacity = (current + step) /100;
                }else{
                    obj.style.filter = "alpha(opacity = "+(current + step)* 10+")";
                }
            }
            else if(attr == "zIndex")
            { obj.style.zIndex = json[attr];}
            else{obj.style[attr] = current  + step + "px" ;}
            if(current != json[attr]) {/*只要其中一个不满足条件 就不应该停止定时器*/
                flag =  false;
            }
        }
        /*用于判断定时器的条件*/
        if(flag){
            clearInterval(obj.timer);
            if(fn){   //当定时器停止了,动画就结束了;如果有回调，就应该执行回调
                fn();
            }
        }
    },10)
}
function getStyle(obj,attr) {
    if(obj.currentStyle){  // ie 等
        return obj.currentStyle[attr];  // 返回传递过来的某个属性
    }else{
        return window.getComputedStyle(obj,null)[attr];
    }
}