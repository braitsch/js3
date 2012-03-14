
/**
 * JS3 - A simple AS3 drawing api for the JavaScript Canvas
 * Version : 0.1.2
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
		var _frameRate	= 0;
		var _frameTime	= Date.now() - 1;
	
	// public getters & setters //
	 	this.__defineGetter__("width", 			function()		{ return _width;});
	 	this.__defineGetter__("height", 		function()		{ return _height;});
	 	this.__defineGetter__("numChildren", 	function()		{ return _children.length;});
	 	this.__defineSetter__("drawClean", 		function(b)		{ _drawClean = b;});
	 	this.__defineSetter__("background", 	function(b)		{ _background = b; drawBackground();});
	
	// public constants //
		JS3.LINE 		= 'line';	
		JS3.ARC 		= 'arc';			
		JS3.RECT 		= 'rect';	
		JS3.CIRCLE	 	= 'circle';	
		JS3.TRIANGLE	= 'triangle';
		JS3.TEXT 		= 'text';
		JS3.GRAPHIC 	= {	x:0, y:0, alpha:1, scale:1, rotation:1, fill:true, fillColor:'#fff', fillAlpha:1,
						size:25, stroke:true, strokeColor:'#eee', strokeAlpha:1, strokeWidth:4, capStyle:'butt'};
		JS3.TEXTFIELD 	= {	x:0, y:0, alpha:1, scale:1, rotation:1, text:'', size:12, font:'Arial', color:'#333'};						
	
	// display list management //	
	
		this.addChild = function(o){
			_children.push(o);
		}	
		this.addChildAt = function(o, n){
			if (n <= _children.length) _children.splice(n, 0, o);
		}			
		this.getChildAt = function(n){
			return _children[n];
		}
		this.getChildAtRandom = function(){
			return _children[Math.floor(Math.random()*_children.length)];
		}
		this.removeChild = function(o, k){
			for (var i = _children.length - 1; i >= 0; i--){ if (_children[i] == o){ removeChildAt(i, k); break; }};
		}		
		this.removeChildAt = function(i, k){
			if (k) _children[i] = null; _children.splice(i, 1); 
		}					
		
	// 	animation methods //
		
		this.run = function(func, delay, repeat, onComp){
		// prevent double running //	
			for (var i = _runners.length - 1; i >= 0; i--) if (func == _runners[i].f) return;
			var r = {f:func, d:delay, r:repeat, o:onComp}; _runners.push(r); initRunner(r);
		}	
		this.stop = function(func){
			stopRunner(func);
		}	
		this.tween = function(obj, secs, props){
			if (obj.isTweening) return;
				obj.isTweening = true;
			var t = new Tween(obj, secs, props);
			t.delay == undefined ? initTween(t) : setTimeout(initTween, t.delay * 1000, t);
		}
		this.reset = function(){
			while(_children.length) {_children[0] = null; _children.splice(0, 1);}
			while(_graphics.length){ _graphics[0] = null; _graphics.splice(0, 1);}
			while(_tweens.length) {_tweens[0] = null; _tweens.splice(0, 1);}
			while(_runners.length) {_runners[0] = null; _runners.splice(0, 1);}					
			_children = []; _graphics = []; _tweens = []; _runners = [];
		}
		this.setSize = function(w, h)
		{
			_canvas.width = _width = w;
			_canvas.height = _height = h;
		}			
		
	// save canvas as a png //
		
		this.save = function(){
			var img = _canvas.toDataURL('image/png');
			var win = window.open('', '_blank', 'width='+_width+', height='+_height);
				win.document.write('<!DOCTYPE html style="padding:0; margin:0"><head><title>My Canvas</title>');
	 			win.document.write('</head><body style="background: #f2f2f2; padding:0; margin:0">');
	 			win.document.write('<img src="' + img + '"/>');
	 			win.document.write('</body></html>');
	 			win.document.close();
		}
		
	// basic drawing methods //	
		this.render		= function(){ render() };
		this.clear		= function(){ drawBackground() };				
		this.drawLine	= function(o){ _graphics.push(new JS3Line(o)); 	}
		this.drawArc	= function(o){ _graphics.push(new JS3Arc(o)); 	}
		this.drawRect	= function(o){ _graphics.push(new JS3Rect(o));  }
		this.drawCircle	= function(o){ _graphics.push(new JS3Circle(o));}
		this.drawTri	= function(o){ _graphics.push(new JS3Tri(o));	}
		this.drawText 	= function(o){ _graphics.push(new JS3Text(o)); 	}
	
	// private instance methods //
		var drawLine = function(o){	
			_context.globalAlpha = o.alpha;
			_context.beginPath();
			_context.moveTo(o.x1, o.y1);  
			_context.lineTo(o.x2, o.y2);
			_context.closePath();
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
		    _context.arc(o.x, o.y, o.size/2, 0, 2 * Math.PI, false);
			if (o.fill) fill(o);
			if (o.stroke) stroke(o);
			_context.globalAlpha = 1;
		}
		var drawTri = function(o){
			_context.globalAlpha = o.alpha;	
		 	_context.beginPath();
			o.p1.x = o.p1.x || o.x - o.size/2;
			o.p1.y = o.p1.y || o.y + o.size/2;
			o.p2.x = o.p2.x || o.x;			
			o.p2.y = o.p2.y || o.y - o.size/2;
			o.p3.x = o.p3.x || o.x + o.size/2;
			o.p3.y = o.p3.y || o.y + o.size/2;							
			_context.lineTo(o.p1.x, o.p1.y);
			_context.lineTo(o.p2.x, o.p2.y);
			_context.lineTo(o.p3.x, o.p3.y);
			_context.lineTo(o.p1.x, o.p1.y);			
			if (o.fill) fill(o);
			if (o.stroke) stroke(o);
			_context.globalAlpha = 1;
		}		
		var fill = function(o){
			_context.globalAlpha = o.alpha * o.fillAlpha;			
		    _context.fillStyle = o.fillColor;
			_context.fill();
			_context.globalAlpha = 1;
		}
		var stroke = function(o){			
			_context.globalAlpha = o.alpha * o.strokeAlpha;
			_context.lineCap = o.capStyle;
		    _context.lineWidth = o.strokeWidth;
		    _context.strokeStyle = o.strokeColor;	
			_context.stroke();
			_context.globalAlpha = 1;
		}
		var drawText = function(o){
			_context.globalAlpha = o.alpha;
			_context.font = o.size+'pt '+o.font;
			_context.fillStyle = o.color;
			_context.textAlign = o.align;
			_context.fillText(o.text, o.x, o.y);			
			_context.globalAlpha = 1;			
		}	
		var drawBackground = function(){
			_context.fillStyle = _background;
			_context.fillRect(0, 0, _width, _height);				
		}
		var initTween = function(t){
			t.start = Date.now(); _tweens.push(t)	
		}
		var initRunner = function(r){
			r.int = setInterval(execRunner, r.d === undefined ? 1 : r.d * 1000, r);
		}
		var stopRunner = function(func)
		{
			for (var i = _runners.length - 1; i >= 0; i--) if (func == _runners[i].f) { clearInterval(_runners[i].int); _runners.splice(i, 1); };
		}
		var render = function()
		{
		// render non-persistent graphics //
			i = 0;
			while ( i < _graphics.length ) {
				var k = _graphics[i];
				paint(k);
				_graphics.splice(i, 1);
				k = null; i++;
			}
		// render display list object //				
			i = 0;
			while ( i < _children.length ) {
				paint(_children[i]); i++;
			}
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
				case JS3.TRIANGLE :
					drawTri(o);
				break;				
				case JS3.TEXT :
					drawText(o);
				break;										
			}			
		}
		var loop = function()
		{
			getFrameRate(); execTweens();
			if (_drawClean) drawBackground(); render();
			JS3.requestAnimFrame()(loop);
		}
		var execTweens = function()
		{
			for (var i=0; i < _tweens.length; i++){
				t = _tweens[i];
			// fire the onStart callback //	
				if (t.elapsed == 0 && t.onStart != undefined) t.onStart(); 
					t.elapsed = Date.now() - t.start;
			// update properties with new tweened values //		
				for(p in t.props) t.object[p] = t.easeFunc(t.elapsed, t.props[p].a, t.props[p].b, t.duration);
				if (t.elapsed >= t.duration) {
					_tweens.splice(i, 1);
					t.object.isTweening = false;
			// fire the onComplete callback //				
					if (t.onComplete != undefined) t.onComplete();
				}		
			}	
		}
		var execRunner = function(r)
		{
			r.f();
			if (r.r != undefined) {
				r.r--;
				if (r.r == 0){
					stopRunner(r.f);
			// execute callback when run repeat count completes //
					if (r.o != undefined) r.o();
				}
			}	
		}		
		var getFrameRate = function()
		{
			var now = window.mozAnimationStartTime || Date.now();
			_frameRate = 1000 / (now - _frameTime); _frameTime = now;			
		}
// start running the animation loop //		
	loop();
}

// --- static methods --- //
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
JS3.copyProps = function(o1, o2){ for (var k in o1) o2[k] = o1[k]; if (o1.alpha != undefined) o2.strokeAlpha = o2.fillAlpha = o1.alpha; o1 = null;}
JS3.requestAnimFrame = function(){
    return window.requestAnimationFrame || window.webkitRequestAnimationFrame || 
	window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame;
};
// --- rob penners's easing equations from http://www.robertpenner.com/easing --- //
JS3.linear = function (t, b, c, d) { return c*t/d + b; };
JS3.easeInQuad = function (t, b, c, d) { t /= d; return c*t*t + b; };
JS3.easeOutQuad = function (t, b, c, d) { t /= d; return -c * t*(t-2) + b; };
JS3.easeInOutQuad = function (t, b, c, d) { t /= d/2; if (t < 1) return c/2*t*t + b; t--; return -c/2 * (t*(t-2) - 1) + b; };
JS3.easeInCubic = function (t, b, c, d) { t /= d; return c*t*t*t + b; };
JS3.easeOutCubic = function (t, b, c, d) { t /= d; t--; return c*(t*t*t + 1) + b; };
JS3.easeInOutCubic = function (t, b, c, d) { t /= d/2; if (t < 1) return c/2*t*t*t + b; t -= 2; return c/2*(t*t*t + 2) + b; };
JS3.easeInQuart = function (t, b, c, d) { t /= d; return c*t*t*t*t + b; };
JS3.easeOutQuart = function (t, b, c, d) { t /= d; t--; return -c * (t*t*t*t - 1) + b; };
JS3.easeInOutQuart = function (t, b, c, d) { t /= d/2; if (t < 1) return c/2*t*t*t*t + b; t -= 2; return -c/2 * (t*t*t*t - 2) + b; };
JS3.easeInQuint = function (t, b, c, d) { t /= d; return c*t*t*t*t*t + b; };
JS3.easeOutQuint = function (t, b, c, d) { t /= d; t--; return c*(t*t*t*t*t + 1) + b; };
JS3.easeInOutQuint = function (t, b, c, d) { t /= d/2; if (t < 1) return c/2*t*t*t*t*t + b; t -= 2; return c/2*(t*t*t*t*t + 2) + b; };
JS3.easeInSine = function (t, b, c, d) { return -c * Math.cos(t/d * (Math.PI/2)) + c + b; };
JS3.easeOutSine = function (t, b, c, d) { return c * Math.sin(t/d * (Math.PI/2)) + b; };
JS3.easeInOutSine = function (t, b, c, d) { return -c/2 * (Math.cos(Math.PI*t/d) - 1) + b; };
JS3.easeInExpo = function (t, b, c, d) { return c * Math.pow( 2, 10 * (t/d - 1) ) + b; };
JS3.easeOutExpo = function (t, b, c, d) { return c * ( -Math.pow( 2, -10 * t/d ) + 1 ) + b; };
JS3.easeInOutExpo = function (t, b, c, d) { t /= d/2; if (t < 1) return c/2 * Math.pow( 2, 10 * (t - 1) ) + b; t--; return c/2 * ( -Math.pow( 2, -10 * t) + 2 ) + b; };
JS3.easeInCirc = function (t, b, c, d) { t /= d; return -c * (Math.sqrt(1 - t*t) - 1) + b; };
JS3.easeOutCirc = function (t, b, c, d) { t /= d; t--; return c * Math.sqrt(1 - t*t) + b; };
JS3.easeInOutCirc = function (t, b, c, d) { t /= d/2; if (t < 1) return -c/2 * (Math.sqrt(1 - t*t) - 1) + b; t -= 2; return c/2 * (Math.sqrt(1 - t*t) + 1) + b; };

// graphic primitives //

function JS3Line(o)
{
	this.type = JS3.LINE;
	for (var k in JS3.GRAPHIC) this[k] = JS3.GRAPHIC[k];
	if (o) JS3.copyProps(o, this);
}

function JS3Arc(o)
{
	this.type = JS3.ARC;
	for (var k in JS3.GRAPHIC) this[k] = JS3.GRAPHIC[k];
	if (o) JS3.copyProps(o, this);
}

function JS3Tri(o)
{
	this.type = JS3.TRIANGLE;
	this.p1 = {}; this.p2 = {}; this.p3 = {};		
	for (var k in JS3.GRAPHIC) this[k] = JS3.GRAPHIC[k];
	if (o) JS3.copyProps(o, this);
}

function JS3Rect(o)
{
	this.type = JS3.RECT;		
	for (var k in JS3.GRAPHIC) this[k] = JS3.GRAPHIC[k];		
	if (o) JS3.copyProps(o, this);
	if (this.width == undefined || this.height == undefined) this.width = this.height = this.size;
}

function JS3Circle(o)
{
	this.type = JS3.CIRCLE;	
	for (var k in JS3.GRAPHIC) this[k] = JS3.GRAPHIC[k];
	if (o) JS3.copyProps(o, this);	
}

function JS3Text(o)
{
	this.type = JS3.TEXT;
	for (var k in JS3.TEXTFIELD) this[k] = JS3.TEXTFIELD[k];	
	if (o) JS3.copyProps(o, this);	
}

function Tween(obj, dur, props)
{
	this.object 	= obj;
	this.duration 	= dur * 1000;
	this.delay 		= props.delay;
	this.start		= 0;
	this.elapsed	= 0;
	this.onStart	= props.onStart;
	this.onComplete	= props.onComplete;
	this.easeFunc	= props.ease || JS3.linear;
	this.props 		= {};
	if (props.x != undefined) this.props.x = {a:obj.x, b:props.x-obj.x};
	if (props.y != undefined) this.props.y = {a:obj.y, b:props.y-obj.y};
	if (props.alpha != undefined) this.props.alpha = {a:obj.alpha, b:props.alpha-obj.alpha}; props = null;
}

var trace = function(m){ try{ console.log(m); } catch(e){ return; }};
