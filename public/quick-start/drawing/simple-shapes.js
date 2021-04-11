
var stage;
function init()
{
	stage = new JS3('my-canvas');
	stage.drawClean = false;	
	stage.background = '#eee';
	addShapes();
}

function addShapes()
{
	stage.drawCircle( { x:50, y:25, size:50 } );
	stage.drawRect( { x:120, y:25, width:80, height:50 } );
	stage.drawLine( { x:220, y:25, x1:0, y1:50, x2:50, y2:0 } );
	stage.drawArc( { x:280, y:25, x1:0, y1:50, xc:40, yc:-50, x2:80, y2:50 } );
	stage.drawTri( { x:380, y:25, size:58 } );
}

window.onload = init;