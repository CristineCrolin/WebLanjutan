const http = require("http");

http
    .createServer(function(req, res){
        res.writeHead(200, {"Content-Type": "text/html"});
        res.write("<H1>Module HTTP and Web</H1>");

        res.end();
})
.listen(3000);