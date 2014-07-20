
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
  var url = 'http://api.openbeerdatabase.com/v1/beers.json';
  http.get(url, function(response){
    response.setEncoding('utf8');
    var body = '';
    response.on('data', function(chunk){
        // console.log(chunk);
        body += chunk;
        // res.render('partials/preload', {beers: chunk});
    });
    response.on('end', function () {
      var bodyJSON = JSON.parse(body)
      console.log('body', bodyJSON);
      res.render('partials/preload', {beers: bodyJSON.beers});
    });

  });

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
