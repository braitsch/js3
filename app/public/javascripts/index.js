
$(document).ready(function() {
	loopBall();
});

function loopBall()
{
	var stage = new JS3('home-canvas');
	var c = new JS3Circle( { size:50, x:20, y:25} );
		stage.addChild(c);
	function tween() { c.x = 20; stage.tween(c, 2, {x:510, ease:easeInOutQuad, delay:.5, onComplete:function(){tween();}});};
	tween();
}