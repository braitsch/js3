$(document).ready(function() {
	var stage = new JS3('gs-canvas');
		stage.background = '#CCC'
	var circ = new JS3Circle();
		circ.fillColor = '#9C0C0C';
		circ.strokeColor = '#EEE';
		circ.strokeWidth = 4;
		circ.x = 25;
		circ.y = 35;
	stage.addChild(circ);
	var tweenCirc = function()
	{
		circ.x = 25;
		stage.tween(circ, 8, {x:840, onComplete:tweenCirc});
	}
	tweenCirc();
});