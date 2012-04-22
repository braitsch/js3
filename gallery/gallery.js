
var canvas;
var offsetH = 42;
var offsetW = 2;
var winW, winH;
var autoSize = false;

$(document).ready(function() {
	JS3.showFrameRate(0, 40);	
	canvas = new JS3('cnvs');
	canvas.background = '#ff0000';
	getWindowWidth(); init(); $('#cnvs').show();
});

function getWindowWidth()
{
  	var v = getViewport();
	winW = v.x - offsetW; winH = v.y - offsetH;
}

function getViewport()
{
	var w=window,d=document,e=d.documentElement,g=d.getElementsByTagName('body')[0];
	return {x:w.innerWidth||e.clientWidth||g.clientWidth, y:w.innerHeight||e.clientHeight||g.clientHeight};	
}

window.onresize = function(e) { getWindowWidth(); if (autoSize) canvas.setSize(winW, winH);}