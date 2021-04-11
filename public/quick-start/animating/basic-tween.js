
var stage;
function init()
{
	stage = new JS3('my-canvas');
	stage.background = '#CCC';
	drawCircle();
}

function drawCircle()
{
	// draw a simple circle and add it to the stage //
	var circ = new JS3Circle();
		circ.strokeColor = '#EEE';
		circ.strokeWidth = 4;
		circ.fillColor = '#9C0C0C';                
		circ.x = 25;
		circ.y = 35;
	stage.addChild(circ);
	var tweenCirc = function()
	{
		circ.x = 25;
	// automatically call tweenCirc again after the tween completes //                    
		stage.tween(circ, 8, {x:740, onComplete:tweenCirc});
	}
	// call tweenCirc for the first time, which starts the loop //
	tweenCirc();	
}

window.onload = init;		