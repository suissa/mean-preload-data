
/*
 * GET home page.
 */

exports.index = function(req, res){
  res.render('index');
};

exports.partials = function (req, res) {
  var name = req.params.name;
  res.render('partials/' + name);
};

exports.expose = function (req, res) {
  var dir = req.params.dir;
  var name = req.params.name;
  res.render(dir + '/' + name);
};










