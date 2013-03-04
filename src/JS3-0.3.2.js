
/**
 * JS3 - A Drawing & Tweening API for the JavaScript Canvas
 * Version : 0.3.2
 * Release Date : March 03 2013
 * Documentation : http://js3.quietless.com/
 *
 * Copyright 2012 Stephen Braitsch :: @braitsch
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
**/

function JS3(cnvs)
{
		var _root			= this;
		var _canvas 		= document.getElementById(cnvs);
		var _context		= _canvas.getContext("2d");
		var _children		= [];
		var _graphics		= [];
		var _runners		= [];
		var _tweens			= [];
		var _drawClean		= true;
		var _background		= '#ffffff';
		var _winTitle		= 'My Canvas';
		var _clickInt		= 0;
		var _stageEnter		= false;
		var _interactive	= false;
		var _downObj, _overObj, _dragObj, _radial, _linear;
	
	// public getters & setters //
	
		Object.defineProperty(this, "width",			{get: function() {return _canvas.width;}});
		Object.defineProperty(this, "height",			{get: function() {return _canvas.height;}});
		Object.defineProperty(this, "numChildren",		{get: function() {return _children.length;}});
		Object.defineProperty(this, "mousePressed",		{get: function() {return _downObj!=null;}});
		Object.defineProperty(this, "interactive",		{
			get: function() {return _interactive;},
			set: function(b) { _interactive = b; b ? addMouseEvents() : remMouseEvents();}
		});		
		Object.defineProperty(this, "position",			{get: function() {
			var x = 0; var y = 0; var e = _canvas;
			while( e != null ) { x += e.offsetLeft; y += e.offsetTop; e = e.offsetParent; }
			return {x:x, y:y};}});
		Object.defineProperty(this, "drawClean",		{set: function(b) { _drawClean = b;}});
		Object.defineProperty(this, "radial",			{set: function(a) { _radial = a; _linear = _background = undefined; drawBackground();}});
		Object.defineProperty(this, "linear",			{set: function(a) { _linear = a; _radial = _background = undefined; drawBackground();}});
		Object.defineProperty(this, "background",		{set: function(n) { _background = n; _linear = _radial = undefined; drawBackground();}});
		Object.defineProperty(this, "windowTitle",		{set: function(s) { _winTitle = s;}});
		JS3setStageEvents(this);
	
	// display list management //
	
		this.setSize = function(w, h){
 			_canvas.width  = w;
  			_canvas.height = h;
		}
		this.addChild = function(o){
			o.parent = _root; o.stage = _context; _children.push(o);
		}
		this.addChildAt = function(o, n){
			if (n <= _children.length) o.parent = _root; o.stage = _context; _children.splice(n, 0, o);
		}
		this.getChildAt = function(n){
			return _children[n];
		}
		this.getChildAtRandom = function(){
			return _children[Math.floor(Math.random()*_children.length)];
		}
		this.removeChild = function(o){
			for (var i = _children.length - 1; i >= 0; i--){ if (_children[i] == o){ removeChildAt(i); break; }};
		}
		this.removeChildAt = function(i){
			_children[i].parent = null; _children[i].stage = null; _children.splice(i, 1); 
		}
		
	// 	animation methods //
	
		this.run = function(func, delay, repeat, onComp){
		// prevent double running //
			for (var i = _runners.length - 1; i >= 0; i--) if (func == _runners[i].f) return;
			var r = new JS3Runner(func, delay, repeat, onComp);
			_runners.push(r); return r;
		}	
		this.stop = function(func){stopRunner(func);}
		this.tween = function(obj, secs, props){
			if (obj.isTweening) return;
				obj.isTweening = true;
			var t = new JS3Tween(obj, secs, props);
			t.delay == undefined ? initTween(t) : setTimeout(function(){initTween(t)}, t.delay * 1000);
		}
		this.clear = function(){
			while(_children.length) {_children[0] = null; _children.splice(0, 1);}
			while(_graphics.length){ _graphics[0] = null; _graphics.splice(0, 1);}
			_children = []; _graphics = []; drawBackground();
		}
		this.reset = function(){
			while(_tweens.length) {_tweens[0] = null; _tweens.splice(0, 1);}
			while(_runners.length) {_runners[0] = null; _runners.splice(0, 1);}
			_tweens = []; _runners = []; this.clear();
		}		
		this.save = function(){
	// save canvas as a png //
			var img = _canvas.toDataURL('image/png');
			var win = window.open('', '_blank', 'width='+_canvas.width+', height='+_canvas.height);
				win.document.write('<!DOCTYPE html style="padding:0; margin:0"><head><title>'+_winTitle+'</title>');
	 			win.document.write('</head><body style="background: #f2f2f2; padding:0; margin:0">');
	 			win.document.write('<img src="' + img + '"/>');
	 			win.document.write('</body></html>');
	 			win.document.close();
		}
		
	// basic drawing methods //	
	
		this.drawLine	= function(o){ o.stage=_context;_graphics.push(new JS3Line(o)); 	}
		this.drawArc	= function(o){ o.stage=_context;_graphics.push(new JS3Arc(o)); 		}
		this.drawRect	= function(o){ o.stage=_context;_graphics.push(new JS3Rect(o));  	}
		this.drawCircle	= function(o){ o.stage=_context;_graphics.push(new JS3Circle(o));	}
		this.drawTri	= function(o){ o.stage=_context;_graphics.push(new JS3Tri(o));		}
		this.drawText 	= function(o){ o.stage=_context;_graphics.push(new JS3Text(o)); 	}
			
	// mouse events //
	
		var addMouseEvents = function()
		{
			_canvas.addEventListener("mousedown", onMD);
			_canvas.addEventListener("mouseup", onMU);
			_canvas.addEventListener("mousemove", onMM);
			_canvas.addEventListener("mouseover", onOVR);
			_canvas.addEventListener("mouseout", onOUT);
			document.body.addEventListener("mouseup", onMU);
		}
		var remMouseEvents = function()
		{
			_canvas.removeEventListener("mousedown", onMD);
			_canvas.removeEventListener("mouseup", onMU);
			_canvas.removeEventListener("mousemove", onMM);
			_canvas.removeEventListener("mouseover", onOVR);
			_canvas.removeEventListener("mouseout", onOUT);
			document.body.removeEventListener("mouseup", onMU);
		}

		var onMD = function(e)
		{
			_context.dx = _context.mx; _context.dy = _context.my;
			_downObj = _overObj;
			onMouseEvent(_overObj, 'mouseDown');
		}
		var onMU = function(e)
		{
			if (_dragObj){
				onMouseEvent(_dragObj, 'dragComplete'); _dragObj = _downObj = undefined;
			}	else{
				var n = Date.now();
					n - _clickInt > 200 ? onSingleClick() : onDoubleClick();
				_clickInt = n;
			}
			onMouseEvent(_overObj, 'mouseUp');
		}		
		var onMM = function(e)
		{
			getMousePosition(e); 
		// detect rollOver & rollOuts //
			var k = getMouseObject();
			if (k != _overObj){
				onMouseEvent(k, 'mouseOver');
				onMouseEvent(_overObj, 'mouseOut');
			}
			_overObj = k;
		// update mouse cursor //
			window.document.body.style.cursor = _overObj != _root ? 'pointer' : 'default';
		// check for draggable target //
			if (_downObj){
				if (_downObj.draggable) {
					if (_dragObj == undefined){
						_dragObj = _downObj;
						onMouseEvent(_downObj, 'dragStart');
					}	else{
						_downObj.x += _context.mx - _context.dx;
						_downObj.y += _context.my - _context.dy;
						_context.dy = _context.my;
						_context.dx = _context.mx;
						onMouseEvent(_downObj, 'dragChange');
					}
				}
			}
		 	if (_stageEnter) {
				_stageEnter = false;
				onMouseEvent(_root, 'stageEnter');
			}	else{
				onMouseEvent(k, 'mouseMove');
			}
		}
		var onOVR = function(e)
		{
			_stageEnter = true;
		}
		var onOUT = function(e)
		{
			onMouseEvent(_root, 'stageLeave');
		}
		var onMouseEvent = function(o, e)
		{
			var t = o;
			while(o){ if (o['_'+e]) o['_'+e](getMouseEvent(e, t, o)); o = o.parent; }
		}
		var onSingleClick = function()
		{
			if (_overObj == _downObj) onMouseEvent(_overObj, 'click');
			_downObj = undefined;
		}
		var onDoubleClick = function()
		{
			if (_overObj == _downObj) onMouseEvent(_overObj, 'doubleClick');
			_downObj = undefined;
		}
		var getMouseObject = function()
		{
			for (var i = _children.length - 1; i >= 0; i--) if (_children[i].mouse && _children[i].enabled) return _children[i]; return _root;
		}
		var getMouseEvent = function (type, target, owner)
		{
			var e = new JS3Event(type, target, owner, _context.mx, _context.my);
			if (target == _root) e.target.name = 'Stage'; return e;
		}		
		var getMousePosition = function(e)
		{
		    var oX = 0; var oY = 0; var k = _canvas;
		    do { oX += k.offsetLeft; oY += k.offsetTop; } while (k = k.offsetParent);
			_context.mx = e.pageX - oX; _context.my = e.pageY - oY;
		}
		
	// window focus events //
	
		var onWFI = function()
		{
			if (_root._windowFocusIn) _root._windowFocusIn(new JS3Event('focusIn', _root, _root));
		}
		
		var onWFO = function()
		{
			if (_root._windowFocusOut) _root._windowFocusOut(new JS3Event('focusOut', _root, _root));
		}

		window.onfocus = onWFI; window.onblur = onWFO;

	// private instance methods //

		var drawBackground = function(){
			if (_radial){
				radialBkgd();
			}	else if (_linear){
				linearBkgd();
			}	else{
				solidBkgd();
			}
			_context.fillRect(0, 0, _canvas.width, _canvas.height);
		}
		var solidBkgd = function(){
			_context.fillStyle = _background || '#ffffff';
		}
		var radialBkgd = function(){
			var g = _context.createRadialGradient(_canvas.width/2, _canvas.height/2, 0, _canvas.width/2, _canvas.height/2, _canvas.width/2);
			_context.fillStyle = JS3.drawGradient(_radial, g);
		}
		var linearBkgd = function(){
			var g = _context.createLinearGradient(0, 0, _canvas.width, 0);
			_context.fillStyle = JS3.drawGradient(_linear, g);
		}
		var initTween = function(t){
			t.start = Date.now(); _tweens.push(t)
		}
		var stopRunner = function(func){
			for (var i = _runners.length - 1; i >= 0; i--) if (func == _runners[i].f) { _runners.splice(i, 1); };
		}
		var render = function(){
		// render display list objects //
			i = 0; while ( i < _children.length ) { var k = _children[i]; k.update(k); i++;}
		// render non-persistent graphics //
			while ( _graphics.length ) { var k = _graphics[0]; k.update(k); _graphics.splice(0, 1); k = null;}
		}
		var loop = function(){
			execTweens(); execRunners(); if (_drawClean) drawBackground(); render();
		}
		var execTweens = function(){
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
			// force obj to destination property //
					for(p in t.props) t.object[p] = t.props[p].a + t.props[p].b;
			// fire the onComplete callback //
					if (t.onComplete != undefined) t.onComplete();
				}
			}
		}
		var execRunners = function(){
			var d = Date.now();
			for (var i=0; i < _runners.length; i++){
				var r = _runners[i];
				if (r.d === undefined || d - r.t > r.d*1000) {
					r.f(); r.t = d;
					if (r.r != undefined) {
						r.r--;
						if (r.r == 0){
							stopRunner(r.f);
					// execute callback when run repeat count completes //
							if (r.o != undefined) r.o();
						}
					}
				}
			}
		}
