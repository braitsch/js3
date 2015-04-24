
var express = require('express');
var app = express();
app.locals.pretty = true;
app.set('port', 8080);
app.set('view engine', 'jade');
app.set('views', './app/server/views');
app.set('env', process.env.NODE_ENV || 'localhost');
app.use(require('stylus').middleware({ src: __dirname + '/app/public' }));
app.use(express.static(__dirname + '/app/public'));
require('./app/server/routes')(app);

var server = app.listen(app.get('port'), function (req, res) {
	console.log("Express server listening on port %d in %s mode", app.get('port'), app.settings.env);
})