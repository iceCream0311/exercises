var http= require('http');
var url  = require('url');
/*监听8888接口，通过router.js页面的route方法跳转页面*/
function start (route,handle){
  function onRequest(request,response){
    var pathname=url.parse(request.url).pathname;
    console.log("Request for "+pathname+"recevied")
    route(handle,pathname,response,request);
    /*接收post的参数*/
    /*
      request.setEncoding("utf8")
      var postData="";

      request.addListener("data",function(postDataChunk){
      postData+=postDataChunk;
      console.log("postDataChunk______________"+postDataChunk)
      })
      request.addListener("end",function(){
      route(handle,pathname,response,postData)
      })
    */
    /*route(handle,pathname,response)*/
   /*
      response.writeHead(200,{"Content-Type":"text/plain"});
      var content=route(handle,pathname,response)
      response.write(content);
      response.end()
    */
  }
  http.createServer(onRequest).listen(8888)
  console.log("server has started")
}
exports.start=start;
