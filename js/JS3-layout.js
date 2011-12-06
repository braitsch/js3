var cnvs1, cnvs2;

$(function(){
	addButtonListeners();
	drawShape();
	addChild();
	addTween1();
	addTween2();	
});

var addButtonListeners = function()
{
	$('input:button').button();
	$('input:button').css('width', 80);
	$('#tween1btn').click(function() {
		if ($(this).val() == 'tween'){
			startTween1();	
		}	else{
			$(this).val('tween');
			cnvs1.getChildAt(0).x = 50;
			cnvs1.clear();
			cnvs1.render();
		}
	});
	$('#tween2btn').click(function() {
		if ($(this).val() == 'tween'){
			startTween2();	
		}	else{
			$(this).val('tween');
			cnvs2.getChildAt(0).x = 50;
			cnvs2.getChildAt(0).alpha = 1;	
			cnvs2.clear();
			cnvs2.render();
		}
	});	
}

var toggleBtn = function(b)
{
	b.val() == 'tween' ? b.val('stop') : b.val('tween');
}

var drawShape = function()
{
	var cnvs = new JS3('drawShape');
	cnvs.drawCircle( { size:40, x:50, y:40, fillColor:"#69D2E7", strokeColor:"#C02942", strokeWidth:2 } );
	cnvs.drawRect( { width:40, height:40, x:100, y:20, fillColor:"#69D2E7", strokeColor:"#C02942", strokeWidth:2 } );	
	cnvs.drawLine( { x1:165, y1:60, x2:225, y2:20, strokeColor:"#C02942", strokeWidth:2 } );
	cnvs.drawArc( { x1:250, y1:60, x2:300, y2:60, cx:275, cy:-20, strokeColor:"#C02942", strokeWidth:2 } );	
}

var addChild = function()
{
	var cnvs = new JS3('addChild');
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

var addTween1 = function()
{
	cnvs1 = new JS3('tween1');
	cnvs1.background = '#eee';
	var c = new JS3Circle();
		c.size = 40; c.x = 50; c.y = 40; c.fillColor = "#69D2E7"; c.strokeColor = "#C02942"; c.strokeWidth = 2;
	cnvs1.addChild( c );
}

var addTween2 = function()
{
	cnvs2 = new JS3('tween2');
	cnvs2.background = '#eee';
	var c = new JS3Circle();
		c.size = 40; c.x = 50; c.y = 40; c.fillColor = "#69D2E7"; c.strokeColor = "#C02942"; c.strokeWidth = 2;
	cnvs2.addChild( c );
}

var startTween1 = function()
{
	cnvs1.tween(cnvs1.getChildAt(0), 5, {x:600, onComplete:function(o){
		$('#tween1btn').val('reset');
	}});
}

var startTween2 = function()
{
	cnvs2.tween(cnvs2.getChildAt(0), 3, {x:600, onComplete:function(o){
		cnvs2.tween(o, 4, {alpha:0, onComplete:function(){		
			$('#tween2btn').val('reset');
		}});
	}});
}