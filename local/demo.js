
var gui;
var guiObj;
var stage;
var cross;
var shape;
var speed = 1;
var alpha = 1;
var sx,sy,cx,cy;
var shapeType = 'JS3Circle';
var easeFunc = easeOutQuad;
var easeIndex = 2;
var easeFuncs = [ 'linear', 'easeInQuad', 'easeOutQuad', 'easeInOutQuad', 'easeInCubic',
'easeOutCubic', 'easeInOutCubic', 'easeInQuart', 'easeOutQuart','easeInOutQuart',
'easeInQuint', 'easeOutQuint', 'easeInOutQuint', 'easeInSine', 'easeOutSine',
'easeInOutSine', 'easeInExpo', 'easeOutExpo', 'easeInOutExpo', 'easeInCirc', 'easeOutCirc', 'easeInOutCirc'];

$(document).ready(function() {	
	stage = new JS3('js3-demo-canvas');
	stage.background = '#eee';
	stage.interactive = true;
	drawCirc(); drawCross(); drawGui(); updateOut();
});

function drawGui()
{
	guiObj = {
		'Draw Shape'        : shapeType,
		'X'					: cx,
		'Y'					: cy,
		'Alpha'				: alpha,
		'Duration'			: speed,		
		'Ease Function'		: 'easeOutQuad',
		'Tween'				: tweenShape
	}
	gui = new dat.GUI({ autoPlace: false });
	var s1 = gui.add(guiObj, 'Draw Shape', [ 'Circle', 'Rectangle', 'Triangle' ] );
		s1.onChange(function(val){setShape(val);updateOut();});
	var s2 = gui.add(guiObj, 'X', 0, stage.width-cross.width);
		s2.onChange(function(val){cross.x=val;updateOut();})
	var s3 = gui.add(guiObj, 'Y', 0, stage.height-cross.height);
		s3.onChange(function(val){cross.y=val;updateOut();})
	var a1 = gui.add(guiObj, 'Alpha', 0, 1);
		a1.onChange(function(val){alpha=val;updateOut();})		
	var a2 = gui.add(guiObj, 'Duration', 0, 5);
		a2.onChange(function(val){speed=val;updateOut();})
	var s4 = gui.add(guiObj, 'Ease Function', easeFuncs);
		s4.onChange(function(val){easeFunc=getEaseIndex(val);updateOut();});
	gui.add(guiObj, 'Tween');
	document.getElementById('datgui').appendChild(gui.domElement);
	$('.close-button').hide(); $('.c select').width(140);
}

function updateGui()
{
 	for (var i in gui.__controllers) gui.__controllers[i].updateDisplay();
	updateOut();
}

function updateOut()
{
	var s = '\t<b>var</b> shape = <b>new</b> '+shapeType+'();<br>';
		s += '\tstage.tween(shape, '+green(speed,1)+', {x:'+green(cross.x,0)+', y:'+green(cross.y,0)+', alpha:'+green(alpha,1)+', ease:'+green(easeFuncs[easeIndex])+'});';
	$('#js3-demo-out').html(s);
}

function green(n, i)
{
	if (i === undefined){
		return "<span style='color:#40a070'>"+n+"</span>";		
	}	else{
		return "<span style='color:#40a070'>"+n.toFixed(i)+"</span>";				
	}
}

function setShape(s)
{
	stage.clear();
	switch(s){
		case 'Circle' : drawCirc(); shapeType = 'JS3Circle'; break;
		case 'Rectangle' : drawRect(); shapeType = 'JS3Rect'; break;
		case 'Triangle' : drawTri(); shapeType = 'JS3Tri'; break;
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
	cx = cross.x; cy = cross.y;	
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

function getEaseIndex(s)
{
	for (var i = easeFuncs.length - 1; i >= 0; i--){
		if (s == easeFuncs[i]){
			easeIndex = i; return window[easeFuncs[i]];
		}
	};
}

function tweenShape()
{
	var x = cross.x + cross.width/2 - shape.width/2;
	var y = cross.y + cross.height/2 - shape.height/2
	stage.tween(shape, speed, {x:x, y:y, alpha:alpha, ease:easeFunc, onComplete:function(){sx=shape.x;sy=shape.y;}});
}