
var express = require('express');
global.app = express();
app.locals.pretty = true;
app.set('view engine', 'jade');
app.set('views', './app/server/views');
app.set('env', process.env.NODE_ENV || 'localhost');
app.use(require('stylus').middleware({ src: __dirname + '/app/public' }));
app.use(express.static(__dirname + '/app/public'));
app.locals.version = '0.3.2';
require('./app/server/routes');

var server = app.listen(3000, function (req, res) {
	console.log('Express app listening at http://%s:%s', server.address().address, server.address().port)
})