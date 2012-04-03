
var maxBalls = 100;
var palettes = ['#E0E4CC', '#FA6900', '#C02942', '#69D2E7'];

function init()
{
	autoSize = false; canvas.setSize(winW, 250);
	canvas.drawClean = false;
	canvas.run(addBalls);
}

function addBalls()
{
	var i = 50;
	while ( i-- ){
		var x = Math.random()*canvas.width;
		var y = Math.random()*canvas.height;	
		var o = {
			stroke:'none',
			fillColor:palettes[Math.floor(Math.random()*3)],
			x1: x + JS3.getRandomValue(x-20, x+20), 
			y1: y + JS3.getRandomValue(y-20, y+20),
			x2: x + JS3.getRandomValue(x-20, x+20), 
			y2: y + JS3.getRandomValue(y-20, y+20),
			x3: x + JS3.getRandomValue(x-20, x+20), 
			y3: y + JS3.getRandomValue(y-20, y+20)
		}
		canvas.drawTri(o);
	}
}