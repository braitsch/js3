
var speed = 1;
var maxBalls = 100;
var palettes = ['#E0E4CC', '#53777A', '#542437', '#ECD078'];
//var palettes = ['#E0E4CC', '#FA6900', '#C02942', '#69D2E7'];

function init()
{
	canvas.drawClean = false;
	canvas.background = '#eee';
	onStart();
}

function addBalls()
{
	var i = 500;
	while ( i-- ){
		var x = Math.random()*canvas.width;
		var y = Math.random()*canvas.height;	
		var o = {
			stroke:false,
			fillColor:palettes[Math.floor(Math.random()*3)],
			p1 : {x: x + JS3.getRandomValue(x-20, x+20), y: y + JS3.getRandomValue(y-20, y+20)},
			p2 : {x: x + JS3.getRandomValue(x-20, x+20), y: y + JS3.getRandomValue(y-20, y+20)},
			p3 : {x: x + JS3.getRandomValue(x-20, x+20), y: y + JS3.getRandomValue(y-20, y+20)}										
		}
		canvas.drawTri(o);
	}
}



// button handlers //

function onStart()
{
	canvas.run(addBalls);
}

function onStop()
{
	canvas.stop(addBalls);
}