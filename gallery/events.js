
var canvas;

function initControls()
{	
	canvas = new JS3('cnvs');	
	$('#spiders').click(function() {loadFile('spiders');});
	$('#joints').click(function() {loadFile('joints');});
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

window.onload = initControls;