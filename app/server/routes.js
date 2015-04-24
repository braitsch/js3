
module.exports = function(app) {

	app.get('/', function(req, res)
	{
		res.render('index');
	});

	app.get('/getting-started', function(req, res)
	{
		res.render('getting-started');
	});

	app.get('/drawing', function(req, res)
	{
		res.render('drawing');
	});
	
	app.get('/images-and-text', function(req, res)
	{
		res.render('images-and-text');
	});

	app.get('/tweening', function(req, res)
	{
		res.render('tweening');
	});
	
	app.get('/mouse-events', function(req, res)
	{
		res.render('mouse-events');
	});

	app.get('/api', function(req, res)
	{
		res.render('api');
	});

	app.get('/gallery', function(req, res)
	{
		res.render('gallery');
	});

}