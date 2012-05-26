var express = require('express');
var connectStreamS3 = require('connect-stream-s3');
var amazon = require('awssum').load('amazon/amazon');
var fs = require('fs');
var exec = require('child_process').exec;
var util = require('util');

/*
var access = process.env.WOBBLIES_ACCESS_KEY;
var secret = process.env.WOBBLIES_ACCESS_SECRET;
var account = process.env.WOBBLIES_ACCOUNT;
*/

// create the app and paths
var app = module.exports = express.createServer();

app.use(express.bodyParser());

// curl -F "upload=@package.json" -H "user: roy" http://127.0.0.1:3000/upload
app.post('/upload', function(req, res) {
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

      console.log('file saved');
      res.send();
    });
  }
});

app.get('/video/:user', function(req, res) {
  var user = req.headers.user;
  console.log('download belly video for ' + user);
  
  var path = 'videos/' + user + '.mp4';
  var stat = fs.statSync(path);
  var total = stat.size;
  if (req.headers['range']) {
    var range = req.headers.range;
    var parts = range.replace(/bytes=/, "").split("-");
    var partialstart = parts[0];
    var partialend = parts[1];

    var start = parseInt(partialstart, 10);
    var end = partialend ? parseInt(partialend, 10) : total-1;
    var chunksize = (end-start)+1;
    console.log('RANGE: ' + start + ' - ' + end + ' = ' + chunksize);

    var file = fs.createReadStream(path, {start: start, end: end});
    res.writeHead(206, { 'Content-Range': 'bytes ' + start + '-' + end + '/' + total, 'Accept-Ranges': 'bytes', 'Content-Length': chunksize, 'Content-Type': 'video/mp4' });
    file.pipe(res);
  } else {
    console.log('ALL: ' + total);
    res.writeHead(200, { 'Content-Length': total, 'Content-Type': 'video/mp4' });
    fs.createReadStream(path).pipe(res);
  }
});

app.listen(3000);

