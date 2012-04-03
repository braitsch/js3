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
                </code></pre>
                
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