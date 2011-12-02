

var canvas;
var speed = 1;
var maxBalls = 100;
var spiders = [];

function init()
{
	canvas = new JS3('cnvs');
	canvas.drawClean = true;
	canvas.background = '#CCC';
	onStart();	
	addButtons();
}

function addButtons()
{
	window.document.getElementById('start').addEventListener('click', onStart, false);	
	window.document.getElementById('stop').addEventListener('click', onStop, false);
	window.document.getElementById('save').addEventListener('click', canvas.save, false);		
}

function addBalls()
{
	var i = 5;
	while ( i-- ){
		var c = new JS3Circle();
			c.size = 3;
			c.alpha = 0;
			c.x = Math.random() * canvas.width;
			c.y = Math.random() * canvas.height;
			c.dirX = Math.round(Math.random()) == 0 ? -1 : 1;
			c.dirY = Math.round(Math.random()) == 0 ? -1 : 1;		
		canvas.addChild(c);
		canvas.tween(c, 3, {alpha:1});		
	}
	if (canvas.numChildren >= maxBalls) canvas.stop(addBalls);
}

function move()
{	
	var i = canvas.numChildren;
	while ( i-- ){
		var b = canvas.getChildAt(i);
		if (b.x >= canvas.width || b.x <= 0) b.dirX *=-1;
		if (b.y >= canvas.height || b.y <= 0) b.dirY *=-1;
		b.x += speed * b.dirX;
		b.y += speed * b.dirY;
	}	
}

function makeSpider()
{
	var s = canvas.getChildAtRandom();
		s.size = 20;
	spiders.push(s);
	if (spiders.length > 3) canvas.stop(makeSpider);
}

function reach()
{
	for (var i = spiders.length - 1; i >= 0; i--){
		var s = spiders[i];
		for (var k = canvas.numChildren - 1; k >= 0; k--){
			var c = canvas.getChildAt(k);
			if (Math.abs(s.x - c.x) < 75 && Math.abs(s.y - c.y) < 75){
				canvas.drawLine(s.x, s.y, c.x, c.y);
			}
		};
	};
}


// button handlers //

function onStart()
{
	canvas.run(addBalls, 30);
	canvas.run(move);
	canvas.run(makeSpider, 90);	
	canvas.run(reach);	
}

function onStop()
{
	canvas.stop(addBalls);	
	canvas.stop(move);
	canvas.stop(makeSpider);	
	canvas.stop(reach);	
}

window.onload = init;