window.onload=function(){
  var lis=document.querySelectorAll(".carousel-box ul li");
  var ols=document.querySelectorAll(".carousel-box ol li");
  var dom=document.querySelector(".carousel-box");
  var now=0;
  var domwidth=dom.clientWidth;//得到大盒子的宽度
  /*首先留下第一个盒子将其他盒子挪到最右侧*/
  for (var i = 0; i < lis.length; i++) {
      ols[i].index=i;
      if (i>0) {
         lis[i].style.left=domwidth+'px';
      }
  }
  /*左按钮*/
  document.querySelector(".carousel-box .left").onclick=function(){
      animate(lis[now],{left:domwidth})
      --now<0?now=lis.length-1:now;
       lis[now].style.left=-domwidth+'px';
       animate(lis[now],{left:0})
       changeCircle()
  }
  /*右按钮*/
  document.querySelector(".carousel-box .right").onclick=function(){
    rightClick()
  }
  /*小圆点点击事件*/
for (var j = 0; j < ols.length; j++) {
  ols[j].onclick=function(){
    if (this.index>now) {
      lis[this.index].left=domwidth+"px";
      animate(lis[now],{left: -domwidth});
    }else if (this.index<now) {
      lis[this.index].left=-domwidth+"px";
       animate(lis[now],{left: domwidth});
    }
    now=this.index;
    animate(lis[now],{left: 0});
    changeCircle()
  }
}
/*定时器*/
var timer=setInterval(rightClick,5000)
/*清除定时器*/
dom.onmouseover=function(){
  clearInterval(timer)
}
/*开启定时器*/
dom.onmouseout=function(){
  timer=setInterval(rightClick,5000)
}
/*右边按钮点击事件*/
function rightClick(){
  animate(lis[now],{left:-domwidth})
  ++now>lis.length-1?now=0:now;
  lis[now].style.left=domwidth+'px';
  animate(lis[now],{left: 0});
  changeCircle()
}
/*中间盒子变化*/
function changeCircle(){
  for (var i = 0; i < ols.length; i++) {
    ols[i].className="";
  }
  ols[now].className="active";
}

}



