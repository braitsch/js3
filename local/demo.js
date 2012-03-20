
var gui;
var guiObj;
var stage;
var cross;
var shape;
var speed = 1;
var alpha = 1;
var sx,sy,cx,cy;
var easeFunc = easeOutQuad;
var easeFuncs = [ 'linear', 'easeInQuad', 'easeOutQuad', 'easeInOutQuad', 'easeInCubic',
'easeOutCubic', 'easeInOutCubic', 'easeInQuart', 'easeOutQuart','easeInOutQuart',
'easeInQuint', 'easeOutQuint', 'easeInOutQuint', 'easeInSine', 'easeOutSine',
'easeInOutSine', 'easeInExpo', 'easeOutExpo', 'easeInOutExpo', 'easeInCirc', 'easeOutCirc', 'easeInOutCirc'];

function init()
{
	stage = new JS3('js3-demo-canvas');
	stage.background = '#eee';
	stage.interactive = true;
	drawGui(); drawCirc(); drawCross();
}

function drawGui()
{
	guiObj = {
		'Draw Shape'        : 'Circle', 
		'X'					: stage.width/2,
		'Y'					: stage.height/2,
		'Speed'				: speed,
		'Alpha'				: alpha,
		'Ease Function'		: 'easeOutQuad',
		'Tween'				: tweenShape
	}
	gui = new dat.GUI({ autoPlace: false });
	var s1 = gui.add(guiObj, 'Draw Shape', [ 'Circle', 'Rectangle', 'Triangle' ] );
		s1.onChange(function(val){setShape(val);});
	var s2 = gui.add(guiObj, 'X', 0, stage.width);
		s2.onChange(function(val){cross.x=val;})
	var s3 = gui.add(guiObj, 'Y', 0, stage.height);
		s3.onChange(function(val){cross.y=val;})
	var a1 = gui.add(guiObj, 'Alpha', 0, 1);
		a1.onChange(function(val){alpha=val;})		
	var a2 = gui.add(guiObj, 'Speed', 0, 5);
		a2.onChange(function(val){speed=val;})
	var s4 = gui.add(guiObj, 'Ease Function', easeFuncs);
		s4.onChange(function(val){easeFunc=window[val];});
	gui.add(guiObj, 'Tween');
	document.getElementById('datgui').appendChild(gui.domElement);	
}

function updateGui()
{
 	for (var i in gui.__controllers) gui.__controllers[i].updateDisplay();
}

function setShape(s)
{
	stage.clear();	
	switch(s){
		case 'Circle' : drawCirc(); break;
		case 'Rectangle' : drawRect(); break;
		case 'Triangle' : drawTri(); break;				
	}
	drawCross();
}

function drawCirc()
{
	shape = new JS3Circle(getObjDefinition());
	stage.addChild(shape);
}

function drawRect()
{
	shape = new JS3Rect(getObjDefinition());
	stage.addChild(shape);
}

function drawTri()
{
	shape = new JS3Tri(getObjDefinition());
	stage.addChild(shape);	
}

function drawCross()
{
	cross = new JS3Image();
	cross.x = cx || stage.width/2 - cross.width/2;
	cross.y = cy || stage.height/2 - cross.height/2;
	cross.src = './local/cross.png';
	cross.drag = onCrossDrag;
	stage.addChild(cross);
}

function getObjDefinition()
{
	return {x:sx || 50, y:sy || 50, size:50, drag:onShapeDrag}; 
//	draggable:true, click:onClick, dragStart:onDragStart, drag:onCrossDrag, dragComplete:onDragComplete};
}

function onShapeDrag(o)
{
	sx=o.x;sy=o.y;
}

function onCrossDrag(o)
{
	guiObj.X = cx = o.x; guiObj.Y = cy = o.y; updateGui();
}

function tweenShape()
{
	var x = cross.x + cross.width/2 - shape.width/2;
	var y = cross.y + cross.height/2 - shape.height/2
	stage.tween(shape, speed, {x:x, y:y, alpha:alpha, ease:easeFunc, onComplete:function(){sx=shape.x;sy=shape.y;}});
}


window.onload = init;