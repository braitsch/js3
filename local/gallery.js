
var canvas;
var offsetH = 42;
var offsetW = 2;

$(document).ready(function() {
	JS3.showFrameRate(0, 40);	
	canvas = new JS3('cnvs');
	canvas.background = '#ff0000';
	setCanvasSize(); $('#cnvs').show(); init();
	$("#btn-download").click(function()  { window.location.href = "https://raw.github.com/braitsch/js3/master/src/JS3.js";});
//	addGui();
});

function setCanvasSize()
{
  	var v = getViewport(); 
	$('#cnvs').width(v.x - offsetW);
	$('#cnvs').height(v.y - offsetH);
	canvas.setSize(v.x - offsetW, v.y - offsetH);
}

function getViewport()
{
	var w=window,d=document,e=d.documentElement,g=d.getElementsByTagName('body')[0];
	return {x:w.innerWidth||e.clientWidth||g.clientWidth, y:w.innerHeight||e.clientHeight||g.clientHeight};	
}

window.onresize = function(e) { setCanvasSize(); }


var FizzyText = function() {
  this.message = 'dat.gui';
  this.speed = 0.8;
  this.displayOutline = false;
  this.explode = function() {  };
  // Define render logic ...
};

function addGui()
{
	var text = new FizzyText();
	var gui = new dat.GUI({ autoPlace: false });
	gui.add(text, 'message');
	gui.add(text, 'speed', -5, 5);
	gui.add(text, 'displayOutline');
	gui.add(text, 'explode');
	var div = document.getElementById('datgui');
	div.appendChild(gui.domElement);
};
    