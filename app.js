
/**
 * Module dependencies
 */

var express = require('express'),
  bodyParser = require('body-parser'),
  methodOverride = require('method-override'),
  errorHandler = require('errorhandler'),
  morgan = require('morgan'),
  routes = require('./routes'),
  api = require('./routes/api'),
  http = require('http'),
  path = require('path');

var app = module.exports = express();


/**
 * Configuration
 */

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/views');
app.set('view engine', 'jade');
app.use(morgan('dev'));
app.use(bodyParser());
app.use(methodOverride());
app.use(express.static(path.join(__dirname, 'public')));

var env = process.env.NODE_ENV || 'development';

// development only
if (env === 'development') {
  app.use(errorHandler());
}

// production only
if (env === 'production') {
  // TODO
}


/**
 * Routes
 */

// serve index and view partials
app.get('/', routes.index);
app.get('/partials/preload', function(req, res){
  var beers = [{"alcohol":4.5,"price":3,"_id":"53c6f9a66c2303373b944322","__v":0,"created":"2014-07-16T22:16:06.847Z","category":"pilsen","description":"Mijo de Rato","name":"Skol"},{"price":99,"alcohol":8,"_id":"53c9a37c353837acbf84951b","__v":0,"created":"2014-07-18T22:45:16.571Z","category":"","description":"","name":"TESTE"},{"__v":0,"_id":"53c6f51fae30b8d7392a8ce2","alcohol":4.5,"price":3,"created":"2014-07-16T21:56:47.946Z","category":"pilsen","description":"Mijo de Rato","name":"Skolzinha"}];
  res.render('partials/preload', {beers: beers});
});
app.get('/partials/:name', routes.partials);
app.get('/expose/:dir/:name', routes.expose);

// JSON API
app.get('/api/name', api.name);

// redirect all others to the index (HTML5 history)
app.get('*', routes.index);


/**
 * Start Server
 */

http.createServer(app).listen(app.get('port'), function () {
  console.log('Express server listening on port ' + app.get('port'));
});
