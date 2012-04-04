<?php
    include ('../local/header.php'); 
?>
        <div id='content'>
            <div id="header">
                <h1>JS3 API</h1>
                <p>The JS3 API has the following properties and methods to help you control the Stage.</p><hr>
            </div>
            <div>
                <h2>Stage Properties</h2>
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

                <h2>Stage Methods</h2>
                <p>The following methods allow you to affect the internal display list.</p>
                <pre><code class='javascript'>
        stage = new JS3('my-canvas');
        stage.addChild( obj:JS3Object ) : void
        stage.addChildAt( obj:JS3Object, index:Number ) : void
        
        stage.getChildAt( index:Number ) : JS3Object
        stage.getChildAtRandom( ) : JS3Object
        
        stage.removeChild( obj:JS3Object ) : void
        stage.removeChildAt( index:Number ) : void
                </code></pre>
                
                <p>The following methods allow you control tweens and timed animations. Optional parameters are in <span style='color:blue'>blue</span>.<br>
                For more information on these Tweening methods, check the section on <a href=<?php linkto('/tweening')?>>Tweening.</a></p>
                <pre><code class='javascript'>
        stage = new JS3('my-canvas');
        stage.run( Function, <span style='color:blue'>Delay, RepeatCount, onCompleteCallback</span> );
        stage.stop( Function );
        stage.tween( JS3Object, Duration, Properties );
                </code></pre>
        
                <p>The following are additional general utility methods for controlling the Stage.</p>
                <pre><code class='javascript'>
        stage = new JS3('my-canvas');
        stage.clear();  // stops all animations, removes all children and draws the background to stage.background
        stage.setSize( width:Number, height:Number );
        stage.save();  // opens a popup window allowing the user to save the current state of the Stage as a .png
                </code></pre><hr>
                
                <h2>Drawing Methods</h2>
                <p>Use the following methods to draw a non-persistent Shape on the Stage.<br>
                Each method requires an Object that describes how the Shape should be positioned and drawn.<br>
                For more information about these methods, check the section on <a href=<?php linkto('/drawing')?>>drawing.</a></p>
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
        
        
                <h2>Static Methods</h2>
                <p>JS3 also includes a couple convenient static methods to help with common tasks.</p>
        <pre><code class='javascript'>
        JS3.getRandomColor() : Number
        JS3.getRandomValue() : Number
        </code></pre>
                <p>JS3.getRandomValue supports <a href='http://en.wikipedia.org/wiki/Function_overloading'>function overloading</a> meaning that you can call it three different ways.</p>
        <pre><code class='javascript'>
        JS3.getRandomValue() // returns a number between 0 and 1
        JS3.getRandomValue(n1) // returns a number between 0 and n1
        JS3.getRandomValue(n1, n2) // returns a number between n1 and n2        
        </code></pre>                
        </div><hr>
        <?php include ('../local/footer.php'); ?>
	    <script type="text/javascript" src="http://yandex.st/highlightjs/6.1/highlight.min.js"></script>
        <script>hljs.initHighlightingOnLoad();</script>
    </body>
</html>