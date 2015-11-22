
var canvas;

$(document).ready(function() {
//	JS3.showFrameRate(0, 40);
	canvas = new JS3('cnvs');
	canvas.background = '#ff0000';
	canvas.setSize(window.innerWidth, window.innerHeight - 40);
	init(); $('#cnvs').show();
});