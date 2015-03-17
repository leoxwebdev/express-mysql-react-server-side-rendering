var express = require('express'),
 app = express(),
 path = require('path'),
 favicon = require('serve-favicon'),
 logger = require('morgan'),
 browserify  = require('browserify'),
 cookieParser = require('cookie-parser'),
 bodyParser = require('body-parser'),
 reactify    = require('reactify'),
 ECT = require('ect');

//page setting
var routes = require('./routes/index');

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.engine('ect', ECT({ watch: true, root: __dirname+'/views', ext: '.ect'}).render);
app.set('view engine', 'ect');

// uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);

app.get('/bundle.js', function(req, res){
  console.log("bundle");
  res.setHeader('Content-type', 'text/javascript');
  browserify('./template/indexForBrowser')
    .transform({ harmony: true }, reactify)
    .bundle()
    .pipe(res);
})

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);  
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;