// add this JS3 instance to the window animation loop //
	JS3.func.push(loop);
}

// --- static class methods --- //

JS3.getRandomColor = function(){return '#' + Math.round(0xffffff * Math.random()).toString(16);}
JS3.getRandomValue = function(n1, n2){if (n1 == undefined){return Math.random();}else if (n2 == undefined){return Math.random()*n1;}else{return (Math.random()*(n2-n1))+n1;}};

// --- static drawing methods --- //

JS3.drawLine = function(o){	
	o.cx = (o.x1 + o.x2) / 2;
	o.cy = (o.y1 + o.y2) / 2;
	JS3.openShape(o);
	o.stage.moveTo(o.x1-o.cx, o.y1-o.cy);
	o.stage.lineTo(o.x2-o.cx, o.y2-o.cy);
	JS3.drawShape(o);
}
JS3.drawArc = function(o){
	o.cx = (o.x1 + o.x2) / 2;
	o.cy = (o.y1 + o.y2) / 2;
	JS3.openShape(o);
	o.stage.moveTo(o.x1-o.cx, o.y1-o.cy);
 	o.stage.quadraticCurveTo(o.xc-o.cx, o.yc-o.cy, o.x2-o.cx, o.y2-o.cy);
	o.mouse = o.stage.isPointInPath(o.stage.mx, o.stage.my);
	JS3.stroke(o);
	o.stage.restore();
}
JS3.drawRect = function(o){
	JS3.getCntrPt(o);
	JS3.openShape(o);
	o.stage.rect(-o.cx, -o.cy, o.cx*2, o.cy*2);
	JS3.drawShape(o);
}
JS3.drawCirc = function(o){
	JS3.getCntrPt(o);
	var a1 = o.cx * .5522848;
	var a2 = o.cy * .5522848;
	JS3.openShape(o);
	o.stage.moveTo(-o.cx, 0);
	o.stage.bezierCurveTo(-o.cx, -a2, -a1, -o.cy, 0, -o.cy);
	o.stage.bezierCurveTo(a1, -o.cy, o.cx, -a2, o.cx, 0);
	o.stage.bezierCurveTo(o.cx, a2, a1, o.cy, 0, o.cy);
	o.stage.bezierCurveTo(-a1, o.cy, -o.cx, a2, -o.cx, 0);
	JS3.drawShape(o);
}
JS3.drawTri = function(o){
	if (o.pts.length == 6){
		JS3.drawTriByPoints(o);
	} else if (o.width == o.height){
		JS3.drawTriEquilateral(o);
	}	else{
		JS3.drawTriDistorted(o);
	}
	JS3.openShape(o);
	o.stage.moveTo(o._x1, o._y1);
	o.stage.lineTo(o._x2, o._y2);
	o.stage.lineTo(o._x3, o._y3);
	o.stage.lineTo(o._x1, o._y1);
	JS3.drawShape(o);
}
JS3.drawTriEquilateral = function(o){
	var w = o.width || o.size;
	var h = (o.height || o.size) * (Math.sqrt(3)/2);
	o._x1 = 0;
	o._y1 = h * -2/3;
	o._x2 = w / 2;
	o._y2 = h / 3;
	o._x3 = -w / 2;
	o._y3 = h / 3;
	o.cx = w/2;
	o.cy = h/2 + ((h/2) / 3);
}
JS3.drawTriDistorted = function(o){
	var w = o.width || o.size;
	var h = o.height || o.size;
	o._x1 = 0;
	o._y1 = -h / 2
	o._x2 = w / 2;
	o._y2 = h / 2;
	o._x3 = -w / 2;
	o._y3 = h / 2;
	o.cx = w/2;
	o.cy = h/2;
}
JS3.drawTriByPoints = function(o){
	o.cx = (o.pts[0] + o.pts[2] + o.pts[4]) / 3;
	o.cy = (o.pts[1] + o.pts[3] + o.pts[5]) / 3;
	o._x1 = o.pts[0] - o.cx;
	o._y1 = o.pts[1] - o.cy;
	o._x2 = o.pts[2] - o.cx;
	o._y2 = o.pts[3] - o.cy;
	o._x3 = o.pts[4] - o.cx;
	o._y3 = o.pts[5] - o.cy;
}
JS3.drawImage = function(o){
	if (o.image.src==false) return;
	o.cx = o.image.width / 2;
	o.cy = o.image.height / 2;
	JS3.openShape(o);
	o.stage.rect(-o.cx, -o.cy, o.cx*2, o.cy*2);
	o.stage.drawImage(o.image, -o.cx, -o.cy);
	JS3.drawShape(o);
}
JS3.drawText = function(o){
	var s = o.bold ? 'Bold ' : '';
	s+= o.italic ? 'Italic ' : '';
	o.stage.font = s+o.size+'pt '+o.font;
	o.stage.textAlign = 'left';
	o.stage.textBaseline = 'top';
	o.cy = JS3getTextHeight(o) / 2;
	o.cx = o.stage.measureText(o.text).width / 2;
	JS3.openShape(o);
	if (o.fill) JS3.fill(o);
	if (o.stroke) JS3.stroke(o);
	JS3.drawShape(o);
}		
JS3.fill = function(o){
	if (o._gradient) o.drawGradient(o)
	o.stage.globalAlpha = o.alpha * o.fillAlpha;
    o.stage.fillStyle = o.color || o.fillColor;
	o instanceof JS3Text ? o.stage.fillText(o.text, -o.cx, -o.cy) : o.stage.fill();
	o.stage.globalAlpha = 1;
}
JS3.stroke = function(o){
	o.stage.globalAlpha = o.alpha * o.strokeAlpha;
	o.stage.lineCap = o.capStyle;
    o.stage.lineWidth = o.strokeWidth;
    o.stage.strokeStyle = o.strokeColor;
	o instanceof JS3Text ? o.stage.strokeText(o.text, -o.cx, -o.cy) : o.stage.stroke();
	o.stage.globalAlpha = 1;
}
JS3.getCntrPt = function(o){
	o.cx = o.width / 2 || o.size / 2;
	o.cy = o.height / 2 || o.size / 2;
}
JS3.openShape = function(o){
	o.stage.save();	
	o.stage.globalAlpha = o.alpha;
	o.stage.translate(o.x + o.cx, o.y + o.cy);
	o.stage.scale(o.scaleX, o.scaleY);
    o.stage.rotate(o.rotation * Math.PI/180);
	o.stage.beginPath();
}
JS3.drawShape = function(o){
	o.stage.closePath();
	o.mouse = o.stage.isPointInPath(o.stage.mx, o.stage.my);
	if (o.fill) JS3.fill(o);
	if (o.stroke) JS3.stroke(o);
	o.stage.restore();
}
JS3.drawRadial = function(o)
{
	var g = o.stage.createRadialGradient(0, 0, 0, 0, 0, o.size/2);
	o.color = JS3.drawGradient(o._gradient, g);
}
JS3.drawLinear = function(o)
{
	var g = o.stage.createLinearGradient(-o.width/2, 0, o.width/2, 0);
	o.color = JS3.drawGradient(o._gradient, g);
}
JS3.drawGradient = function(colors, g)
{
	var n = colors.length;
	if (n == 1){ return colors[0] }
	for (var i=0; i < n; i++) {
		var c = colors[i]; g.addColorStop((1/(n-1))*i, JS3.ToRGB(c));
	};
	return g;
}
JS3.copyProps = function(o1, o2){ 
	for (var k in o1) o2[k] = o1[k]; o1 = null;
}
JS3.ToRGB = function(h)
{
	h = JS3.getHexFromName(h);
	if (h.charAt(0)=="#") h = h.substring(1,7);
	var r = parseInt(h.substring(0,2),16);
	var g = parseInt(h.substring(2,4),16);
	var b = parseInt(h.substring(4,6),16);
	return 'rgba('+r+','+g+','+b+', 1)';
}
JS3.getHexFromName = function(h)
{
	switch(h){
		case 'aqua' : return '#00FFFF';
		case 'black' : return '#000000';
		case 'blue' : return '#0000FF';
		case 'fuchsia' : return '#FF00FF';
		case 'gray' : return '#000000';
		case 'grey' : return '#808080';
		case 'green' : return '#808080';
		case 'lime' : return '#00FF00';
		case 'maroon' : return '#800000';
		case 'navy' : return '#000080';
		case 'olive' : return '#808000';
		case 'purple' : return '#800080';
		case 'red' : return '#ff0000';
		case 'silver' : return '#C0C0C0';
		case 'teal' : return '#008080';
		case 'white' : return '#ffffff';
		case 'yellow' : return '#FFFF00';
	}
	return h;
}

