'use strict';

var express = require('express');
var path = require('path');
var mongodb = require('mongodb').MongoClient;

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


app.listen(port,function(){
   console.log("app is listening on port: "+ port); 
});