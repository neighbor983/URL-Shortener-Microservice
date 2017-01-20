
var mongoose = require('mongoose');
var urlList = require('./schema.js');

var mongoURL = process.env.MONGOLAB_URI || "mongodb://localhost:27017/urls";

var state = {
  db: null,
}

exports.connect = function(url, done) {
  if (state.db) return done()
   mongoose.connect(mongoURL);
}



exports.get = function(id, err){
    urlList.find({id: id}, function (err, docs) {
      if (err) {
          return {id: 'err', message:err};
      }

      if (docs && docs.length) {
        return {id: 200, message: docs[0].url};
      } else {
        return {id: 404, message: "Invalid Short URL"};
      }
    });
    
} 
      





