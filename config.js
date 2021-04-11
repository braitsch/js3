
module.exports = function(app) {

	require(__dirname + '/server/routes')(app);
	app.use(require('stylus').middleware({src: __dirname + '/public'}));

}