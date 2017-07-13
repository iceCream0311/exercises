/*本页面写的是路由页面要展示的东西*/
var querystring=require("querystring"),
    fs=require("fs"),
    formidable=require("formidable");
   /* 提交图片html*/
function start(response) {
  console.log("Request handler 'start' was called.");
  var body='<!DOCTYPE html>'
        +'<html lang="en">'
        +'    <head>'
        +'        <meta http-equiv="Content-Type" content="text/html" charset="utf-8">'
        +'    </head>'
        +'    <body>'
        +'    <form action="/upload" enctype="multipart/form-data" method="post">'
        +'      <input type="file" name="upload">'
        +'      <input type="submit" value="Upload file">      '
        +'    </form>'
        +'    </body>'
        +'</html>';
      response.writeHead(200, {"Content-Type": "text/html"});
      response.write(body);
      response.end();

  /*异步：exec("ls -lah", function (error, stdout, stderr) {
    response.writeHead(200, {"Content-Type": "text/plain"});
    response.write(stdout);
    response.end();
  });*/
  /*简单的显示：var content ="empty";
  exec("find/",function(error,stdout,stderr){
    content =stdout;
     return content
  })*/

}
/* 接收并展示至html*/
function upload(response,request) {
  console.log("Request handler 'upload' was called.");
  var form =new formidable.IncomingForm();
  form.uploadDir='tmp';//由于windows系统路径问题必须要
  form.parse(request,function(error,fields,files){
    console.log("parsing done");
    fs.renameSync(files.upload.path,'tmp/test.png')
    response.writeHead(200, {"Content-Type": "text/html"});
    response.write("trceices image<br/>");
    response.write("<img src='/show' />");
    response.end();
  })

}
/*接收图片*/
function show(response){
  console.log("Request handler 'show' was called")
  fs.readFile('tmp/test.png',"binary",function(error,file){
    if (error) {
      response.writeHead(500,{"Content-Type":"text/plain"})
      response.write(error+'\n');
      response.end()
    }else{
      response.writeHead(200,{"Content-Type":"image/png"})
      response.write(file,"binary");
      response.end()
    }

  })
}

exports.start = start;
exports.upload = upload;
exports.show = show;