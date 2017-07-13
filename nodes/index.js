var server= require('./server');
var router=require("./router");
var requestHandlers = require("./requestHandlers");
var handle = {}
/*路由匹配地址*/
handle["/"] = requestHandlers.start;
handle["/start"] = requestHandlers.start;
handle["/upload"] = requestHandlers.upload;
handle["/show"] = requestHandlers.show;

server.start(router.route, handle);