// --- rob penners's easing equations from http://www.robertpenner.com/easing --- //

linear = function (t, b, c, d) { return c*t/d + b; };
easeInQuad = function (t, b, c, d) { t /= d; return c*t*t + b; };
easeOutQuad = function (t, b, c, d) { t /= d; return -c * t*(t-2) + b; };
easeInOutQuad = function (t, b, c, d) { t /= d/2; if (t < 1) return c/2*t*t + b; t--; return -c/2 * (t*(t-2) - 1) + b; };
easeInCubic = function (t, b, c, d) { t /= d; return c*t*t*t + b; };
easeOutCubic = function (t, b, c, d) { t /= d; t--; return c*(t*t*t + 1) + b; };
easeInOutCubic = function (t, b, c, d) { t /= d/2; if (t < 1) return c/2*t*t*t + b; t -= 2; return c/2*(t*t*t + 2) + b; };
easeInQuart = function (t, b, c, d) { t /= d; return c*t*t*t*t + b; };
easeOutQuart = function (t, b, c, d) { t /= d; t--; return -c * (t*t*t*t - 1) + b; };
easeInOutQuart = function (t, b, c, d) { t /= d/2; if (t < 1) return c/2*t*t*t*t + b; t -= 2; return -c/2 * (t*t*t*t - 2) + b; };
easeInQuint = function (t, b, c, d) { t /= d; return c*t*t*t*t*t + b; };
easeOutQuint = function (t, b, c, d) { t /= d; t--; return c*(t*t*t*t*t + 1) + b; };
easeInOutQuint = function (t, b, c, d) { t /= d/2; if (t < 1) return c/2*t*t*t*t*t + b; t -= 2; return c/2*(t*t*t*t*t + 2) + b; };
easeInSine = function (t, b, c, d) { return -c * Math.cos(t/d * (Math.PI/2)) + c + b; };
easeOutSine = function (t, b, c, d) { return c * Math.sin(t/d * (Math.PI/2)) + b; };
easeInOutSine = function (t, b, c, d) { return -c/2 * (Math.cos(Math.PI*t/d) - 1) + b; };
easeInExpo = function (t, b, c, d) { return c * Math.pow( 2, 10 * (t/d - 1) ) + b; };
easeOutExpo = function (t, b, c, d) { return c * ( -Math.pow( 2, -10 * t/d ) + 1 ) + b; };
easeInOutExpo = function (t, b, c, d) { t /= d/2; if (t < 1) return c/2 * Math.pow( 2, 10 * (t - 1) ) + b; t--; return c/2 * ( -Math.pow( 2, -10 * t) + 2 ) + b; };
easeInCirc = function (t, b, c, d) { t /= d; return -c * (Math.sqrt(1 - t*t) - 1) + b; };
easeOutCirc = function (t, b, c, d) { t /= d; t--; return c * Math.sqrt(1 - t*t) + b; };
easeInOutCirc = function (t, b, c, d) { t /= d/2; if (t < 1) return -c/2 * (Math.sqrt(1 - t*t) - 1) + b; t -= 2; return c/2 * (Math.sqrt(1 - t*t) + 1) + b; };

