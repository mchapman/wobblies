var express = require('express');
var wobbliesdb = require('./wobbliesdb.js');
var site = {}

site.initialise = function(app) {    
    app.use(express.static(__dirname + '/../static'));
    app.set('view engine', 'jade');
    app.set('view options', { layout: false });
    app.get('/', site.home);

    site.thoughts_for_the_day = [];
    wobbliesdb.open(function(err, client) {
        if (err) throw err;
        client.collection('facts', function(err, collection) {
            if (err) throw err;
            collection.find().toArray(function(err, results) {
                if (err) throw err;
                site.thoughts_for_the_day = results;
            });
        });
    });

    return app;
};

site.home = function(request, response) {
  response.render('index.jade', {
      thought_for_the_day : site.thoughts_for_the_day[Math.floor(Math.random()*site.thoughts_for_the_day.length)].txt
    });
};

module.exports = site;
