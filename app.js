
/**
 * A simple drawing & animation API for the JavaScript Canvas heavily modeled after AS3 & TweenLite
 * Author : Stephen Braitsch
 * More Info : https://github.com/braitsch/js3
 */

var express = require('express');
var app = express();
var http = require('http').Server(app);

app.locals.pretty = true;
app.set('port', process.env.PORT || 3000);
app.set('view engine', 'jade');
app.set('views', './app/server/views');
app.use(require('stylus').middleware({ src: __dirname + '/app/public' }));
app.use(express.static(__dirname + '/app/public'));
require('./app/server/routes')(app);

http.listen(app.get('port'), function()
{
	console.log('Express server listening on port', app.get('port'));
});