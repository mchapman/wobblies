var express = require('express');
var connectStreamS3 = require('connect-stream-s3');
var amazon = require('awssum').load('amazon/amazon');
var fs = require('fs');
var exec = require('child_process').exec;

var access = process.env.WOBBLIES_ACCESS_KEY;
var secret = process.env.WOBBLIES_ACCESS_SECRET;
var account = process.env.WOBBLIES_ACCOUNT;

// create the app and paths
var app = module.exports = express.createServer();

app.use(express.bodyParser());

// curl -F "upload=@package.json" -H "user: roy" http://127.0.0.1:3000/upload

app.post('/upload', function(req, res){
  console.log('uploading...');
  console.log(req.headers);
  var user = req.headers.user;
  if(user == undefined) {
    console.log('missing user');
    return res.send('no user', 404);
  }

  if(req.files == undefined) {
    console.log('missing belly');
    return res.send('no files', 404);
  } else {
    var name = 'uploads/' + user + '_' + req.files.upload.lastModifiedDate.toJSON() + '.jpg';
    console.log('belly received: ' + name);

    exec("mv " + req.files.upload.path + ' ' + name, function(err) {
      if(err) {
        console.log('failed to save: ' + err);
        return res.send('failed to save', 500);
      }
      return res.send();
    });
  }
});

app.listen(3000);

