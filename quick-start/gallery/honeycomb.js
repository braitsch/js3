
var stage;
var maxLines = 8; var thick=2; var n, drawStraight;
var palettes = ['#E0E4CC', '#53777A', '#542437', '#ECD078'];
//var palettes = ['#E0E4CC', '#FA6900', '#C02942', '#69D2E7'];

function init()
{
	stage = new JS3('my-canvas');
	stage.drawClean = false;
	stage.background = '#eee';
	addLine(); stage.run(addLine, 1); stage.run(draw);
}

function addLine()
{
	var c = new JS3Line();
		c.speed = JS3.getRandomValue(2, 5);
		c.x1 = Math.random()*stage.width;
		c.y1 = Math.random()*stage.height;
		c.x2 = c.x1 + c.speed;
		c.y2 = c.y1 + c.speed;
		c.tick = 0; c.dirX = c.dirY = 1;
		c.strokeWidth = thick;				
		c.strokeColor = getNextColor();	
	stage.addChild(c);
	if (stage.numChildren >= maxLines) stage.stop(addLine);
}

function getNextColor()
{
	n < palettes.length-1 ? n++ : n=0; return palettes[n];
}

function draw()
{
	for (var i=0; i < stage.numChildren; i++) {
		var k = stage.getChildAt(i);
			k.tick += Math.round(Math.random()*4);
			k.x1 = k.x2; k.y1 = k.y2;
			k.x2 += k.dirX * k.speed; k.y2 += k.dirY * k.speed;
		if (k.x2 > stage.width || k.x2 < 0 || (k.tick%2==0 && !drawStraight)) k.dirX *=-1;
		if (k.y2 > stage.height || k.y2 < 0 || (k.tick%4==0 && !drawStraight)) k.dirY *=-1;			
	};
}

window.onload = init;