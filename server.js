'use strict';

var express = require('express');
var path = require('path');
var mongodb = require('mongodb').MongoClient;
var validator = require('validator');


var mongoURL = process.env.MONGOLAB_URI;
var port = process.env.PORT || 8080;

var app = express();


mongodb.connect(mongoURL, function (err, db) {
  if (err) {
    console.log('Unable to connect to the mongoDB server. Error:', err);
  } else {
    console.log('Connection established to', mongoURL);

    // do some work here with the database.

    //Close connection
    db.close();
  }
});


app.get('/', function(req,res){
    res.sendFile(path.join(__dirname + '/index.html'));
});

app.get('/new/*?', function(req,res) {
    var url = req.params[0];
    var isValidUrl = validator.isUrl(url);
    
    var urls = {};
    
    if(!isValidUrl){
        urls = {
            "error": "This is an invalid url url, make sure you have entered the url correctly."
        };
    } else {
        urls = {
            "long_url" : url,
            "short_url": ""
        };
    }
    
    res.send(urls);
});


app.listen(port,function(){
   console.log("app is listening on port: "+ port); 
});