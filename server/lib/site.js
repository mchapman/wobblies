var express = require('express');

var site = {}

site.initialise = function(app) {    
    app.use(express.static(__dirname + '/../static'));
	app.set('view engine', 'jade');
	app.set('view options', { layout: false });
    app.get('/', site.home);

    // Load configurations
    //var config_file = require('yaml-config');
    //exports = module.exports = config = config_file.readConfig('config/config.yaml');

    //var mongodb = require('mongodb');
    //var server = new mongodb.Server('127.0.0.1', 27017, {});  // Use local server as dodgy connectivity

    //var client = new mongodb.Db('wobblies', server);
    //site.thoughts_for_the_day = [];
    //client.open(function(err) {
    //    if (err) throw err;
    //    client.collection('facts', function(err, collection) {
    //        if (err) throw err;
    //        console.log('We can now spout facts');
    //        collection.find().toArray(function(err, results) {
    //            if (err) throw err;
    //            site.thoughts_for_the_day = results;
    //        });
    //    });
    //});
    return app;
};

site.home = function(request, response) {
  response.render('index.jade', {
      thought_for_the_day : "randemo text"
    });
};

module.exports = site;
