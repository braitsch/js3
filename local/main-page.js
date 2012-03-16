
var x3, x4, x5, x6, x7;

$(document).ready(function() {	
	initCnvs1();
	initCnvs2();
	initCnvsControlled();
	addButtonListeners();
});

function initCnvs1()
{
	var stage = new JS3('x1');
	var c = new JS3Circle( { size:50, x:20, y:25, fillColor:"#ddd", strokeColor:"#ccc", strokeWidth:2} );
	stage.addChild(c);
	function tween() { c.x = 20; stage.tween(c, 2, {x:510, ease:JS3.easeInOutQuad,
		//	onStart:function(){console.log('starting tween...'+this.duration)},
			onComplete:function(){tween();}		
		//	onComplete:function(){console.log('completed in '+(Date.now() - this.start) / 1000 + ' seconds'); tween();}
		}); }
	tween();
}

function initCnvs2()
{
	var stage = new JS3('x2');
	stage.drawClean = false;
	stage.drawCircle( { x:50, y:25, size:50 } );
	stage.drawRect( { x:120, y:25, width:80, height:50 } );
	stage.drawLine( { x:220, y:25, x1:0, y1:50, x2:50, y2:0 } );
	stage.drawArc( { x:280, y:25, x1:0, y1:50, cx:40, cy:-50, x2:80, y2:50 } );
	stage.drawTri( { x:380, y:25, size:50 } );
}

function initCnvsControlled()
{
	x3 = new JS3('x3');  		
	x3.addChild( getSimpleCircle() );
	x4 = new JS3('x4');  		
	x4.addChild( getSimpleCircle() );
	x5 = new JS3('x5');  		
	x5.addChild( getSimpleCircle() );
	x6 = new JS3('x6');  		
	x6.addChild( getSimpleCircle() );
	x7 = new JS3('x7');  		
	x7.addChild( new JS3Circle(getSimpleSprite()) );
	x7.addChild( new JS3Circle(getSimpleSprite()) );
	x7.run(updateX7);		
}

function getSimpleCircle()
{
	var c = new JS3Circle();
        c.x = 75; c.y = 25; c.size = 50; 
	return c;	
}

function getSimpleSprite()
{
	var c = {};
	c.size = 15; c.x = Math.random()*x7.width; c.y = Math.random()*x7.height;  	
	c.dirX = Math.round(Math.random()) == 0 ? -1 : 1;
	c.dirY = Math.round(Math.random()) == 0 ? -1 : 1;
	return c;
}

function addButtonListeners()
{
	$('#x3-btn').click(function(){
		var c = x3.getChildAt(0);
		$(this).attr("disabled", true);
		x3.tween(c, 3, {x:800, alpha:0, onComplete:function(){
        	c.x = 75; c.y = 25; c.alpha = 1; $('#x3-btn').attr('disabled', false);
		}});
	});
	$('#x4-btn').click(function(){
		var c = x4.getChildAt(0);
		$(this).attr("disabled", true);
        x4.tween(c, 3, {x:800, 
		//	onStart:function(){console.log('starting tween...'+this.duration)},
			onComplete:function(){
			//	console.log('completed in '+(Date.now() - this.start) / 1000 + ' seconds');				
            	x4.tween(c, 1, {alpha:0, onComplete:function(){ 
        			c.x = 75; c.y = 25; c.alpha = 1; $('#x4-btn').attr('disabled', false);	
			}});
        }});
	});	
	$('#x5-btn').click(function(){
		var t = $(this).text();
		if (t == 'Stop Updating'){
			x5.stop(updateX5);
			$(this).text('Start Updating');
		}	else{
			x5.run(updateX5, .25);
			$(this).text('Stop Updating');
		}

	});	
	$('#x6-btn').click(function(){
		x6.run(updateX6, .5, 5, resetX6);
		$(this).attr("disabled", true);
	});	
	$('#x7-btn').click(function(){
		var t = $(this).text();
		if (t == 'Stop Updating'){
			x7.stop(updateX7);
			$(this).text('Start Updating');
		}	else{
			x7.run(updateX7);
			$(this).text('Stop Updating');
		}
	});				
}

function updateX5()
{
	var c = x5.getChildAt(0);
		c.x +=10;
	if (c.x >= 800) c.x = 75;
}
function updateX6()
{
	var c = x6.getChildAt(0);
		c.x += 50;
	if (c.x >= 800) c.x = 75;
}
function updateX7()
{
	var i = x7.numChildren;
	while ( i-- ){
		var c = x7.getChildAt(i);
		if (c.x >= x7.width - c.width || c.x <= 0) c.dirX *=-1;
		if (c.y >= x7.height - c.height || c.y <= 0) c.dirY *=-1;
		c.x += c.dirX;
		c.y += c.dirY;
	}
}
function resetX6()
{
	var c = x6.getChildAt(0);
		c.x = 75;
	$('#x6-btn').attr("disabled", false);
}