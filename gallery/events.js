
var canvas;

function onLoad()
{	
	var v = getViewport();
	var h = $('#header').height();
	var c = document.createElement("canvas");
		c.setAttribute('id', 'cnvs');
		c.setAttribute('width', v.x - 200);
		c.setAttribute('height', v.y - h - 5);
	document.body.appendChild(c);
	canvas = new JS3('cnvs');
	$('#controls').height(v.y - h - 5);	
	$('#spiders').click(function() {loadFile('spiders');});
	$('#joints').click(function() {loadFile('joints');});
	$('#tubes').click(function() {loadFile('tubes');});	
	$('#light-brite').click(function() {loadFile('light-brite');});	
	$('#snow').click(function() {loadFile('snow');});
	$('#confetti').click(function() {loadFile('confetti');});
	$('#snakes').click(function() {loadFile('snakes');});
	$('#save').click(function() { canvas.save();});		
	loadFile('joints');
}

function loadFile(f)
{
	canvas.reset();
  	var js = document.createElement('script');
  		js.type = "text/javascript";
  		js.src = f + '.js';
  	document.body.appendChild(js);
}

function getViewport()
{
	var w=window,d=document,e=d.documentElement,g=d.getElementsByTagName('body')[0];
	return {x:w.innerWidth||e.clientWidth||g.clientWidth, y:w.innerHeight||e.clientHeight||g.clientHeight};	
}

window.onload = onLoad;