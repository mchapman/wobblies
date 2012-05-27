var mongodb = require('mongodb');

var wobbliesdb = { };

wobbliesdb.configuration = function() {
  return {
    database: 'wobblies',
    host: process.env.WOBBLIES_MONGO_HOST,
    port: parseInt(process.env.WOBBLIES_MONGO_PORT, 10),
    user: process.env.WOBBLIES_MONGO_USER,
    password: process.env.WOBBLIES_MONGO_PASSWORD
  };
};

wobbliesdb.open = function(callback) {
  var config = wobbliesdb.configuration();
  var db = new mongodb.Db(config.database, new mongodb.Server(config.host, config.port, { ssl: false}), {});
  db.open(function(e, d) {
    if(e) {
      return callback(e, d);
    }     
    db.authenticate(config.user, config.password, function(e, d) {
      if(e) {
        return callback(e, d);
      }
      
      return callback(null, db);
    });
  });
};

module.exports = wobbliesdb;
