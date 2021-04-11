
var joints = 10;
var sm = [];
var lg = [];
var ln = [];
var fill = ['#948C75', '#7A6A53'];
var line = ['#D9CEB2', '#99B2B7'];

function init()
{
	canvas.drawClean = true;
	canvas.interactive = true;
	canvas.background = '#D5DED9';
	addBalls();
	onStart();
}

function addBalls()
{
	var n = canvas.width / joints;
	for (var i=0; i < joints; i++) {
		var st = Math.round(Math.random());
		var c1 = new JS3Circle();
			c1.size = 50;
			c1.speed = JS3.getRandomValue(1, 1.5);			
			c1.strokeWidth = 2;
			c1.fillColor = fill[st];
			c1.strokeColor = line[st];			
			c1.x = n*i;
			c1.y = Math.random() * canvas.height;
			c1.dragStart = onDragStart;
			c1.dragComplete = onDragComplete;			
		lg.push(c1);		
		var c2 = new JS3Circle();
			c2.size = 25;
			c2.speed = JS3.getRandomValue(.5, 1);
			c2.strokeWidth = 2;
			c2.fillColor = fill[st];
			c2.strokeColor = line[st];			
			c2.x = c1.x + JS3.getRandomValue(30, 50);
			c2.y = Math.random() * canvas.height;
			c2.dragStart = onDragStart;
			c2.dragComplete = onDragComplete;				
		sm.push(c2);
		ln.push(new JS3Line({strokeColor:line[st], strokeWidth:2}));
	};
	for (var i=0; i < joints; i++) canvas.addChild(ln[i]);
	for (var i=0; i < joints; i++) canvas.addChild(sm[i]);
	for (var i=0; i < joints; i++) canvas.addChild(lg[i]);
}

function move()
{	
	for (var i=0; i < joints; i++) {
		if (sm[i].dragging != true) sm[i].x -= sm[i].speed;
		if (lg[i].dragging != true) lg[i].x -= lg[i].speed;
		ln[i].x1 = sm[i].x + sm[i].width/2;
		ln[i].y1 = sm[i].y + sm[i].height/2
		ln[i].x2 = lg[i].x + lg[i].width/2;
		ln[i].y2 = lg[i].y + lg[i].height/2		
	}
	 for (var i=0; i < joints; i++) {
		if (sm[i].x < - 25){
			sm[i].x = canvas.width + 25;
			lg[i].x = sm[i].x + JS3.getRandomValue(30, 50);
		};
	}
}

function onDragStart(e)
{
	e.target.dragging = true;
}

function onDragComplete(e)
{
	e.target.dragging = false;
}

// button handlers //

function onStart()
{
	canvas.run(move);
}

function onStop()
{
	canvas.stop(move);
}