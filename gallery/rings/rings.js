
var padding = 50;
var saturation = 75;
var ringColor = '#777';
var bkgdColor = '#EEE';
var width = 5;
var widthVar = 50;
var life = 200;
var lifeVar = 50;
var energy = 2;
var energyVar =  50;
var rndmColor = true;
var runner;

function init()
{
	autoSize = true; canvas.setSize(winW, winH); addGui();
	canvas.windowTitle = 'Rings &#187; Right Click & Select Save Image As';
	canvas.background = bkgdColor;	
	canvas.run(fadeRing); runner = canvas.run(drawRing, 10/saturation); drawRing();
	document.getElementById("cnvs").addEventListener("mousedown", getMousePosition, false);	
}

function drawRing(xx, yy)
{
	var x = xx || JS3.getRandomValue(padding, canvas.width-padding);
	var y = yy || JS3.getRandomValue(padding, canvas.height-padding);	
	var k = new JS3Circle({fill:false, x:x, y:y, size:1});
		k.x1 = k.x; k.y1 = k.y;
		k.strokeColor = rndmColor ? JS3.getRandomColor() : ringColor;
	var ev = (energyVar/100)*energy;
		k.grow = JS3.getRandomValue(energy - ev, energy + ev);
	var lv = (lifeVar/100)*life;
		k.maxSize = JS3.getRandomValue(life - lv, life + lv);
	var wv = (widthVar/100)*width;		
		k.strokeWidth = JS3.getRandomValue(width - wv, width + wv);
	canvas.addChild(k);
}

function fadeRing()
{
	for (var i = canvas.numChildren - 1; i >= 0; i--){
		var k = canvas.getChildAt(i);
		k.size+=k.grow;
		k.x = k.x1 - k.size/2;
		k.y = k.y1 - k.size/2;
		if (k.size > k.maxSize){
			k.alpha -= .1;
			if (k.alpha < 0) canvas.removeChildAt(i);
		}
	};
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
	startY -= 40; // subtract abs y position of the window canvas
	drawRing(startX, startY)
}

// --- datgui controller --- //

function addGui()
{
	var o = {
		'Saturation'		: saturation,		
		'Ring Color'		: ringColor,
		'Bkgd Color'		: bkgdColor,
		'Random Colors'		: rndmColor,				
		'Stroke Width'		: width,
		'Stroke Variance'	: widthVar,	
		'Life'				: life,
		'Life Variance'		: lifeVar,						
		'Energy'			: energy,
		'Energy Variance'	: energyVar,
		'Clear Canvas'		: function() { canvas.clear();},
		'Save as PNG'		: function() { canvas.save(); }
	}
	var gui = new dat.GUI({ autoPlace: false });
	var s0 = gui.add(o, 'Saturation', 1, 100);
		s0.onChange(function(val){runner.delay=10/val});		
	var c1 = gui.addColor(o, 'Ring Color');
		c1.onChange(function(val){ringColor=val});
	var c2 = gui.addColor(o, 'Bkgd Color');
		c2.onChange(function(val){canvas.background = val;});
	var s1 = gui.add(o, 'Stroke Width', .1, 10);
		s1.onChange(function(val){width=val;});
	var s1 = gui.add(o, 'Stroke Variance', 0, 100);
		s1.onChange(function(val){widthVar=val;});	
	var s1 = gui.add(o, 'Life', 1, 300);
		s1.onChange(function(val){life=val;});	
	var s1 = gui.add(o, 'Life Variance', 0, 100);
		s1.onChange(function(val){lifeVar=val;});
	var s1 = gui.add(o, 'Energy', .1, 10);
		s1.onChange(function(val){energy=val;});	
	var s1 = gui.add(o, 'Energy Variance', 0, 100);
		s1.onChange(function(val){energyVar=val;});		
	var rd = gui.add(o, 'Random Colors');
		rd.onChange(function(val){rndmColor=val});			
	var cl = gui.add(o, 'Clear Canvas');
	var sv = gui.add(o, 'Save as PNG');	
	var div = document.getElementById('datgui');
	div.appendChild(gui.domElement);
}
