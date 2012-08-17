var express = require('express')
  , routes = require('./routes')
  , http = require('http')
  , path = require('path')
  , fs = require('fs')
  , nowjs = require('now');

var app = express();

app.configure(function(){
  app.set('port', 3004);
  app.set('views', __dirname + '/views');
  app.set('view engine', 'jade');
  app.use(express.favicon());
  app.use(express.logger('dev'));
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(app.router);
  app.use(express.static(path.join(__dirname, 'public')));
});

app.configure('development', function(){
  app.use(express.errorHandler());
});

app.engine(".html", require("jade").__express);

app.get('/', function(req, res) {
  res.render('test.html');
  res.end();
});

app.get('/searchbylink', function(req, res) {
  var request = require('request');
  var url = "http://www.google.com/searchbyimage";
  url += "?h1=en";
  url += "&safe=off";
  url += "&bin=800";
  url += "&biw=1280";
  url += "&image_content=";
  url += "&filename=";
  url += "&image_url=" + encodeURIComponent(req.query["image_url"]);

  request({
    method: 'GET'
  , url: url
  , headers: {'User-Agent': 'Mozilla/5.0 (X11; Ubuntu; Linux x86_64; rv:14.0) Gecko/20100101 Firefox/14.0.1'}
  }, function (err, response, body) {
    if (!err && response.statusCode == 200) {
      res.writeHead(200);
      var index = body.indexOf("Best guess");
      if (index != -1) {
        var indexA = body.indexOf("<a", index);
        var start = body.indexOf(">", indexA) + 1;
        var end = body.indexOf("</a>", start);
        var key = body.substring(start, end).split();
        url = "http://www.ebay.com/sch/i.html?_trksid=p5197.m570.l1313&_sacat=0&_nkw=";
        url += encodeURIComponent(key[0]);
        for(var i = 1; i < key.length; i++) {
          url += encodeURIComponent("+" + key[1]);
        }
        request({
          method: 'GET'
        , url: url
        , headers: {'User-Agent': 'Mozilla/5.0 (X11; Ubuntu; Linux x86_64; rv:14.0) Gecko/20100101 Firefox/14.0.1'}
        }, function(err, response, body) {
          res.write(body);
          res.end();
        });
      }
    }
  });
});

var server = http.createServer(app);

server.listen(app.get('port'), function(){
  console.log("Express server listening on port " + app.get('port'));
});

var nowserver = nowjs.initialize(server);
nowserver.now.distributeMessage = function(url){
  console.log("rec");
  nowserver.now.receiveMessage(url);
};