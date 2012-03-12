
var steps = 0;
var maxBalls = 100;
var n=0;
var palettes = ['#E0E4CC', '#53777A', '#542437', '#ECD078'];
//var palettes = ['#E0E4CC', '#FA6900', '#C02942', '#69D2E7'];

function init()
{
	canvas.drawClean = false;
	canvas.background = '#fff';
	onStart();
}

function addBalls()
{
	n++;
	if (n>3) n=0;
	var c = new JS3Circle({size:10, x:steps, stroke:false, fillColor:palettes[n]});
	c.dirX = c.dirY = 1;
	canvas.addChild(c);
	steps+=5;	
	if (canvas.numChildren >= maxBalls) canvas.stop(addBalls);
}

function drip()
{
	for (var i=0; i < canvas.numChildren; i++) {
		var k = canvas.getChildAt(i);
		if (k.x > canvas.width || k.x < 0) k.dirX *=-1;
		if (k.y > canvas.height || k.y < 0) k.dirY *=-1;		
		k.x += k.dirX * 5;
		k.y += k.dirY * 5;		
	};
}


// button handlers //

function onStart()
{
	canvas.run(drip);
	canvas.run(addBalls, 20);
}

function onStop()
{
	canvas.stop(drip);	
	canvas.stop(addBalls);	
}