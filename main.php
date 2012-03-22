<?php
    include ('./php/header.php'); 
?>
        <div id='content'>
                <div id="header">
                    <h1>Simple, Flash-like Tweening for the JavaScript Canvas</h1>
                    <p>JS3 is a fast, lightweight port of the familiar <a href='http://www.greensock.com/tweenlite/' target='blank'>TweenLite</a> ActionScript library for the JavaScript Canvas allowing you to do things like :</p>                    
                </div>
                <div id="header-example">
                    <pre id='x1-code'><code>                     
        var c = new JS3Circle();
        stage.addChild(c);
        stage.tween(c, 2, {x:500});
                    </code></pre>
                    <canvas id="x1" width='585' height='102'></canvas>
                </div><hr>
                <div id="features" class='clearfix'>
                    <h2>Core Features</h2>
                    <ul>
                        <li>Simple API for drawing basic primitives: <a href='./drawing.php#cr'>Circles, Ellipses, Squares, Rectangles</a>, <a href='./drawing.php#tri'>Triangles</a>, <a href='./drawing.php#la'>Lines & Arcs</a></li>
                        <li>Built in Mouse interactions: <a href='./mouse-events.php'>Click, Drag, RollOver, RollOut, etc..</a></li>
                        <li>Support for loading images and writing text</li>                        
                        <li>Tween multiple properties at the same time: <b>x, y & alpha, etc..</b></li>
                        <li>Delayed Tweens, onStart & onComplete callbacks</li>
                        <li>Sequence, or daisy-chain multiple tweens together using callbacks</li>
                    </ul>
                </div><hr>
                <h2>Interactive Demo</h2>
                <p >Move the Shape and Target around and paste the generated code into your HTML document.</p>                
                <div id="js3-demo">                    
                    <canvas id="js3-demo-canvas" width="623" height="252" style='float:left;margin-right:10px'></canvas>
                    <div id="datgui" style='margin:-30px 10px 0 0;float:left'></div>
                </div>
                <pre style='margin-top:5px;'><code id='js3-demo-out' class='javascript'></code></pre>                
                <hr>
                <div id="getting-started">
                    <h2>Getting Started</h2>
                    <p>First things first, add a canvas tag to your HTML and give it a unique id.</p>
                    <pre><code class='html'>
        &lt;body&gt;                
        &lt;canvas id="my-canvas" width="800" height="100"&gt;&lt;/canvas&gt;
        &lt;/body&gt;        
                    </code></pre>    
                    <p>Include a link to the JS3 library right before your closing body tag.</p>
                    <pre><code>
        &lt;body&gt;                
        &lt;canvas id="my-canvas" width="800" height="100"&gt;&lt;/canvas&gt;                        
        &lt;script src="https://raw.github.com/braitsch/js3/master/src/JS3.js"&gt;&lt;/script&gt;
        &lt;/body&gt;                
                    </code></pre>    
                    <p>Initialize a new JS3 object and pass in a reference to your canvas element.</p>
                    <pre><code>
        &lt;body&gt;                
        &lt;canvas id="my-canvas" width="800" height="100"&gt;&lt;/canvas&gt;                        
        &lt;script src="https://raw.github.com/braitsch/js3/master/src/JS3.js"&gt;&lt;/script&gt;
        &lt;script&gt;
            var stage = new JS3('my-canvas');
                stage.background = '#eee';
        &lt;/script&gt;
        &lt;/body&gt;                
                    </code></pre>  
                    <p>Draw & animate shapes using the familiar AS3 / TweenLite syntax.<br>The following snippet draws a circle and tweens it to 200px on the X axis over a duration of one second.</p>
                    <pre><code>
        &lt;body&gt;                
        &lt;canvas id="my-canvas" width="800" height="100"&gt;&lt;/canvas&gt;                        
        &lt;script src="https://raw.github.com/braitsch/js3/master/src/JS3.js"&gt;&lt;/script&gt;
        &lt;script&gt;
            var stage = new JS3('my-canvas');
                stage.background = '#eee';
            var circle = new JS3Circle();
                stage.addChild(circle);
                stage.tween(circle, 1, {x:200});
        &lt;/script&gt;
        &lt;/body&gt;                
                    </code></pre>                                                                                              
                </div><hr>
                
        <!-- drawing-shapes -->    
                <div id="drawing-shapes">
                    <h2>Drawing Shapes</h2>
                    <p>You can draw simple shapes by calling the appropriate method and passing in an object that defines how the shape should be drawn.<br>
