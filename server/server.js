var express = require('express');
var connectStreamS3 = require('connect-stream-s3');
var amazon = require('awssum').load('amazon/amazon');
var fs = require('fs');
var exec = require('child_process').exec;
var util = require('util');
var site = require('./lib/site');
var uploads = require('./lib/uploads');
var stream = require('./lib/stream');

// create the app and paths
var app = module.exports = express.createServer();
app.use(express.bodyParser());

uploads.initialise(app);
site.initialise(app);
stream.initialise(app);

app.listen(3000);

