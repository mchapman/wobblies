var express = require('express');
var connectStreamS3 = require('connect-stream-s3');
var amazon = require('awssum').load('amazon/amazon');

var access = process.env.WOBBLIES_ACCESS_KEY;
var secret = process.env.WOBBLIES_ACCESS_SECRET;
var account = process.env.WOBBLIES_ACCOUNT;

// give each uploaded file a unique name (up to you to make sure they are unique, this is an example)
var uniquifyObjectNames = function(req, res, next) {
    for(var key in req.files) {
        req.files[key].s3ObjectName = '' + parseInt(Math.random(100000));
    }
}

// set up the connect-stream-s3 middleware
var s3StreamMiddleware = connectStreamS3({
    accessKeyId     : access,
    secretAccessKey : secret,
    awsAccountId    : account,
    region          : amazon.US_EAST_1,
    bucketName      : 'wobblies',
    concurrency     : 2, // number of concurrent uploads to S3 (default: 3)
});

// create the app and paths
var app = module.exports = express.createServer();

app.use(express.bodyParser());

// curl -F "fileupload=@package.json" http://127.0.0.1:3000/upload

app.post('/upload', function(req, res){
  console.log('uploading...');
  if(req.files == undefined) {
    console.log('missing files');
    res.send('no files', 404);
  } else {
    console.log(req.files);
    res.send();    
  }
});

app.post('/upload2', uniquifyObjectNames, s3StreamMiddleware, function(req, res, next) {
    for(var key in req.files) {
        console.log('File "' + key + '" uploaded as : ' + req.files[key].s3ObjectName);
    }
    res.redirect('/thanks');
});

app.listen(3000);

