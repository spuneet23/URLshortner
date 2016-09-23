var express = require('express');
var app = express();
var path = require('path');
var bodyParser = require('body-parser');
var moment = require('moment');
var validUrl = require('valid-url');
var shortid = require('shortid');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));

app.use(express.static(path.join(__dirname,'public')));

app.get('/',function(req,res){
  res.render('index.html')
});

app.get('/new/:url(*)',function(req,res){
    var host = req.get('host');
    var orgUrl= req.params.url;
    var shortUrl = host+"/"+shortid.generate();

      if (validUrl.isUri(orgUrl)){
      var finalRes= {
       'original':orgUrl,
       'short':shortUrl
      };

      res.send(finalRes);
    } else {
        res.send('Not a URI');
    }
  
});

var port = Number(process.env.PORT || 3000);
app.listen(port, function(){
  console.log("Server running on Port: "+port);
});