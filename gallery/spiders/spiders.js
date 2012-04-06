
var speed = 1;
var spiders = [];
var wiggle = 12;
var maxBalls = 30;
var palettes = [	['#E0E4CC', '#FA6900', '#C02942', '#69D2E7'],
					['#E0E4CC', '#53777A', '#542437', '#ECD078']];
var colors = palettes[Math.floor(JS3.getRandomValue(palettes.length))];

function init()
{
	autoSize = false; canvas.setSize(winW, 250);
	canvas.drawClean = true;
	canvas.setSize = (winW, 200);
	$('cnvs').width(winW);
	canvas.background = colors[0];
	onStart();
}

function addBalls()
{
	var i = 5;
	while ( i-- ){
		var c = new JS3Circle();
			c.size = 10;
			c.stroke = 'none';			
			c.fillColor = colors[Math.round(JS3.getRandomValue(1, 2))];
			c.x = Math.random() * canvas.width;
			c.y = Math.random() * canvas.height;
			c.dirX = Math.round(Math.random()) == 0 ? -1 : 1;
			c.dirY = Math.round(Math.random()) == 0 ? -1 : 1;		
		canvas.addChild(c);
	}
	if (canvas.numChildren >= maxBalls) canvas.stop(addBalls);	
}

function move()
{	
	var i = canvas.numChildren;
	while ( i-- ){
		var b = canvas.getChildAt(i);
		if (b.x >= canvas.width-b.width/2 || b.x <= 0) b.dirX *=-1;
		if (b.y >= canvas.height-b.height/2 || b.y <= 0) b.dirY *=-1;
		b.x += speed * b.dirX;
		b.y += speed * b.dirY;
	}	
}

function makeSpider()
{	
	var s = canvas.getChildAtRandom();
		s.spider = true;
		s.strokeWidth = 3;
		s.strokeColor = colors[3];
	spiders.push(s);
	canvas.tween(s, 2, {size:50});	
	if (spiders.length > 4) canvas.stop(makeSpider);
}

function reach()
{
	for (var i = spiders.length - 1; i >= 0; i--){
		var s = spiders[i];
		for (var k = canvas.numChildren - 1; k >= 0; k--){
			var c = canvas.getChildAt(k);
			if (c.spider == undefined){
				if (Math.abs(s.x - c.x) < 75 && Math.abs(s.y - c.y) < 75) {
					var o = {	strokeWidth:2, strokeColor:colors[3], x1:s.x+s.width/2, y1:s.y+s.height/2, x2:c.x+c.width/2, y2:c.y+c.height/2,	
								xc:((s.x+c.x)/2)+(JS3.getRandomValue(-wiggle, wiggle)), 
								yc:((s.y+c.y)/2)+(JS3.getRandomValue(-wiggle, wiggle)) };
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
	canvas.run(addBalls, 1);
	canvas.run(move);
	canvas.run(makeSpider, 3);
	canvas.run(reach);
	canvas.run(changeBallDirection, 2);
}

function onStop()
{
	canvas.stop(addBalls);	
	canvas.stop(move);
	canvas.stop(makeSpider);	
	canvas.stop(reach);	
	canvas.stop(changeBallDirection);	
}