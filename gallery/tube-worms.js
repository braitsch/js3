
function init()
{
	canvas.drawClean = false;
	canvas.background = '#777';
	setTimeout(draw, 500);
}

function draw()
{
	for (var i=0; i < 50; i++) makeVine();
	canvas.run(grow);
}

function makeVine()
{
	var c = new JS3Circle();
		c.size = (Math.random()*30) + 40;		
		c.x = canvas.width / 2;
		c.y = canvas.height / 2;		
		c.fillColor = '#555';
		c.strokeColor = '#EEE';
		c.strokeWidth = 1;
		c.dirX = Math.random() <= .5 ? - 1 : 1;
		c.dirY = Math.random() <= .5 ? - 1 : 1;	
	canvas.addChild(c);
}

function grow()
{
	for (var i=0; i < canvas.numChildren; i++) {
		var k = canvas.getChildAt(i);
			k.size -=.3;
			k.speed = k.size / 10;
			k.x += k.speed * k.dirX;
			k.y += k.speed * k.dirY;
		if (Math.random() <= .1) k.dirX *=-1;
		if (Math.random() <= .1) k.dirY *=-1;
		if (k.size < 1) canvas.removeChildAt(i);
	};
	if (canvas.numChildren == 0) canvas.stop(grow);
}