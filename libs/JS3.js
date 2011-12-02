
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
		JS3.RECT = 'rect';	
		JS3.CIRCLE = 'circle';
		JS3.OBJECT = {x:0, y:0, alpha:1};
	
	// public instance methods //	
	
		JS3.prototype.addChild = function(o){
			_children.push(o);
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
		JS3.prototype.run = function(func, delay, repeat){
		// prevent double running //	
			for (var i = _runners.length - 1; i >= 0; i--) if (func == _runners[i].f) return;
			_runners.push({f:func, d:delay, r:repeat});
			if (_running == false) startAnimating();
		}	
		JS3.prototype.stop = function(func){
			for (var i = _runners.length - 1; i >= 0; i--) if (func == _runners[i].f) _runners.splice(i, 1);
		}	
		JS3.prototype.tween = function(o, t, p){
			var d = {}; // property delta //
			for (var k in p) d[k] = p[k] - o[k];
			_tweens.push({o:o, d:d, m:t * 1000});
			if (_running == false) startAnimating();
		}			
		JS3.prototype.save = function(){
			var img = _canvas.toDataURL('image/png');
			var win = window.open('', '_blank', 'width='+_width+', height='+_height);
				win.document.write('<!DOCTYPE html style="padding:0; margin:0"><head><title>My Canvas</title>');
	 			win.document.write('</head><body style="background: #f2f2f2; padding:0; margin:0">');
	 			win.document.write('<img src="' + img + '"/>');
	 			win.document.write('</body></html>');
	 			win.document.close();
		}
		JS3.prototype.drawLine = function(x1, y1, x2, y2){
			_context.moveTo(x1, y1);  
			_context.lineTo(x2, y2);
			_context.lineCap = "butt";			
			_context.strokeStyle = '#ffffff';
			_context.stroke();
		}		
		
	// public static methods //
		JS3.getRandomColor = function(){return '#' + Math.round(0xffffff * Math.random()).toString(16);}		
	
	// private instance methods //
		var drawRect = function(o){
			_context.globalAlpha = o.alpha;			
		    _context.fillStyle = o.color;		
		    _context.fillRect(o.x, o.y, o.width, o.height);
			_context.globalAlpha = 1;
		}
		var drawCircle = function(o){
			_context.globalAlpha = o.alpha;	
		 	_context.beginPath();
		    _context.fillStyle = o.color;		
		    _context.arc(o.x, o.y, o.size, 0, 2 * Math.PI, false);
		    _context.fill();
			_context.globalAlpha = 1;
		}	
		var drawBackground = function(){
			_context.fillStyle = _background;
			_context.fillRect(0, 0, _width, _height);				
		}
		var render = function()
		{
			var i = _children.length;	
			while ( i-- ){
				switch(_children[i].type){
					case JS3.RECT :
						drawRect(_children[i]);
					break;					
					case JS3.CIRCLE :
						drawCircle(_children[i]);
					break;						
				}
			}	
		}
		var startAnimating = function()
		{
			getFrameRate();				
			if (_drawClean) drawBackground();
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
			render();
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

function JS3Rect()
{
	this.type = JS3.RECT;	
	for (var k in JS3.OBJECT) this[k] = JS3.OBJECT[k];	
	this.color = JS3.getRandomColor();
 	this.width = this.height = 10;
}

function JS3Circle()
{
	this.type = JS3.CIRCLE;	
	for (var k in JS3.OBJECT) this[k] = JS3.OBJECT[k];
	this.color = JS3.getRandomColor();	
 	this.size = 25;
}


var trace = function(m){ try{ console.log(m); } catch(e){ return; }};



