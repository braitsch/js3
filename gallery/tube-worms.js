var numWorms = 50;
var strkWidth = 1;
var startX, startY;
var energy = 6;
var minSize = 20; 
var maxSize = 75;
var fillColor = '#555';
var strkColor = '#EEE';
var bkgdColor = '#777';
var rndmColor = false;

function init()
{
	addGui();
	canvas.drawClean = false;
	canvas.background = bkgdColor;
	canvas.windowTitle = 'TubeWorms &#187; Right Click & Select Save Image As';
	startX = canvas.width / 2; startY = canvas.height / 2;
	document.getElementById("cnvs").addEventListener("mousedown", getMousePosition, false);
	setTimeout(draw, 500);	
}

function getMousePosition(e)
{
	if (e.x != undefined && e.y != undefined) {
		startX = event.x;
		startY = event.y;
	}	else {
	// firefox //		
		startX = e.clientX + document.body.scrollLeft + document.documentElement.scrollLeft;
		startY = e.clientY + document.body.scrollTop + document.documentElement.scrollTop;
	}
	// stop any active worms from growing //
	while (canvas.numChildren) canvas.removeChildAt(0);
	draw();
}


function draw()
{
	for (var i=0; i < numWorms; i++) addWorm(); canvas.run(grow);
}

function addWorm()
{
	var c = new JS3Circle();
		c.size = JS3.getRandomValue(minSize, maxSize);
		c.x = startX;
		c.y = startY;		
		c.fillColor = rndmColor ? JS3.getRandomColor() : fillColor;
		c.strokeColor = strkColor;
		c.strokeWidth = strkWidth;
		c.dirX = Math.random() <= .5 ? - 1 : 1;
		c.dirY = Math.random() <= .5 ? - 1 : 1;	
	canvas.addChild(c);
}

function grow()
{
	for (var i=0; i < canvas.numChildren; i++) {
		var k = canvas.getChildAt(i);
			k.size -= (11-energy) / 10;
			k.speed = k.size / 10;
			k.x += k.speed * k.dirX;
			k.y += k.speed * k.dirY;
		if (Math.random() <= .1) k.dirX *=-1;
		if (Math.random() <= .1) k.dirY *=-1;
		if (k.size < 1) canvas.removeChildAt(i);
	};
	if (canvas.numChildren == 0) canvas.stop(grow);
}

// --- datgui controller --- //

function addGui()
{
	var o = {
		'Total Worms'		: numWorms,
		'Outer Width'		: strkWidth,		
		'Inner Color'	 	: fillColor,
		'Outer Color'	 	: strkColor,
		'Energy'	 		: energy,		
		'Min Size'	 		: minSize,
		'Max Size'	 		: maxSize,		
		'BackGround Color'	: bkgdColor,		
		'Random Colors'		: false,
		'Clear Canvas'		: function() { canvas.clear();},
		'Save as PNG'		: function() { canvas.save(); }
	}
	var gui = new dat.GUI({ autoPlace: false });
	var s0 = gui.add(o, 'Total Worms', 1, 100);
		s0.onChange(function(val){numWorms=val});		
	var c1 = gui.addColor(o, 'Inner Color');
		c1.onChange(function(val){fillColor=val});
	var c2 = gui.addColor(o, 'Outer Color');
		c2.onChange(function(val){strkColor=val});
	var c3 = gui.addColor(o, 'BackGround Color');
		c3.onChange(function(val){canvas.background = val; canvas.stop(grow); canvas.clear(); draw();});
	var s1 = gui.add(o, 'Energy', 1, 10);
		s1.onChange(function(val){energy=val});			
	var s2 = gui.add(o, 'Outer Width', 1, 10);
		s2.onChange(function(val){strkWidth=val});	
	var s3 = gui.add(o, 'Min Size', 1, 30);
		s3.onChange(function(val){minSize=val});	
	var s4 = gui.add(o, 'Max Size', 30, 100);
		s4.onChange(function(val){maxSize=val});										
	var rd = gui.add(o, 'Random Colors');
		rd.onChange(function(val){rndmColor=val});
	var cl = gui.add(o, 'Clear Canvas');
	var sv = gui.add(o, 'Save as PNG');	
	var div = document.getElementById('datgui');
	div.appendChild(gui.domElement);
};