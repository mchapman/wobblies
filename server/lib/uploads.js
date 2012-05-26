var uploads = {};

uploads.add = function(req, res) {
  console.log('uploading...');
  console.log(req.headers);
  var user = req.headers.user;
  if(user == undefined) {
    console.log('missing user');
    return res.send('no user', 404);
  }

  if(req.files == undefined) {
    console.log('missing belly');
    return res.send('no files', 404);
  } else {
    var name = 'uploads/' + user + '_' + req.files.upload.lastModifiedDate.toJSON() + '.jpg';
    console.log('belly received: ' + name);

    exec("mv " + req.files.upload.path + ' ' + name, function(err) {
      if(err) {
        console.log('failed to save: ' + err);
        return res.send('failed to save', 500);
      }
      return res.send();
    });
  }
};

module.exports = uploads;
