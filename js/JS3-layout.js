var cnvs1, cnvs2, cnvs3, cnvs4, cnvs5, cnvs6;
var cntr1 = 0;

$(function(){
	addButtonListeners();
	drawShape();
	addChild();
	addTween();
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
	$('#tween3btn').click(function() {
		if ($(this).val() == 'tween'){
			startTween3();	
		}	else{
			$(this).val('tween');
			cnvs3.getChildAt(0).x = 50;
			cnvs3.getChildAt(0).y = 40;			
			cnvs3.getChildAt(0).alpha = 1;	
			cnvs3.clear();
			cnvs3.render();
		}
	});	
	$('#frame1btn').click(function() {
		if ($(this).val() == 'run'){
			$(this).val('stop');	
			cnvs4.run(startFrame1, 15);				
		}	else{
			$(this).val('run');
			cnvs4.stop(startFrame1);
		}
	});	
	$('#frame2btn').click(function() {
		if ($(this).val() == 'run'){
			$(this).val('stop');	
			cnvs5.run(startFrame2, 15, 10 - cntr1);				
		}	else{
			$(this).val('run');
			cnvs5.stop(startFrame2);
		}
	});	
	$('#frame3btn').click(function() {
		if ($(this).val() == 'run'){
			$(this).val('stop');	
			cnvs6.run(startFrame3);				
		}	else{
			$(this).val('run');
			cnvs6.stop(startFrame3);
		}
	});					
}

var drawShape = function()
{
	var cnvs = new JS3('drawShape');
	cnvs.drawCircle( { size:40, x:50, y:40, fillColor:"#69D2E7", strokeColor:"#C02942", strokeWidth:2 } );
	cnvs.drawRect( { width:40, height:40, x:100, y:20, fillColor:"#69D2E7", strokeColor:"#C02942", strokeWidth:2 } );	
	cnvs.drawLine( { x1:165, y1:60, x2:225, y2:20, strokeColor:"#C02942", strokeWidth:2 } );
	cnvs.drawArc( { x1:250, y1:60, x2:300, y2:60, cx:275, cy:-20, strokeColor:"#C02942", strokeWidth:2 } );	
	cnvs.drawTri( { size:40, x:350, y:40, fillColor:"#69D2E7", strokeColor:"#C02942", strokeWidth:2 } );
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
	var t = new JS3Tri();
		t.x = 350; t.y = 40; t.size = 40; t.fillColor = "#69D2E7"; t.strokeColor="#C02942"; t.strokeWidth=2;
	cnvs.addChild( t );
}

var addTween = function()
{
	cnvs1 = new JS3('tween1');
	cnvs1.background = '#eee';
	cnvs1.addChild( drawCircle() );
	cnvs2 = new JS3('tween2');
	cnvs2.background = '#eee';
	cnvs2.addChild( drawCircle() );	
	cnvs3 = new JS3('tween3');
	cnvs3.background = '#eee';
	cnvs3.addChild( drawCircle() );	
	cnvs4 = new JS3('frame1');
	cnvs4.background = '#eee';
	cnvs4.addChild( drawCircle() );	
	cnvs5 = new JS3('frame2');
	cnvs5.background = '#eee';	
	cnvs5.addChild( drawCircle() );	
	cnvs5.addChild( new JS3Text({color:'#222', align:'center', size:18, x:50, y:48}));	
	cnvs6 = new JS3('frame3');
	cnvs6.background = '#eee';
	cnvs6.addChild( drawSmCircle() );
	cnvs6.addChild( drawSmCircle() );
	cnvs6.run(startFrame3);	
}

var drawCircle = function()
{
	var c = new JS3Circle();
		c.size = 40; c.x = 50; c.y = 40; c.fillColor = "#69D2E7"; c.strokeColor = "#C02942"; c.strokeWidth = 2;	
	return c;
}

var drawSmCircle = function()
{
	var c = new JS3Circle();
		c.size = 15; c.x = Math.random()*cnvs6.width; c.y = Math.random()*cnvs6.height; c.fillColor = "#69D2E7"; c.strokeColor = "#C02942"; c.strokeWidth = 2;	
		c.dirX = Math.round(Math.random()) == 0 ? -1 : 1;
		c.dirY = Math.round(Math.random()) == 0 ? -1 : 1;
	return c;	
}

var startTween1 = function()
{
	cnvs1.tween(cnvs1.getChildAt(0), 3, {x:600, onComplete:function(o){
		$('#tween1btn').val('reset');
	}});
}

var startTween2 = function()
{
	cnvs2.tween(cnvs2.getChildAt(0), 3, {x:600, onComplete:function(o){
		cnvs2.tween(o, 2, {alpha:0, onComplete:function(){		
			$('#tween2btn').val('reset');
		}});
	}});
}

var startTween3 = function()
{
	cnvs3.tween(cnvs3.getChildAt(0), 2, {x:600, alpha:0, y:10, onComplete:function(o){
		$('#tween3btn').val('reset');
	}});
}

function startFrame1()
{
	cnvs4.getChildAt(0).x +=10;
	if (cnvs4.getChildAt(0).x >= 600) cnvs4.getChildAt(0).x = 50;
}

function startFrame2()
{
	var b = cnvs5.getChildAt(0); 
	b.x +=10;
	var t = cnvs5.getChildAt(1);
	t.x +=10;
	t.text = ++cntr1;
	if (cntr1 == 10){
		cntr1 = 0;
		$('#frame2btn').val('run');
	}
	if (b.x >= 600) { b.x = t.x = 50; }
}

function startFrame3()
{
	var i = cnvs6.numChildren;
	while ( i-- ){
		var b = cnvs6.getChildAt(i);
		if (b.x >= cnvs6.width || b.x <= 0) b.dirX *=-1;
		if (b.y >= cnvs6.height || b.y <= 0) b.dirY *=-1;
		b.x += b.dirX;
		b.y += b.dirY;
	}	
}

