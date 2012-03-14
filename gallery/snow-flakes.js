
var speed = 1;
var maxBalls = 100;

function init()
{
	canvas.drawClean = true;
	canvas.background = '#CCC';
	onStart();
}

function addBalls()
{
	var i = 20;
	while ( i-- ){
		var c = new JS3Circle();
			c.size = JS3.getRandomValue(3, 12);
			c.alpha = 0;
			c.stroke = false;			
			c.speed = c.size * .05;
			c.x = Math.random() * canvas.width;
			c.dirX = Math.round(Math.random()) == 0 ? -.5 : .5;
		canvas.addChild(c);
		canvas.tween(c, 3, {alpha:1});		
	}
}

function move()
{	
	var i = canvas.numChildren;
	while ( i-- ){
		var b = canvas.getChildAt(i);
		b.x += b.speed * b.dirX;
		b.y += b.speed;
		if (b.y > canvas.height) canvas.removeChildAt(i, true);		
	}	
}


// button handlers //

function onStart()
{
	canvas.run(addBalls, 1);
	canvas.run(move);
}

function onStop()
{
	canvas.stop(addBalls);	
	canvas.stop(move);
}