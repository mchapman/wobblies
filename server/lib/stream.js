var express = require('express');
var connectStreamS3 = require('connect-stream-s3');
var amazon = require('awssum').load('amazon/amazon');
var fs = require('fs');
var exec = require('child_process').exec;
var util = require('util');

var stream = {}

// initialise routing mappings
stream.initialise = function(app) {    
  app.get('/video/:user', stream.get);
  return app;
};

/*
Sample HTML Video tag
<video width="320" height="240" controls="controls">
  <source src="http://localhost:3333/video/roy" type="video/mp4" />
  Your browser does not support the video tag.
</video>
*/

// get handler
stream.get = function(req, res) {
  var user = req.params.user;
  // check user is in headers
  /*
  var user = req.headers.user;
  if(user == undefined) {
    console.log('missing user');
    return res.send('no user', 404);
  }
  */

  console.log('download belly video for ' + user);

  // stream hardcoded mp4 from disk for now
  var path = 'videos/sample.mp4';  
  //var path = 'videos/' + user + '.mp4';
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
};

// export modules
module.exports = stream;
