
var maxBalls = 100;
var palettes = ['#E0E4CC', '#FA6900', '#C02942', '#69D2E7'];

function init()
{
	canvas.drawClean = false;
	canvas.background = 'eee';
	canvas.run(addBalls);
}

function addBalls()
{	
	var i = 50;
	while ( i-- ){
		var o = {
			size : JS3.getRandomValue(5, 15),
			stroke:false,			
			x : Math.random() * canvas.width,
			y : Math.random() * canvas.height,
			rotation : Math.random() * 360,
			fillColor:palettes[Math.floor(Math.random()*3)],
		}	
		canvas.drawTri(o);
	}
}