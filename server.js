'use strict';

var express = require('express');
var app = express();
var fs = require('fs');
var path = require('path');
var db = require('./db.js');
var urlList = require('./schema.js');
var port = process.env.PORT || 3500;
var mongoURL = process.env.MONGODB_URI || "mongodb://localhost:27017/urls";
var siteUrl = "https://vast-stream-33440.herokuapp.com/"

db.connect(mongoURL, function(err) {
  if (err) {
    console.log('Unable to connect to Mongo.');
    process.exit(1);
  } 
});


app.listen(port, function(){
  console.log("Listening on port: " + port);
});


app.get('/', function(req, res) {
  var fileName = path.join(__dirname, 'index.html');
  res.sendFile(fileName, function (err) {
    if (err) {
      console.log(err);
      res.status(err.status).end();
    }
    else {
      console.log('Sent:', fileName);
    }
  });
});

app.get('/:id', function(req, res) {
  var id = parseInt(req.params.id,10);
  if(Number.isNaN(id)) {
    res.status(404).send("Invalid Short URL");
  } else {
       
    urlList.find({id: id}, function (err, docs) {
      if (err) res.status(404).send(err);
      if (docs && docs.length) {
        res.redirect(docs[0].url);
      } else {
        res.status(404).send("Invalid Short URL");
      }
    });

  }
});


app.get('/new/*?', function(req,res) {
  var validUrl = require('valid-url');
  var theUrl = req.params[0];

  if(theUrl && validUrl.isUri(theUrl)) {
    urlList.find({url: theUrl}, function (err, docs) {
      if(docs && docs.length) {
        res.status(201).json({
          "original_url": theUrl,
          "short_url": siteUrl + docs[0].id
        });
      }
    });


    urlList.create({url: theUrl}, function (err, myUrl) {
      if (err) {
        return handleError(res, err);
      }
      return res.status(201).json({
        "original_url": theUrl,
        "short_url": siteUrl + myUrl.id
      });
    });
  } else {
    res.status(400).json({
      error: "URL Invalid"
    });
  }

});

function handleError(res, err) {
  return res.status(500).send(err);
}
