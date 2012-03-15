
var joints = 10;
var sm = [];
var lg = [];
var ln = [];
var fill = ['#948C75', '#7A6A53'];
var line = ['#D9CEB2', '#99B2B7'];

function init()
{
	canvas.drawClean = true;
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
		lg.push(c1);		
		var c2 = new JS3Circle();
			c2.size = 25;
			c2.speed = JS3.getRandomValue(.5, 1);
			c2.strokeWidth = 2;
			c2.fillColor = fill[st];
			c2.strokeColor = line[st];			
			c2.x = c1.x + JS3.getRandomValue(30, 50);
			c2.y = Math.random() * canvas.height;
		sm.push(c2);	
		var l1 = new JS3Line({x1:c1.x, y1:c1.y, x2:c2.x, y2:c2.y, strokeColor:line[st], strokeWidth:2});
		ln.push(l1);
	};
	for (var i=0; i < joints; i++) canvas.addChild(ln[i]);
	for (var i=0; i < joints; i++) canvas.addChild(sm[i]);
	for (var i=0; i < joints; i++) canvas.addChild(lg[i]);
}

function move()
{	
	for (var i=0; i < joints; i++) {
		sm[i].x -= sm[i].speed;
		lg[i].x -= lg[i].speed;
		ln[i].x1 = sm[i].x;
		ln[i].y1 = sm[i].y;
		ln[i].x2 = lg[i].x;
		ln[i].y2 = lg[i].y;						
	}
	 for (var i=0; i < joints; i++) {
		if (sm[i].x < - 25){
			sm[i].x = canvas.width + 25;
			lg[i].x = sm[i].x + JS3.getRandomValue(30, 50);
		};
	}
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