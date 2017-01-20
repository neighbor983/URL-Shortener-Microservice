var mongoose = require('mongoose');
var mongoURL = process.env.MONGOLAB_URI || "mongodb://localhost:27017/urls";

var state = {
  db: null,
};

exports.connect = function(url, done) {
  if (state.db) return done();
   mongoose.connect(mongoURL);
};
