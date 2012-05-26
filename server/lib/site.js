var site = {}

site.initialise = function(app) {    
  app.get('/', site.home);
  return app;
};

site.home = function(request, response) {
  return response.send('hello');
};

module.exports = site;
