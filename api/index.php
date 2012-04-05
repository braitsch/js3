<?php
    include ('../local/header.php'); 
?>
        <div id='content'>
            <div id="header">
                <h1>JS3 API</h1>
                <p>This page contains a detailed look at the JS3 API</a>
                <div class="subnav" style='background-color:#F5F5F5'>
                <ul class="nav nav-pills">
                    <li style='margin-left:50px'><a class='anchor' href="#api-stage">Stage API</a></li>      
                    <li><a class='anchor' href="#api-display-list">The Display List</a></li>      
                    <li><a class='anchor' href="#api-drawing">Drawing API</a></li>
                    <li><a class='anchor' href="#api-tweening">The Tween Method</a></li>
                    <li><a class='anchor' href="#api-timers">Timed Animations</a></li>
                    <li><a class='anchor' href="#api-framerate">Framerate Monitor</a></li>
                    <li><a class='anchor' href="#api-utilities">Utility Methods</a></li>                    
                </ul>
                </div>
            </div>
            <div>
                <h2 id='api-stage'>Stage API</h2>
                <p>The following properties of the Stage are <b>read-only</b>.</p>
                <pre><code class='javascript'>
        stage = new JS3('my-canvas');
        stage.width;
        stage.height;
        stage.numChildren;
                </code></pre>
                <p>The following properties of the Stage can be read as well as written, default values are shown.</p>
        <pre><code class='javascript'>
        stage = new JS3('my-canvas');            
        stage.interactive = false;          // tells the Stage to listen for mouse events
        stage.drawClean = true;             // tells the Stage to clear itself before drawing the next frame 
        stage.background = '#ffffff';       // the background color of the Stage
        stage.windowTitle = 'My Canvas';    // the title of pop-up windows used when saving the Stage to a .png
                </code></pre>
                
                <p>And the following are general utility methods for controlling the Stage.</p>
                <pre><code class='javascript'>
        stage = new JS3('my-canvas');
        stage.clear();  // stops all animations, removes all children and colors the background to stage.background
        stage.setSize( width:Number, height:Number ); // sets the size of the canvas, useful when the browser is resized.
        stage.save();  // opens a popup window allowing the user to save the current state of the canvas as a .png
                </code></pre><hr>

                <h2 id='api-display-list'>The Display List</h2>
                <p>The following methods allow you to modify the internal display list.</p>
                <pre><code class='javascript'>
        stage = new JS3('my-canvas');
        stage.addChild( obj:JS3Object ) : void
        stage.addChildAt( obj:JS3Object, index:Number ) : void
        
        stage.getChildAt( index:Number ) : JS3Object
        stage.getChildAtRandom( ) : JS3Object
        
        stage.removeChild( obj:JS3Object ) : void
        stage.removeChildAt( index:Number ) : void
                </code></pre><hr>
                
                <h2 id='api-drawing'>Drawing Methods</h2>
                <p>Use the following methods to draw non-persistent Shapes on the Stage.<br>
                Each method requires an Object that describes how the Shape should be positioned and drawn.<br>
                For more information about these methods and what you should pass into them, check the section on <a href=<?php linkto('/drawing')?>>drawing.</a></p>
        <pre><code class='javascript'>                
        stage = new JS3('my-canvas');
        stage.drawLine( {} );
        stage.drawArc( {} );
        stage.drawRect( {} );
        stage.drawCircle( {} );
        stage.drawTri( {} );
        stage.drawText( {} );        
        </code></pre><hr>

                <h2 id='api-tweening'>The Tween Method</h2>
				<p>The JS3 Tween method takes the following form :</p>
        <pre><code class='javascript'>
        target      : JS3Object     // any JS3Object
        duration    : Number        // time in seconds
        details     : Object        // an Object that describes the properties to tween and callbacks to execute.
    // put together, the syntax for a tween is as follows:
        stage.tween(target, duration, details);
        </code></pre>
				<p>The following properties can be tweened on any JS3Object.</p>
        <pre><code class='javascript'>
        x           : Number        // position on the x axis
        y           : Number        // position on the y axis        
        alpha       : Number        // opacity / transparency of the object
        scaleX      : Number        // horizontal scale
        scaleY      : Number        // vertical scale
        rotation    : Number        // rotation in degrees, negative values rotate counter-clockwise
    // put together, a typical tween could look like the following:
        stage.tween(target, duration, <span style='color:blue'>{x:100, y:100, alpha:.5, scaleX:3, scaleY:3, rotation:90}</span> );
        </code></pre>
				<p>The following callbacks can also be executed whenever a tween begins or ends.</p>
        <pre><code class='javascript'>								
        onStart     : Function      // called when the tween begins
        onComplete  : Function      // called when the tween completes		
        </code></pre>
				<p>You can also specify an amount of time to delay before starting the tween.</p>
        <pre><code class='javascript'>								
        delay       : Number        // amount of time to delay the start of the tween in seconds
        </code></pre>
				<p>All together, a tween with multiple properties and callbacks could look like the following :</p>        
        <pre><code class='javascript'>								
        stage.tween(my-circle, 1, <span style='color:blue'>{x:100, alpha:.5, rotation:90, onStart:onStartFunc, onComplete:onCompleteFunc, delay:1}</span>);
        </code></pre><hr>
        
                <h2 id='api-timers'>Timed Animation Methods</h2>
                <p>Timed animations are controlled using the <u>run</u> & <u>stop</u> methods.<br>
                    Both methods simply take the function to start and stop executing.</p>
        <pre><code class='javascript'>								
        stage.run( function ) : void
        stage.stop( function ) : void        
        </code></pre>
        <p>The run method also accepts three additional parameters :</p>
        <pre><code class='javascript'>								
        delay       : Number        // the number of seconds in between calls
        repeatCount : Number        // number of times to call the function before stopping, default is infinite
        onComplete  : Function      // a callback to execute when the repeatCount is reached
        </code></pre>
        <p>With the additional parameters specified, a call to <u>run</u> could look like the following :</p>
        <pre><code class='javascript'>
    // call the update function once a second, limit to ten times and then execute the onUpdateComplete function.        
        stage.run(update, 1, 10, onUpdateComplete);
        </code></pre><hr>
        
                <h2 id='api-framerate'>Framerate Monitor</h2>
                <p>JS3 includes a simple FPS monitor that automatically updates once per second.<br>
                    Note by default the monitor is absolutely positioned within the HTML document and is never a child of the Stage.<br>    
                </p>
        <pre><code class='javascript'>
        JS3.showFrameRate( xPosition:Number, yPosition:Number ); 
        </code></pre>
                <p>If you'd like to position it relative to your Stage just pass your Stage instance in as the third argument.</p> 
        <pre><code class='javascript'>
        stage = new JS3('my-canvas');
        JS3.showFrameRate(5, 5, stage);    
        </code></pre>
        <canvas id="api-1" width='898' height='100'></canvas><hr>        
                    
                <h2 id='api-utilities'>Utility Methods</h2>
                <p>JS3 also includes a couple convenient utility methods to help with common tasks.</p>
        <pre><code class='javascript'>
        JS3.getRandomColor() : Number
        JS3.getRandomValue() : Number
        </code></pre>
                <p>JS3.getRandomValue supports <a href='http://en.wikipedia.org/wiki/Function_overloading'>function overloading</a> meaning that you can call it three different ways.</p>
        <pre><code class='javascript'>
        JS3.getRandomValue() // returns a number between 0 and 1
        JS3.getRandomValue(n1) // returns a number between 0 and n1
        JS3.getRandomValue(n1, n2) // returns a number between n1 and n2        
        </code></pre><hr>
        
                
        <?php include ('../local/footer.php'); ?>
	    <script type="text/javascript" src="./api.js"></script>        
	    <script type="text/javascript" src="http://yandex.st/highlightjs/6.1/highlight.min.js"></script>
        <script>hljs.initHighlightingOnLoad();</script>
    </body>
</html>