// --- frame rate management --- //

JS3.func = [];
JS3.loop = function(){JS3.getFrameRate();for(var i=0; i < JS3.func.length; i++)JS3.func[i]();window.getAnimFrame(JS3.loop);};
window.getAnimFrame = (function(){
	return  window.requestAnimationFrame		||
			window.webkitRequestAnimationFrame	||
			window.mozRequestAnimationFrame		||
			window.oRequestAnimationFrame		||
			window.msRequestAnimationFrame		||
	function( callback ){ window.setTimeout(callback, 1000 / 60); };
})();
JS3.getFrameRate = function(){
	var now = window.mozAnimationStartTime || Date.now();
	if (now - JS3.FT > 5){ JS3.FR = 1000 / (now - JS3.FT); JS3.FT = now;}
};
JS3.showFrameRate = function(x, y, stage){
	if (document.getElementById('JS3FR')) return;
	var xx = 0; yy = 0;
	if (stage){ xx = stage.position.x; yy = stage.position.y; }
	if (x) xx += x; if (y) yy += y;
	var d = document.createElement('div');
		d.setAttribute('id', 'JS3FR');
		d.style.position = "absolute";
		d.style.left = xx+'px'; d.style.top = yy+'px';
		d.style.background = "#333"; d.style.border = "1px solid #555";
		d.style.color = '#00ff00'; d.style.padding = '10px';
		d.style.fontSize = '16px'; d.style.fontFamily = 'Arial,sans-serif';
		d.style.textShadow='1px 1px 0 #000';
		d.innerHTML = '60.0 fps';
	document.body.appendChild(d);
	setInterval(function(){
		var n = JS3.FR.toFixed(1);
		d.innerHTML = n+' fps';
		if (n<15){d.style.color = '#ff0000';}else if (n>=15 && n<=30){d.style.color = '#ffff00';} else{d.style.color = '#00ff00';}
	}, 1000);
}
JS3.FR = 0; JS3.FT = Date.now() - 1;
// start the main animation loop //
window.getAnimFrame(JS3.loop);

