$(document).ready(function() {
	drawShapes();
	drawLines();
});

function drawShapes()
{
	var stage = new JS3('draw-1');
	stage.drawClean = false;
	stage.drawCircle( { x:50, y:25, size:50 } );
	stage.drawRect( { x:120, y:25, width:80, height:50 } );
	stage.drawLine( { x:220, y:25, x1:0, y1:50, x2:50, y2:0 } );
	stage.drawArc( { x:280, y:25, x1:0, y1:50, xc:40, yc:-50, x2:80, y2:50 } );
	stage.drawTri( { x:380, y:25, size:58 } );
	stage = new JS3('draw-2');
	var c = new JS3Circle();
	c.size = 50; 
	c.x = 50;
	c.y = 25;
	stage.addChild( c );
	stage = new JS3('draw-3');
	var c = new JS3Rect(); 
	c.x = 10;
	c.y = 10;
	stage.addChild( c );
	stage = new JS3('draw-4');
	var c = new JS3Rect(); 
	c.x = 10;
	c.y = 10;
	c.scaleX = 1.5;
	c.scaleY = 1.5;	
	c.rotation = 45;
	stage.addChild( c );		
}

function drawLines()
{
	var s1 = new JS3('line-1');
	var s2 = new JS3('line-2');	
		s1.drawClean = s2.drawClean = false;
	drawGrid(s1); 
	drawGrid(s2);
// line example //
	var line = new JS3Line(); 
	line.x = 50;
	line.y = 130;	
	line.y2 = -100;
	line.x2 = 340; 
	line.color = '#ff0000';
	s1.addChild(line);
	s1.drawText({text:'x1 / y1', x:50, y:150});
	s1.drawText({text:'x2 / y2', x:390, y:60});	
	
// arc example //	
	var arc = new JS3Arc();
	arc.color = '#ff0000';	
	arc.x = 50; 	
	arc.y = 190;
	arc.x1 = 0; 	
	arc.y1 = 0;
	arc.yc = -250; 	
	arc.xc = 170;
	arc.x2 = 340; 	
	arc.y2 = 0;	
	s2.addChild(arc);
	s2.drawText({text:'x1 / y1', y:210, x:50});
	s2.drawText({text:'xc / yc', y:50, x:220});	
	s2.drawText({text:'x2 / y2', y:210, x:390});	
}

function drawGrid(cnvs)
{
	var size = 20;
	for (var i=0; i < cnvs.height / size; i++) {
		var y = i*size;
		cnvs.drawLine({x1:0, y1:y, x2:cnvs.width, y2:y, strokeWidth:1});
	};
	for (var i=0; i < cnvs.width / size; i++) {
		var x = i*size;
		cnvs.drawLine({x1:x, y1:0, x2:x, y2:cnvs.height, strokeWidth:1});
	};	
}