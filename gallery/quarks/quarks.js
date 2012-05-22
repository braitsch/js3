var maxQuarks = 20;
var strkWidth = 2;
var energy = 4;
var minSize = 10;
var maxSize = 50;
var strkColor = '#ffffff';
var bkgdColor = '#333';
var gradient1 = '#5cd1ff';
var gradient2 = '#000000';
var mouseX, mouseY;

function init()
{
	addGui(); 
	autoSize = true; canvas.setSize(winW, winH); 
	canvas.drawClean = true;
	canvas.radial = ['#506485', '#212838'];
	canvas.interactive = true;
	canvas.windowTitle = 'Quarks &#187; Right Click & Select Save Image As';
	canvas.click = onCanvasClick;
	canvas.run(onCanvasTimer, .5); canvas.run(move);
}

function onCanvasClick(e)
{
	var c = addQuark(e.x, e.y);
	c.locked = true;
	canvas.tween(c, .5, {scaleX:1, scaleY:1, alpha:1, onComplete:function(){ c.locked = false;}});	
}

function onCanvasTimer()
{
	if (canvas.numChildren < maxQuarks) {
		var c = addQuark();			
		canvas.tween(c, 4, {scaleX:1, scaleY:1, alpha:1});
	}	else{
		canvas.stop(addQuark);		
	}
}

function addQuark(x, y)
{
	var c = new JS3Circle();
		c.size = JS3.getRandomValue(minSize, maxSize);
		c.x = x - c.size/2 || JS3.getRandomValue(c.size, canvas.width - c.size);
		c.y = y - c.size/2 || JS3.getRandomValue(c.size, canvas.height - c.size);
		c.radial = [gradient1, gradient2];
		c.strokeColor = strkColor;
		c.strokeWidth = strkWidth;
		c.strokeAlpha = .2;
		c.arcX = c.arcY = 0;
		c.scaleX = c.scaleY = c.alpha = 0;		
	canvas.addChild(c);	
	return c;		
}

function move()
{
	for (var i=0; i < canvas.numChildren; i++) {
		var k = canvas.getChildAt(i);
		if (k.locked) return;
			k.speed = energy / 200;
			k.arcX += k.speed;
			k.arcY += k.speed;
			k.radial = [gradient1, gradient2];			
			k.strokeColor = strkColor;
			k.strokeWidth = strkWidth;
			k.x += Math.sin(k.arcX);
			k.y += Math.cos(k.arcY);			
	};
}

// --- datgui controller --- //

function addGui()
{
	var o = {
		'Total Quarks'		: maxQuarks,
		'Outer Width'		: strkWidth,		
		'Inner Color 1'	 	: gradient1,
		'Inner Color 2'	 	: gradient2,		
		'Outer Color'	 	: strkColor,
		'Energy'	 		: energy,		
		'Min Size'	 		: minSize,
		'Max Size'	 		: maxSize,		
		'BackGround Color'	: bkgdColor,		
		'Clear Canvas'		: function() { canvas.clear(); 	canvas.run(addQuark, .5); },
		'Save as PNG'		: function() { canvas.save(); }
	}
	var gui = new dat.GUI({ autoPlace: false });
	var s0 = gui.add(o, 'Total Quarks', 1, 75);
		s0.onChange(function(val){maxQuarks=val; canvas.run(addQuark, .5); });		
	var c1 = gui.addColor(o, 'Inner Color 1');
		c1.onChange(function(val){gradient1=val});
	var c1 = gui.addColor(o, 'Inner Color 2');
		c1.onChange(function(val){gradient2=val});		
	var c2 = gui.addColor(o, 'Outer Color');
		c2.onChange(function(val){strkColor=val});
	var c3 = gui.addColor(o, 'BackGround Color');
		c3.onChange(function(val){canvas.background = val;});
	var s1 = gui.add(o, 'Energy', 1, 10);
		s1.onChange(function(val){energy=val});			
	var s2 = gui.add(o, 'Outer Width', 1, 10);
		s2.onChange(function(val){strkWidth=val});	
	var s3 = gui.add(o, 'Min Size', 1, 30);
		s3.onChange(function(val){minSize=val});	
	var s4 = gui.add(o, 'Max Size', 30, 75);
		s4.onChange(function(val){maxSize=val});
	var cl = gui.add(o, 'Clear Canvas');
	var sv = gui.add(o, 'Save as PNG');	
	var div = document.getElementById('datgui');
	div.appendChild(gui.domElement);
};