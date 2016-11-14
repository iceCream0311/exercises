  /*
   * @Author: Zyan
   * @Date:   2016-07-22 15:15:38
   * @Last Modified by:   Administrator
   * @Last Modified time: 2016-07-22 15:31:10
   */
  (function() {
      var str = '<div id="advert">';
      str += '<div class="envelope">';
      str += '<a href="album_cover.html" title="邓紫棋专辑"></a> <span>×</span></div>';
      $("body").append(str)
  })()

  // 渐入
  $(function() {
      $(".envelope").addClass("animate");
      $(".envelope").click(function() {
          /*本地存储*/
          localStorage["envelope1"] = true;
          event.stopPropagation();
      });

      $("#advert span").click(function() {
          $(this).parent().hide();
          event.stopPropagation();

      })
      if (localStorage["envelope1"]) {
          $(".envelope a").css({ "background": " url(../images/sprite.png) no-repeat 0 -143px", "height": "66px", "background-size": "77px 224px" })
      };

  })
