
var colors = ['#000', '#333', '#666', '#AAA'];
var numLines = 100;

function init()
{
	autoSize = true; canvas.setSize(winW, winH); 	
	canvas.drawClean = false;
	canvas.background = '#333';
//	canvas.windowTitle = 'HoneyComb &#187; Right Click & Select Save Image As';
	draw(); canvas.run(move);
}

function draw()
{
	var y = canvas.height/numLines;
	for (var i=0; i < numLines; i++) {
		var s = new JS3Line()
			s.index = 0;		
			s.color = colors[s.index];
			s.y = (y/2) + (y * i);
			s.dirX = 1; s.x2=0;
			s.speed = JS3.getRandomValue(10, 40);
		canvas.addChild(s);
	};
}

function move()
{
	for (var i=0; i < canvas.numChildren; i++) {
		var k = canvas.getChildAt(i);
		if (k.x2 < 0) {
			if (++k.index == colors.length) k.index = 0;			
			k.color = colors[k.index];
			k.x1 = k.x2 = 0;
			k.dirX = 1;
		}
		if (k.x2 > canvas.width){
			if (++k.index == colors.length) k.index = 0;			
			k.color = colors[k.index];
			k.x1 = k.x2 = canvas.width;
			k.dirX = -1;
		}
		k.x1 = k.x2;
		k.x2 += (k.dirX * k.speed);
	//	k.x1 = k.x2 + k.dirX;
	};
}

		// 
		// if (k.x2 < 0) {
		// 	k.color = colors[++k.index];
		// 	if (k.index < colors.length) k.index = 0;
		// 	k.x1 = 0;
		// 	k.x2 = 0;
		// 	k.dirX = 1;
		// }
		// if (k.x2 > canvas.width){
		// 	k.color = colors[++k.index];
		// 	if (k.index < colors.length) k.index = 0;
		// 	k.x1 = canvas.width;
		// 	k.x2 = canvas.width;
		// 	k.dirX = -1;
		// }