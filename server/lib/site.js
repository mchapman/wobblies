var express = require('express');

var site = {}

site.initialise = function(app) {    
  app.use(express.static(__dirname + '/../static'));
	app.set('view engine', 'jade');
	app.set('view options', { layout: false });
  app.get('/', site.home);
  return app;
};

site.home = function(request, response) {
  response.render('home');
};

module.exports = site;
