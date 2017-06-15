 /**********点击显示***********/
    $(".changebox")[0].onclick=function(event){
      event.preventDefault();
      event.stopPropagation()
      $(".s-skin-layer")[0].style.display="block"
    }
    /**********填充内容***********/
    var sc=$(".s-skin-content");
    for (var i = 0; i < sc.length; i++) {
      str="";
      for (var j = 0; j < 6; j++) {
        str+='<li class="skin-img-item">';
        str+='  <img src="images/'+(j+1)+'.jpg">';
        str+='  <div class="s-skin-preview"></div>';
        str+='</li>';
      }
      sc[i].innerHTML=str
      sc[i].getElementsByTagName("li")[0].className="big-img-li"
    }
    /**********li的hover事件***********/
    var lis=$(".s-skin-content li")
    for (var z = 0; z < lis.length; z++) {
      lis[z].onmouseover=function(){
        $(".s-skin-preview-box img")[0].src=this.getElementsByTagName("img")[0].src
      }
      /**********点击选择事件***********/
      lis[z].onclick=function(event){
         event.stopPropagation()
        var srcstr=this.getElementsByTagName("img")[0].src;
        var srcstr1=srcstr.substring(srcstr.indexOf("images/"),srcstr.indexOf("."))
        var srcstr2=srcstr.substring(srcstr.indexOf("."),srcstr.length)
        srcstr=srcstr1+'(1)'+srcstr2;
        document.body.style.backgroundImage='url("'+srcstr+'")';
        for (var g = 0; g < $(".s-skin-preview").length; g++) {
          $(".s-skin-preview")[g].style.display="none"
        }
        this.getElementsByClassName("s-skin-preview")[0].style.display="block"
      }
    }
    /**********点击隐藏事件***********/
    window.onclick=function(){
      $(".s-skin-layer")[0].style.display="none"
    }
    /**********点击显示盒子阻止触发window点击事件***********/
    $(".s-skin-layer")[0].onclick=function(event){
      event.preventDefault();
      event.stopPropagation()
    }
    function $(dom){
      return document.querySelectorAll(dom)
    }