
var stage;
var fc = '#E0E4CC';
var sc = '#53777A';
var x = 50; var y = 50;

function init()
{
	stage = new JS3('js3-demo-canvas');
	stage.background = '#eee'; 
	drawGui(); drawCirc();	
}

function drawGui()
{
	var o = {
		'Draw Shape'        : 'Circle', 
		'X'					: x,
		'Y'					: y,		
		'Fill Color'	 	: fc,
		'Stroke Color' 		: sc,
	}                
	var gui = new dat.GUI({ autoPlace: false });
	var s1 = gui.add(o, 'Draw Shape', [ 'Circle', 'Rectangle', 'Triangle' ] );
		s1.onChange(function(val){setShape(val);});
	var s2 = gui.add(o, 'X', 0, stage.width);
	var s3 = gui.add(o, 'Y', 0, stage.height);	
	var c1 = gui.addColor(o, 'Fill Color');
	var c2 = gui.addColor(o, 'Stroke Color');
	document.getElementById('datgui').appendChild(gui.domElement);	
}

function setShape(s)
{
	stage.clear();	
	switch(s){
		case 'Circle' : drawCirc(); break;
		case 'Rectangle' : drawRect(); break;
		case 'Triangle' : drawTri(); break;				
	}
}

function drawCirc()
{
	var c = new JS3Circle(getObjDefinition());
	stage.addChild(c);
}

function drawRect()
{
	var c = new JS3Rect(getObjDefinition());
	stage.addChild(c);	
}

function drawTri()
{
	var c = new JS3Tri(getObjDefinition());
	stage.addChild(c);	
}

function getObjDefinition()
{
	return {x:x, y:y, size:50, fillColor:fc, strokeColor:sc, dragable:true};
}

window.onload = init;