Once these shapes are drawn, the objects that define them are immediately removed from memory.<br>This makes Shapes ideal for quickly drawing graphics to the screen where no further animation is desired.</p>
                <pre><code>
    	var stage = new JS3('x2');
    	stage.drawCircle( { x:50, y:25, size:50 } );
    	stage.drawRect( { x:120, y:25, width:80, height:50 } );
    	stage.drawLine( { x:220, y:25, x1:0, y1:50, x2:50, y2:0 } );
    	stage.drawArc( { x:280, y:25, x1:0, y1:50, cx:40, cy:-50, x2:80, y2:50 } );
    	stage.drawTri( { x:380, y:25, size:50 } );
                </code></pre>
                <p>Results in drawing the following to the screen. <a href='./drawing.php'>Click here to learn more about drawing simple shapes.</a></p>
                <canvas id="x2" width='898' height='100'></canvas>  
                </div><hr> 
                 
        <!-- drawing-sprites -->    
                <div id="drawing-sprites">
                    <h2>Drawing Sprites</h2>
                    <p>Sprites are objects that persist in memory allowing you to animate them over time.<br>
The syntax is very similar to creating basic shapes, except that you must also manually add them to the display list.</p>
                <pre><code>
        var stage = new JS3('my-canvas');	
        var c = new JS3Circle();
            c.size = 50; c.fillColor = "#ddd"; c.strokeColor = "#ccc"; c.strokeWidth = 2;
        stage.addChild( c );	
                </code></pre>
                </div><hr>                

        <!-- basic-tweening -->                    
                <div id="basic-tweening">
                    <h2>Basic Tweening</h2>                
                <p>Once you've created a Sprite you can animate it using the familiar TweenLite syntax.</p>
                <pre><code>
        var c = new JS3Circle();                     
        c.x = 75; 
        c.y = 25;                          
        stage.tween(c, 3, {x:800, alpha:0});
                </code></pre>
                <canvas id="x3" width='898' height='100'></canvas>  
                <button id='x3-btn' class='btn btn-primary'>Tween Me</button>
                </div>
                <div class="clearfix"><hr></div>
                
        <!-- chaining-tweens -->                    
                <div id="chaining-tweens">
                    <h2>Chaining Tweens</h2>                
                <p>You can also chain tweens together by specifying a callback to fire when the animation completes.</p>
                <pre><code>                        
        stage.tween(c, 3, {x:800, onComplete:function(){
            stage.tween(c, 1, {alpha:0});
        }});
                </code></pre>
                <canvas id="x4" width='898' height='100'></canvas>  
                <button id='x4-btn' class='btn btn-primary'>Tween Me</button>
                </div>
                <div class="clearfix"><hr></div>  
                
        <!-- timed-frames -->                    
                <div id="animating-timers">
                    <h2>Animating with Timers</h2>
                <p>You can control how often the canvas redraws itself by using the <strong><u>run</u></strong> method.<br>
This method takes two arguments, a function to call and how often to call it in seconds.<br>
The snippet below draws a circle and moves it ten pixels to the right every time 1/4 of a second.</p>
                <pre><code>                        
        var c = new JS3Circle();
            c.size = 75; c.fillColor = "#ddd"; c.strokeColor = "#ccc"; c.strokeWidth = 2;
        stage.addChild( c );               
    	function update()
        {
	        c.x +=10;
	        if (c.x >= 800) c.x = 75;
        }
        stage.run(update, .25);
                </code></pre>
                <canvas id="x5" width='898' height='100'></canvas>  
                <button id='x5-btn' class='btn btn-primary'>Start Updating</button>
                <div class="clearfix"><hr></div> 
                <p>You can also specify how many times the <strong><u>run</u></strong> method should call the function you passed to it.<br>
