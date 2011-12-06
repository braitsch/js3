$(function(){
	addButtonListeners();
	drawShape();
	addChild();
});

var addButtonListeners = function()
{
	$('input:button').button();
	$('input:button').css('width', 80);
	$('input:button').click(function(e) {
		if ($(this).val() == 'play'){
			$(this).val('stop');
		}	else{
			$(this).val('play');
		}
	});	
}

var drawShape = function()
{
	var cnvs = new JS3('drawShape');	
	cnvs.background = '#eee';	
	cnvs.drawCircle( { size:40, x:50, y:40, fillColor:"#69D2E7", strokeColor:"#C02942", strokeWidth:2 } );
	cnvs.drawRect( { width:40, height:40, x:100, y:20, fillColor:"#69D2E7", strokeColor:"#C02942", strokeWidth:2 } );	
	cnvs.drawLine( { x1:165, y1:60, x2:225, y2:20, strokeColor:"#C02942", strokeWidth:2 } );
	cnvs.drawArc( { x1:250, y1:60, x2:300, y2:60, cx:275, cy:-20, strokeColor:"#C02942", strokeWidth:2 } );	
}

var addChild = function()
{
	var cnvs = new JS3('addChild');
	cnvs.background = '#eee';	
	var c = new JS3Circle();
		c.size = 40; c.x = 50; c.y = 40; c.fillColor = "#69D2E7"; c.strokeColor = "#C02942"; c.strokeWidth = 2;
	cnvs.addChild( c );
	var r = new JS3Rect();
		r.width = 40; r.height = 40; r.x = 100; r.y = 20; r.fillColor = "#69D2E7"; r.strokeColor = "#C02942"; r.strokeWidth = 2;
	cnvs.addChild( r );	
	var l = new JS3Line();
		l.x1 = 165; l.y1 = 60; l.x2 = 225; l.y2 = 20; l.strokeColor="#C02942"; l.strokeWidth=2;
	cnvs.addChild( l );
	var a = new JS3Arc();
		a.x1 = 250; a.y1 = 60; a.x2 = 300; a.y2 = 60; a.cx = 275; a.cy = -20; a.strokeColor="#C02942"; a.strokeWidth=2;
	cnvs.addChild( a );	
}