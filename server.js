var express = require('express');
var app = express();
var port = process.env.port || 8080;

app.get('/', function(req,res){
    res.send("Hello world!");
});


app.listen(port,function(){
   console.log("app is listening on port: "+ port); 
});