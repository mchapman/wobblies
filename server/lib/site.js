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
  response.render('index.jade', {
      thought_for_the_day : 'For every 1kg of weight you lose, you decrease the risk of diabetes by 9%'
    });
};

module.exports = site;