// graphic primitives //

function JS3Line(o)
{
	JS3getBaseProps(this);
	JS3getLineProps(this);
	this.update = JS3.drawLine;
	if (o) JS3.copyProps(o, this);
}

function JS3Arc(o)
{
	JS3getBaseProps(this);
	JS3getLineProps(this);
	this.update = JS3.drawArc;
	if (o) JS3.copyProps(o, this);
}

function JS3Tri(o)
{
	JS3getBaseProps(this);
	JS3getPolyProps(this);
	this.update = JS3.drawTri;
	if (o) JS3.copyProps(o, this);
}

function JS3Rect(o)
{
	JS3getBaseProps(this);
	this.update = JS3.drawRect;
	if (o) JS3.copyProps(o, this);
}

function JS3Circle(o)
{
	JS3getBaseProps(this);
	this.update = JS3.drawCirc;
	if (o) JS3.copyProps(o, this);
}

function JS3Text(o)
{
	JS3getBaseProps(this);
	JS3getTextProps(this);
	this.update = JS3.drawText;
	if (o) JS3.copyProps(o, this);
}

function JS3Image(o)
{
	JS3getImageProps(this);
	this.update = JS3.drawImage;
	this.fill = this.stroke = false;
	if (o) JS3.copyProps(o, this);
}

