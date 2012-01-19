
var file;
var canvas;

function onLoad()
{	
	canvas = new JS3('cnvs'); setSize();
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

function setSize()
{
  	var v = getViewport(); 
	var h = v.y - $('#header').height() - 5;
	$('#cnvs').width(v.x - 200);
	$('#cnvs').height(h);
	$('#controls').height(h);
	canvas.setSize(v.x - 200, h);
}

function getViewport()
{
	var w=window,d=document,e=d.documentElement,g=d.getElementsByTagName('body')[0];
	return {x:w.innerWidth||e.clientWidth||g.clientWidth, y:w.innerHeight||e.clientHeight||g.clientHeight};	
}

window.onresize = function(e) { setSize(); }
window.onload = onLoad;