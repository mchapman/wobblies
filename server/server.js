var express = require('express');

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

