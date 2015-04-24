

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
