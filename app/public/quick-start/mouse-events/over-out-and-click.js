
var stage;
function init()
{
	stage = new JS3('my-canvas');
	stage.background = '#CCC';
// this must be set to true to capture mouse events	//
	stage.interactive = true;
	drawCircle();
}

function drawCircle()
{
	// draw a simple circle and add it to the stage //
	var circ = new JS3Circle({size:45});
		circ.name = 'my-circle';	
		circ.strokeColor = '#EEE';
		circ.strokeWidth = 4;
		circ.fillColor = '#9C0C0C';                
		circ.x = circ.y = 25;
	stage.addChild(circ);	
	
	// add event handlers to listen for mouse related events  //
	// open your javascript console to view output statements //
	circ.over = function(e){
		console.log(e.target.name + ' was rolled-over');
	}
	circ.out = function(e){
		console.log(e.target.name + ' was rolled-out');
	}
	circ.click = function(e){
		console.log(e.target.name + ' was single-clicked');
	}
	circ.dclick = function(e){
		console.log(e.target.name + ' was double-clicked');
	}			
}

window.onload = init;