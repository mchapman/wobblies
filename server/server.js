var express = require('express');

var site = require('./lib/site');
var uploads = require('./lib/uploads');
var stream = require('./lib/stream');

var port = process.argv[2];
if(port == undefined) {
  console.log('missing port');
  exit;
}

// create the app and paths
var app = module.exports = express.createServer();

// use body parser to simplify data access
app.use(express.bodyParser());

// initialise the routing handlers
uploads.initialise(app);
site.initialise(app);
stream.initialise(app);

// start the server and listen on 80
app.listen(port);
