
var vines = [];

function init()
{
	canvas.drawClean = false;
	canvas.background = '#777';
	draw();
}

function draw()
{
	for (var i = 50; i >= 0; i--) makeVine();
	canvas.run(grow);
}

function makeVine()
{
	var o = {};
		o.size = (Math.random()*30) + 40;		
		o.x = canvas.width / 2;
		o.y = canvas.height / 2;		
		o.fillColor = '#555';
		o.strokeColor = '#EEE';
		o.strokeWidth = 1;
		o.dirX = Math.random() <= .5 ? - 1 : 1;
		o.dirY = Math.random() <= .5 ? - 1 : 1;	
	vines.push(o);	
}

function grow()
{
	for (var i = vines.length - 1; i >= 0; i--){
		var k = vines[i];
			k.size -=.3;
			k.speed = k.size / 10;
			k.x += k.speed * k.dirX;
			k.y += k.speed * k.dirY;
		if (Math.random() <= .1) k.dirX *=-1;
		if (Math.random() <= .1) k.dirY *=-1;		 
		canvas.drawCircle(k);	
		if (k.size < 1) vines.splice(i, 1);
	};
	if (vines.length == 0) canvas.stop(grow);
}