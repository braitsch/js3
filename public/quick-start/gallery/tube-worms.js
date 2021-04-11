
var stage;
var numWorms = 50;
var strkWidth = 1;
var startX, startY;
var energy = 6;
var minSize = 20; 
var maxSize = 50;
var fillColor = '#555';
var strkColor, bkgdColor, rndmColor, timeInt;

function init()
{
	stage = new JS3('my-canvas');
	stage.drawClean = false;
// clicking on the canvas will stop current worm and generate a new one //	
	stage.click = onCanvasClick;
	stage.interactive = true;
// make worms & background a random color //
	rndmColor = JS3.getRandomValue() <= .5 ? true : false;	
	if (rndmColor){
		bkgdColor = '#EEE'; strkColor = '#555';
	}	else{
		bkgdColor = '#777'; strkColor = '#EEE';		
	}
	stage.background = bkgdColor;	
	timeInt = setTimeout(draw, 1000);		
}

function onCanvasClick(e)
{	
// stop any active worms from growing //
	while (stage.numChildren) stage.removeChildAt(0);
	draw(e.x, e.y);
}

function draw(x, y)
{
	startX = x || JS3.getRandomValue(30, stage.width-30);
	startY = y || JS3.getRandomValue(10, stage.height-10);
	for (var i=0; i < numWorms; i++) addWorm(); stage.run(grow);
	if (timeInt) clearTimeout(timeInt);
	timeInt = setTimeout(draw, JS3.getRandomValue(500, 3000));	
}

function addWorm()
{
	var c = new JS3Circle();
		c.size = JS3.getRandomValue(minSize, maxSize);
		c.x = startX - c.size/2;
		c.y = startY - c.size/2;
		c.fillColor = rndmColor ? JS3.getRandomColor() : fillColor;
		c.strokeColor = strkColor;
		c.strokeWidth = strkWidth;
		c.dirX = Math.random() <= .5 ? - 1 : 1;
		c.dirY = Math.random() <= .5 ? - 1 : 1;	
	stage.addChild(c);	
}

function grow()
{
	for (var i=0; i < stage.numChildren; i++) {
		var k = stage.getChildAt(i);
			k.size -= (11-energy) / 10;
			k.speed = k.size / 10;
			k.x += k.speed * k.dirX;
			k.y += k.speed * k.dirY;
		if (Math.random() <= .1) k.dirX *=-1;
		if (Math.random() <= .1) k.dirY *=-1;
		if (k.size < 1) stage.removeChildAt(i);
	};
	if (stage.numChildren == 0) stage.stop(grow);
}

window.onload = init;