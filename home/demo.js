
var gui, guiObj, stage, cross, shape, alpha, speed, scaleX, scaleY, rotation, sx, sy;
var shapeType = 'JS3Circle';
var easeFunc = easeOutQuad;
var easeIndex = 2;
var easeFuncs = [ 'linear', 'easeInQuad', 'easeOutQuad', 'easeInOutQuad', 'easeInCubic',
'easeOutCubic', 'easeInOutCubic', 'easeInQuart', 'easeOutQuart','easeInOutQuart',
'easeInQuint', 'easeOutQuint', 'easeInOutQuint', 'easeInSine', 'easeOutSine',
'easeInOutSine', 'easeInExpo', 'easeOutExpo', 'easeInOutExpo', 'easeInCirc', 'easeOutCirc', 'easeInOutCirc'];
alpha = speed = scaleX = scaleY = 1; rotation = 0;

$(document).ready(function() {	
	stage = new JS3('demo-canvas');
	stage.background = '#eee';
	stage.interactive = true;
	drawCirc(); 
	drawCross(); 
	drawGui(); 
	updateOut();
});

function drawGui()
{
	guiObj = {
		'Draw Shape'        : 'Circle',
		'X'					: cross.x,
		'Y'					: cross.y,
		'Opacity'			: alpha,
		'ScaleX'			: scaleX,
		'ScaleY'			: scaleY,
		'Rotation'			: rotation,			
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
	var a1 = gui.add(guiObj, 'Opacity', 0, 1);
		a1.onChange(function(val){alpha=val;updateOut();})	
	var s4 = gui.add(guiObj, 'ScaleX', 0, 5);
		s4.onChange(function(val){scaleX=val;updateOut();})
	var s5 = gui.add(guiObj, 'ScaleY', 0, 5);
		s5.onChange(function(val){scaleY=val;updateOut();})	
	var s6 = gui.add(guiObj, 'Rotation', -720, 720);
		s6.onChange(function(val){rotation=val;updateOut();})					
	var a2 = gui.add(guiObj, 'Duration', 0, 5);
		a2.onChange(function(val){speed=val;updateOut();})
	var s7 = gui.add(guiObj, 'Ease Function', easeFuncs);
		s7.onChange(function(val){easeFunc=getEaseIndex(val);updateOut();});
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
		s += '\tstage.tween(shape, '+green(speed,1)+', {x:'+green(cross.x,0)+', y:'+green(cross.y,0);
// only show tween props if they're different from the default //
	if (alpha!=1) s+=', alpha:'+green(alpha,1);
	if (scaleX!=1) s+=', scaleX:'+green(scaleX,1);
	if (scaleY!=1) s+=', scaleY:'+green(scaleY,1);
	if (rotation!=0) s+=', rotation:'+green(rotation,0);	
		s+=', ease:'+green(easeFuncs[easeIndex])+'});';
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
	cross.ready = function(){
		guiObj.X = cross.x = stage.width/2 - cross.width/2;
		guiObj.Y = cross.y = stage.height/2 - cross.height/2;
		updateGui();
	}
	cross.src = './home/cross.png';
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
	guiObj.X = cross.x = o.x; guiObj.Y = cross.y = o.y; updateGui();
}

function tweenShape()
{
	var x = cross.x + cross.width/2 - shape.width/2;
	var y = cross.y + cross.height/2 - shape.height/2
	stage.tween(shape, speed, {x:x, y:y, alpha:alpha, scaleX:scaleX, scaleY:scaleY, rotation:rotation, ease:easeFunc, onComplete:function(){sx=shape.x;sy=shape.y;}});
}

function getEaseIndex(s)
{
	for (var i = easeFuncs.length - 1; i >= 0; i--){
		if (s == easeFuncs[i]){
			easeIndex = i; return window[easeFuncs[i]];
		}
	};
}
