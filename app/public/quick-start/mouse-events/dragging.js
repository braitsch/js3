
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
		circ.strokeColor = '#EEE';
		circ.strokeWidth = 4;
		circ.fillColor = '#9C0C0C';                
		circ.x = circ.y = 25;
	stage.addChild(circ);	
	
	// enable dragging and listen for related events //
	circ.draggable = true;
	// open your javascript console to view output statements //
	circ.dragStart = function(e){
		console.log('drag-started');
	}
	circ.dragChange = function(e){
		console.log('dragged to -- x:'+e.x+' y:'+e.y);
	}
	circ.dragComplete = function(e){
		console.log('drag-completed');
	}		
}

window.onload = init;		