function JS3getBaseProps(o)
{	
	Object.defineProperty(o, "size",	{	get: function() { return o._size;},
											set: function(n) { o._size=o.width=o.height=n;}});
	Object.defineProperty(o, "width", 	{	get: function() { return o._width;},
											set: function(n) { o._width=n; o.pts=[];}});
	Object.defineProperty(o, "height",	{	get: function() { return o._height;},
											set: function(n) { o._height=n; o.pts=[];}});
	Object.defineProperty(o, "linear",	{	set: function(a) { o._gradient=a; o.drawGradient = JS3.drawLinear}});
	Object.defineProperty(o, "radial",	{	set: function(a) { o._gradient=a; o.drawGradient = JS3.drawRadial}});
	o.x=o.y=o.rotation=0; o._size=25; o.fillColor='#ddd'; o.strokeColor='#ccc'; o.fill=o.stroke=true;o.alpha=o.scaleX=o.scaleY=o.fillAlpha=o.strokeAlpha=1; o.strokeWidth=2;
	JS3setObjEvents(o);
}

function JS3getLineProps(o)
{
	o.capStyle='butt'; o.x1=o.y1=o.cx=o.cy=o.x2=o.y2=0;
	Object.defineProperty(o,"color", 	{	set: function(s) { o.strokeColor=s;}});
	Object.defineProperty(o,"thickness",{	set: function(s) { o.strokeWidth=s;}});
}

