var express = require('express');
var fs = require('fs');
var knox = require('knox');

// obtain aws keys from environment variables (THESE MUST BE SET FOR UPLOAD TO SUCCEED)
var access = process.env.WOBBLIES_ACCESS_KEY;
var secret = process.env.WOBBLIES_ACCESS_SECRET;

var uploads = {}

// initialise routing mappings
uploads.initialise = function(app) {    
  app.post('/upload', uploads.upload);
  return app;
};

// handle upload post
uploads.upload = function(req, res) {
  // validate user  
  var user = req.headers.user;
  if(user == undefined) {
    console.log('missing user');
    return res.send('no user', 404);
  }

  // validate files
  if(req.files == undefined) {
      console.log('missing belly');
      return res.send('no files', 404);
  } 
  
  // determine uploaded file name
  console.log('belly received from: ' + user);
  var name = 'uploads/' + user + '/' + req.files.upload.lastModifiedDate.toJSON() + '.jpg';

  // create knox client for s3 upload
  var client = knox.createClient({ key: access, secret: secret, bucket: 'wobblies' });

  // read file and upload to bucket
  fs.readFile(req.files.upload.path, function(err, buf) {
    var s3req = client.put(name, { 'Content-Length': buf.length, 'Content-Type': 'text/plain' });

    s3req.on('response', function(s3res) {
      if (200 == s3res.statusCode) {
        console.log('saved to %s', s3req.url);
        return res.send();
      }
      return res.send();
    });
    s3req.end(buf);
  });    
};

module.exports = uploads;
