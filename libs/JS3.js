
/**
 * JS3 - A simple AS3 drawing api for the JavaScript Canvas
 * Version : 0.1.0
 * Link : https://github.com/braitsch/JS3
 * Author : Stephen Braitsch :: @braitsch
**/

function JS3(cnvs)
{
	// private instance vars //	
		var _canvas 	= document.getElementById(cnvs);
		var _context 	= _canvas.getContext("2d");
		var _width 		= _canvas.width;
		var _height 	= _canvas.height;
		var _children 	= [];
		var _graphics	= [];
		var _runners	= [];
		var _tweens		= [];
		var _drawClean 	= true;
		var _background = '#ffffff';
		var _frameNum	= 0;
		var _frameRate	= 60;		
		var _frameTime	= new Date() * 1;
		var _running 	= false;
	
	// public getters & setters //
	 	this.__defineGetter__("width", 			function()		{ return _width;});
	 	this.__defineGetter__("height", 		function()		{ return _height;});
	 	this.__defineGetter__("numChildren", 	function()		{ return _children.length;});
	 	this.__defineSetter__("drawClean", 		function(b)		{ _drawClean = b;});
	 	this.__defineSetter__("background", 	function(b)		{ _background = b; drawBackground();});
	
	// public constants //
		JS3.LINE 	= 'line';	
		JS3.ARC 	= 'arc';			
		JS3.RECT 	= 'rect';	
		JS3.CIRCLE 	= 'circle';		
		JS3.OBJECT 	= {	x:0, y:0, alpha:1, scale:1, rotation:1, fill:true, fillColor:'#fff', fillAlpha:1,
						size:25, stroke:true, strokeColor:'#eee', strokeAlpha:1, strokeWidth:4, capStyle:'butt'};
	
	// display list management //	
	
		JS3.prototype.addChild = function(o){
			_children.push(o);
		}	
		JS3.prototype.addChildAt = function(o, n){
			if (n <= _children.length) _children.splice(n, 0, o);
		}			
		JS3.prototype.getChildAt = function(n){
			return _children[n];
		}
		JS3.prototype.getChildAtRandom = function(){
			return _children[Math.floor(Math.random()*_children.length)];
		}		
		JS3.prototype.removeChildAt = function(n){
			_children.splice(n, 1);
		}		
		
	// 	animation methods //
		
		JS3.prototype.run = function(func, delay, repeat){
		// prevent double running //	
			for (var i = _runners.length - 1; i >= 0; i--) if (func == _runners[i].f) return;
			_runners.push({f:func, d:delay, r:repeat});
			if (_running == false) startAnimating();
		}	
		JS3.prototype.stop = function(func){
			for (var i = _runners.length - 1; i >= 0; i--) if (func == _runners[i].f) _runners.splice(i, 1);
		}	
		JS3.prototype.tween = function(obj, secs, props){
			var d = {}; // property delta //
			for (var k in props) d[k] = props[k] - obj[k];
			_tweens.push({o:obj, d:d, m:secs * 1000});
			if (_running == false) startAnimating();
		}			
		
	// save canvas as a png //
		
		JS3.prototype.save = function(){
			var img = _canvas.toDataURL('image/png');
			var win = window.open('', '_blank', 'width='+_width+', height='+_height);
				win.document.write('<!DOCTYPE html style="padding:0; margin:0"><head><title>My Canvas</title>');
	 			win.document.write('</head><body style="background: #f2f2f2; padding:0; margin:0">');
	 			win.document.write('<img src="' + img + '"/>');
	 			win.document.write('</body></html>');
	 			win.document.close();
		}
		
	// basic drawing methods //	
		JS3.prototype.clear			= this.drawBackground;	
		JS3.prototype.drawLine 		= function(o){ _graphics.push(new JS3Line(o)); 		if (!_running) render();	}
		JS3.prototype.drawArc		= function(o){ _graphics.push(new JS3Arc(o)); 		if (!_running) render();	}
		JS3.prototype.drawRect		= function(o){ _graphics.push(new JS3Rect(o));  	if (!_running) render();	}
		JS3.prototype.drawCircle	= function(o){ _graphics.push(new JS3Circle(o));	if (!_running) render();	}
		
	// public static methods //
		JS3.getRandomColor = function(){return '#' + Math.round(0xffffff * Math.random()).toString(16);}
		JS3.getRandomValue = function(n1, n2)
		{
			if (n1 == undefined){
				return Math.random();
			}	else if (n2 == undefined){
				return Math.random() * n1;
			}	else{
				return (Math.random() * (n2-n1)) + n1;
			}
		}
		JS3.copyProps = function(o1, o2){
			for (var k in o1) o2[k] = o1[k]; if (o1.alpha != undefined) o2.strokeAlpha = o2.fillAlpha = o1.alpha; o1 = null;			
		}			
	
	// private instance methods //
		var drawLine = function(o){	
			_context.globalAlpha = o.alpha;			
			_context.moveTo(o.x1, o.y1);  
			_context.lineTo(o.x2, o.y2);
			stroke(o);
			_context.globalAlpha = 1;			
		}
		var drawArc = function(o){
			_context.globalAlpha = o.alpha;
			_context.moveTo(o.x1, o.y1);	
		 	_context.quadraticCurveTo(o.cx, o.cy, o.x2, o.y2);
			stroke(o);
			_context.globalAlpha = 1;			
		}		
		var drawRect = function(o){
			_context.globalAlpha = o.alpha;	
			_context.beginPath();
			_context.rect(o.x, o.y, o.width, o.height);
			if (o.fill) fill(o);
			if (o.stroke) stroke(o);			
			_context.globalAlpha = 1;
		}
		var drawCircle = function(o){
			_context.globalAlpha = o.alpha;	
		 	_context.beginPath();		
		    _context.arc(o.x, o.y, o.size, 0, 2 * Math.PI, false);
			if (o.fill) fill(o);
			if (o.stroke) stroke(o);
			_context.globalAlpha = 1;
		}
		var fill = function(o){
			_context.globalAlpha = o.fillAlpha;			
		    _context.fillStyle = o.fillColor;
			_context.fill();
			_context.globalAlpha = 1;
		}
		var stroke = function(o){			
			_context.globalAlpha = o.strokeAlpha;
			_context.lineCap = o.capStyle;
		    _context.lineWidth = o.strokeWidth;
		    _context.strokeStyle = o.strokeColor;	
			_context.stroke();
			_context.globalAlpha = 1;
		}	
		var drawBackground = function(){
			_context.fillStyle = _background;
			_context.fillRect(0, 0, _width, _height);				
		}
		var render = function()
		{
		// render non-persistent graphics //
			i = _graphics.length;
			while ( i-- ) {
				var k = _graphics[i];
				paint(k);
				_graphics.splice(i, 1);
				k = null;
			}
		// render display list object //				
			var i = _children.length;	
			while ( i-- ) paint(_children[i]);			
		}
		var paint = function(o)
		{
			switch(o.type){
				case JS3.ARC :
					drawArc(o);
				break;				
				case JS3.LINE :
					drawLine(o);
				break;				
				case JS3.RECT :
					drawRect(o);
				break;					
				case JS3.CIRCLE :
					drawCircle(o);
				break;						
			}			
		}
		var startAnimating = function()
		{
			getFrameRate();
			// execute runners //
			for (var i = 0; i < _runners.length; i++) {
				if (_runners[i].d === undefined){
					_runners[i].f();
			// execute on delay //		
				}	else if (_frameNum % _runners[i].d == 0){
					_runners[i].f();
					_runners[i].r -= 1;
					if (_runners[i].r == 0)	_runners.splice(i, 1);
				}
			}
			// execute tweens //
			for (var i = 0; i < _tweens.length; i++) {
				var twn= _tweens[i];
				if (twn.n == undefined) {
					twn.n = Math.round(twn.m / _frameRate);
				// calc delta per frame //	
					for (var k in twn.d) twn.d[k] = twn.d[k] / twn.n;
				}
				// write new vals on target object //
					for (var k in twn.d) twn.o[k] += twn.d[k];
					twn.n -=1;
				if (twn.n == 0) _tweens.splice(i, 1);
			}
			if (_drawClean) drawBackground(); render();
			_running = (_tweens.length != 0 || _runners.length != 0);
			if (_running) requestAnimFrame(startAnimating);
		}
		var requestAnimFrame = (function(callback){
		    return window.requestAnimationFrame ||
		    window.webkitRequestAnimationFrame ||
		    window.mozRequestAnimationFrame ||
		    window.oRequestAnimationFrame ||
		    window.msRequestAnimationFrame ||
		    function(callback){ window.setTimeout(callback, 1000 / 60); };
		})();
		var getFrameRate = function()
		{
			_frameNum ++;
			if (_frameNum % 60 == 0){
				var now = new Date * 1;
				_frameRate = 1000 / ((now - _frameTime) / 60);
				_frameTime = now;
			}
		}		
}

// graphic primitives //

function JS3Line(o)
{
	this.type = JS3.LINE;
	for (var k in JS3.OBJECT) this[k] = JS3.OBJECT[k];
	if (o) JS3.copyProps(o, this);
}

function JS3Arc(o)
{
	this.type = JS3.ARC;
	for (var k in JS3.OBJECT) this[k] = JS3.OBJECT[k];
	if (o) JS3.copyProps(o, this);
}

function JS3Rect(o)
{
	this.type = JS3.RECT;		
	for (var k in JS3.OBJECT) this[k] = JS3.OBJECT[k];		
	if (o) JS3.copyProps(o, this);
	if (this.width == undefined || this.height == undefined) this.width = this.height = this.size;
}

function JS3Circle(o)
{
	this.type = JS3.CIRCLE;	
	for (var k in JS3.OBJECT) this[k] = JS3.OBJECT[k];
	if (o) JS3.copyProps(o, this);	
}

var trace = function(m){ try{ console.log(m); } catch(e){ return; }};