function JS3getPolyProps(o)
{
	o.pts = [];
	Object.defineProperty(o, "x1", 		{	set: function(n) { o.pts[0] = n;}});
	Object.defineProperty(o, "y1", 		{	set: function(n) { o.pts[1] = n;}});
	Object.defineProperty(o, "x2", 		{	set: function(n) { o.pts[2] = n;}});
	Object.defineProperty(o, "y2", 		{	set: function(n) { o.pts[3] = n;}});
	Object.defineProperty(o, "x3", 		{	set: function(n) { o.pts[4] = n;}});
	Object.defineProperty(o, "y3", 		{	set: function(n) { o.pts[5] = n;}});
}

function JS3getImageProps(o)
{
	o.image = new Image();
	Object.defineProperty(o, "src", 	{	set: function(s) { o.image.src=s;}});
	Object.defineProperty(o, "ready", 	{	set: function(f) { o.image.onload=f;}});
	Object.defineProperty(o, "width", 	{	get: function() { return o.image.width;}});
	Object.defineProperty(o, "height", 	{	get: function() { return o.image.height;}});
	o.x=o.y=o.rotation=0; o.fillColor='#ddd'; o.strokeColor='#ccc'; o.fill=o.stroke=true;o.alpha=o.scaleX=o.scaleY=o.fillAlpha=o.strokeAlpha=1; o.strokeWidth=2;
	JS3setObjEvents(o);
}