The snippet below moves the circle fifty pixels to the right every time 1/2 second. It does this 5 times and then stops.</p>
                <pre><code>                        
        var c = new JS3Circle();
            c.size = 75; c.fillColor = "#ddd"; c.strokeColor = "#ccc"; c.strokeWidth = 2;
        stage.addChild( c );               
    	function update()
        {
	        c.x +=50;
        }
        stage.run(update, .5, 5);
                </code></pre>
                <canvas id="x6" width='898' height='100'></canvas>  
                <button id='x6-btn' class='btn btn-primary'>Start Updating</button>
                </div>
                <div class="clearfix"><hr></div> 
        <p>Note you can also pass a fourth argument to <strong><u>run</u></strong> specifying a callback to execute when all calls to run's update function have completed.<br>
The following snippet calls the update function every 1/2 second, fives times and then executes the callback "onUpdateComplete".   
            </p>
                <pre><code>
    	function update()
        {
	        c.x +=50;
        }
        function onUpdateComplete()
        {
            console.log('done!');
        }
        stage.run(update, .5, 5, onUpdateComplete);        
                </code></pre>                
<p>Lastly, calling <strong><u>run</u></strong> with just an update function and no other arguments will execute "update" on every frame tick, similar to the AS3 <a href='http://help.adobe.com/en_US/FlashPlatform/reference/actionscript/3/flash/events/Event.html#ENTER_FRAME' target='blank'>OnEnterFrame.</a><br>
At any time if you'd like to stop calling the function you passed to <strong><u>run</u></strong> simply pass the function to <strong><u>stop</u></strong></p>
                <pre><code>
        stage.stop(update);
                </code></pre>
        <div class="clearfix"><hr></div>
        
        <!-- simple-example -->                    
                <div id="multiple-sprites">
                    <h2>Animating Multiple Sprites</h2>                
                <p>The following snippet creates two circles and slowly bounces them around the Stage.<br>
The "drawCircle" function just returns a basic circle and the "update" function called on every frame moves each circle along in its current direction.<br>If the circle hits the boundaries of the Stage, its direction is reversed.</p>
                <pre><code>                        
    // draw a circle and set a unique directionX & directionY value on it //    
    function drawCircle()
    {
        var c = {};
        c.size = 15; c.x = Math.random()*stage.width; c.y = Math.random()*stage.height; 
        c.fillColor = "#ddd"; c.strokeColor = "#ccc"; c.strokeWidth = 2;	
        c.dirX = Math.round(Math.random()) == 0 ? -1 : 1;
        c.dirY = Math.round(Math.random()) == 0 ? -1 : 1;
        return c;
    }
    // update function to bounce the circles around the canvas //
    function update()
    {
    	var i = stage.numChildren;
    	while ( i-- ){
    		var c = stage.getChildAt(i);
    		if (c.x >= stage.width || c.x <= 0) c.dirX *=-1;
    		if (c.y >= stage.height || c.y <= 0) c.dirY *=-1;
    		c.x += c.dirX;
    		c.y += c.dirY;
    	}
    }
    // attach two circles to the stage //
    var c1 = new JS3Circle(drawCircle());
    stage.addChild( c1 );
    var c2 = new JS3Circle(drawCircle());
    stage.addChild( c2 );                
    // finally call the update function on every frame //
    stage.run(update);
                </code></pre>
                <canvas id="x7" width='898' height='100'></canvas>  
                <button id='x7-btn' class='btn btn-primary'>Stop Updating</button>
                </div>
                <div class="clearfix"><hr></div>
                <h2>More features & examples coming soon...</h2>
        <?php include ('./php/footer.php'); ?>
        <script type="text/javascript" src="./local/demo.js"></script>
        <script type="text/javascript" src="./local/main-page.js"></script>
        <script type="text/javascript" src="./vendor/dat.gui.min.js"></script>
	    <script type="text/javascript" src="http://yandex.st/highlightjs/6.1/highlight.min.js"></script>
        <script>hljs.initHighlightingOnLoad();</script>
    </body>
</html>