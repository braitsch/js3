

var canvas;
var speed = 1;
var spiders = [];
var maxBalls = 100;
var colors = [	['0xB9D7D9', '0x668284', '0x2A2829', '0x493736', '0x7B3B3B'],
				['0xEAFA70', '0x8C6B07', '0x403001', '0x292004', '0x1F1702'] ];

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
			c.color = '#ffff00';
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
		s.color = '#668284';
		s.spider = true;
	spiders.push(s);
	if (spiders.length > 2) canvas.stop(makeSpider);
}

function reach()
{
	for (var i = spiders.length - 1; i >= 0; i--){
		var s = spiders[i];
		for (var k = canvas.numChildren - 1; k >= 0; k--){
			var c = canvas.getChildAt(k);
			if (c.spider == undefined){
				if (Math.abs(s.x - c.x) < 75 && Math.abs(s.y - c.y) < 75) {
					var o = {	strokeWidth:1, strokeColor:'#EAFA70', x1:s.x, y1:s.y, x2:c.x, y2:c.y,	
								cx:((s.x+c.x)/2)+(JS3.getRandomValue(-10, 10)), cy:((s.y+c.y)/2)+(JS3.getRandomValue(-10, 10)) };
					canvas.drawArc(o);									
				};
			};
		};
	};
}

function changeBallDirection()
{
	var i = Math.ceil(canvas.numChildren / 10);
	while ( i-- ){
		var b = canvas.getChildAtRandom();
		if (b.spider == undefined) {
			b.dirX *= -1;
			b.dirY *= -1;
		}
	}	
}

// button handlers //

function onStart()
{
	canvas.run(addBalls, 30);
	canvas.run(move);	
	if (spiders.length < 3) canvas.run(makeSpider, 90);		
	canvas.run(reach);
	canvas.run(changeBallDirection, 60);	
}

function onStop()
{
	canvas.stop(addBalls);	
	canvas.stop(move);
	canvas.stop(makeSpider);	
	canvas.stop(reach);	
	canvas.stop(changeBallDirection);	
}

window.onload = init;