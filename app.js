var express = require('express');
var app = express();
var path = require('path');
var bodyParser = require('body-parser');
var moment = require('moment');
var validUrl = require('valid-url');
var shortid = require('shortid');

var orgUrl;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));

app.use(express.static(path.join(__dirname,'public')));

app.get('/',function(req,res){
  res.render('index.html')
});

app.get('/new/:url(*)',function(req,res){
    var host = req.get('host');
     orgUrl= req.params.url;
    var shortUrl = "https://"+host+"/"+shortid.generate();

      if (validUrl.isUri(orgUrl)){
      var finalRes= {
       'original':orgUrl,
       'short':shortUrl
      };

      res.send(finalRes);

    } else {
       var error= {
        error: "Not a Valid Url"
       };

        res.send(error);
    }
  
});

    app.get('/:short', function(req,res){
      var short = req.params.short;
       res.redirect(orgUrl);
    });


var port = Number(process.env.PORT || 3000);
app.listen(port, function(){
  console.log("Server running on Port: "+port);
});