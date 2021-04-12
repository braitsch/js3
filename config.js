
module.exports = function(app, express) {

	app.use(require('stylus').middleware({src: __dirname + '/public'}));
// express.static must come after stylus middleware & before routes //
	app.use(express.static(__dirname + '/public'));
	require(__dirname + '/server/routes')(app);

}