function JS3getTextProps(o)
{
	o.size=12; o.font='Arial'; o.color='#333'; o.stroke=o.bold=o.italic=false;
}

function JS3getTextHeight(o)
{
	var b = document.getElementsByTagName("body")[0];
	var d = document.createElement("div");
	d.appendChild(document.createTextNode("M"));
	d.setAttribute("style", "font-family:" + o.font + "; font-size:" + o.size + "pt; line-height:normal");
	b.appendChild(d);
	var h = d.offsetHeight;
	b.removeChild(d);
	return h;
}

function JS3setObjEvents(o)
{
	Object.defineProperty(o, "down", 		{	set: function(f) { o._mouseDown=f; o.enabled=true;}});
	Object.defineProperty(o, "up", 			{	set: function(f) { o._mouseUp=f; o.enabled=true;}});
	Object.defineProperty(o, "over", 		{	set: function(f) { o._mouseOver=f; o.enabled=true;}});
	Object.defineProperty(o, "out", 		{	set: function(f) { o._mouseOut=f; o.enabled=true;}});
	Object.defineProperty(o, "click", 		{	set: function(f) { o._click=f; o.enabled=true;}});
	Object.defineProperty(o, "dclick", 		{	set: function(f) { o._doubleClick=f; o.enabled=true;}});
	Object.defineProperty(o, "draggable", 	{	get: function( ) { return o._draggable;},
												set: function(b) { o._draggable=b; if (b==true) o.enabled=true;}});
	Object.defineProperty(o, "dragStart", 	{	set: function(f) { o._dragStart=f;o.draggable=true;}});
	Object.defineProperty(o, "dragChange", 	{	set: function(f) { o._dragChange=f;o.draggable=true;}});
	Object.defineProperty(o, "dragComplete",{	set: function(f) { o._dragComplete=f;o.draggable=true;}});
}
function JS3setStageEvents(o)
{	
	Object.defineProperty(o, "down", 		{	set: function(f) { o._mouseDown=f; }});
	Object.defineProperty(o, "up", 			{	set: function(f) { o._mouseUp=f; }});
	Object.defineProperty(o, "move", 		{	set: function(f) { o._mouseMove=f; }});
	Object.defineProperty(o, "click", 		{	set: function(f) { o._click=f; }});
	Object.defineProperty(o, "dclick", 		{	set: function(f) { o._doubleClick=f; }});
	Object.defineProperty(o, "enter", 		{	set: function(f) { o._stageEnter=f; }});
	Object.defineProperty(o, "leave", 		{	set: function(f) { o._stageLeave=f; }});
    Object.defineProperty(o, "focusIn", 	{	set: function(f) { o._windowFocusIn=f; }});
    Object.defineProperty(o, "focusOut", 	{	set: function(f) { o._windowFocusOut=f; }});
}

function JS3Event(type, target, owner, x, y)
{
	this.x			= x;
	this.y			= y;
	this.type		= type;
	this.target		= target;
	this.owner		= owner;
}

function JS3Tween(obj, dur, props)
{
	this.object 	= obj;
	this.duration 	= dur * 1000;
	this.delay 		= props.delay;
	this.start		= 0;
	this.elapsed	= 0;
	this.onStart	= props.onStart;
	this.onComplete	= props.onComplete;
	this.easeFunc	= props.ease || linear;
	this.props 		= {};
	for (var p in props) if (JS3isNumber(props[p])) this.props[p] = {a:obj[p], b:props[p]-obj[p]};
}

function JS3Runner(func, delay, repeat, onComp)
{
	this.f 			= func;
	this.d 			= delay;
	this.r			= repeat;
	this.o 			= onComp;
	this.t 			= Date.now();
	Object.defineProperty(this, "delay", 		{	set: function(n) { this.d=n; }});
	Object.defineProperty(this, "onComplete", 	{	set: function(f) { this.o=f; }});
	Object.defineProperty(this, "repeatCount", 	{	set: function(n) { this.r=n; }});
}

function JS3Trace(m) { try{ console.log(m); } catch(e){ return; }}
function JS3isNumber(n) { return !isNaN(parseFloat(n)) && isFinite(n); }
if (trace == undefined) var trace = JS3Trace;
