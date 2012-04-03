<?php
    include ('../local/header.php'); 
?>
        <div id='content'>
            <div id="header">
                <h1>Drawing Shapes</h1>
                <p class='anchor-nav'>JS3 makes it easy to draw five basic primitive shapes. 
                    <a href='#cr'>Circles</a>,
                    <a href='#cr'>Rectangles</a>, 
                    <a href='#tri'>Triangles</a>, 
                    <a href='#la'>Lines</a> and 
                    <a href='#la'>Arcs.</a></p>
                <hr>
            </div>

        <!-- drawing-shapes -->    
                <div id="drawing-shapes">
                    <h2>Drawing Shapes</h2>
                    <p>You can draw simple shapes by calling the appropriate method and passing in an object that defines how the shape should be drawn.<br>
Once these shapes are drawn, the objects that define them are immediately removed from memory.<br>This makes Shapes ideal for quickly drawing graphics to the screen where no further animation is desired.</p>
                <pre><code>
    	var stage = new JS3('my-canvas');
        stage.drawCircle( { x:50, y:25, size:50 } );
        stage.drawRect( { x:120, y:25, width:80, height:50 } );
        stage.drawLine( { x:220, y:25, x1:0, y1:50, x2:50, y2:0 } );
        stage.drawArc( { x:280, y:25, x1:0, y1:50, xc:40, yc:-50, x2:80, y2:50 } );
        stage.drawTri( { x:380, y:25, size:58 } );
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





            <div id="drawing-basics">
                <h2>Drawing Basics</h2>
                <p>All Shapes & Sprites inherit from a base graphics object with the following properties and default settings.<br>
                    Each of these properties can be tweened by setting them to a different value.</p>
                    <pre><code>  
        x           :Number = 0;
        y           :Number = 0;
        alpha       :Number = 1;
        scale       :Number = 1;
        rotation    :Number = 1;
                    </code></pre>
                <p>In addition to the base object properties defined above, Circles, Rectangles, & Triangles also define fill & stroke values.<br>To disable the fill or stroke of a Shape, set its <strong><u>fill</u></strong> or <strong><u>stroke</u></strong> property to false.</p>
                    <pre><code>
        fill        :Boolean = true;
        fillColor   :Number = '#DDD';
        fillAlpha   :Number = 1;
        stroke      :Boolean = true;        
        strokeColor :Number = '#CCC';
        strokeAlpha :Number = 1;
        strokeWidth :Number = 4;
                    </code></pre><hr>
                <h2 id='cr'>Circles and Rectangles</h2>                    
                <p>The dimensions of Circles, Rectangles, & Triangles are defined by setting either their <b><u>size</u></b> property or their <b><u>width</u></b> and <b><u>height</u></b>.<br>Setting a Shape's <b><u>size</u></b> property constrains the object to equal dimensions.</p>
                    <pre><code>  
    // draw a circle with a diameter of 50 pixels //                
        var c = new JS3Circle(); 
            c.size = 50;
        stage.addChild(c);    
    // draw an Ellipse by setting separate values for a Circle's width and height.
        var c = new JS3Circle(); 
            c.width = 80;
            c.height = 40;
        stage.addChild(c);             
                    </code></pre>
                    <p><strong>Quick Tip :</strong> Setting a Shape's size will overwrite any previous values that have been set for its width and height.<br>
                        The following examples show how to draw a Square and Rectangle.</p>
                    <pre><code>  
    // draw a 50 pixels x 50 pixels Square //                
        var r = new JS3Rect(); 
            r.size = 50;
        stage.addChild(r);    
    // draw a Rectangle that is 80 pixels wide by 40 pixels tall.
        var r = new JS3Rect(); 
            r.width = 80;
            r.height = 40;
        stage.addChild(r);             
                    </code></pre><hr>
                <h2 id='tri'>Triangles</h2>
                    <p>There are <strong><u>three</u></strong> ways to draw Triangles.<br> 
                        In addition to setting its size, width & height you can also draw custom Triangles by specifying the x and y location of each of its three points.<br></p>
                    <p><strong>Quick Tip : </strong>Whenever you specify custom coordinate points, <strong><u>these points are always drawn relative to the Object's x & y position on the Stage.</u></strong></p>
                    <pre><code class='javascript'>
    // draw a Triangle whose sides are each 50 pixels in length //                    
        var t = new JS3Tri(); 
            t.size = 50;
        stage.addChild(t);
    // draw a Triangle with a varying width and height //
        var t = new JS3Tri(); 
            t.width = 80;
            t.height = 40;            
        stage.addChild(t);            
    // draw a custom Triangle by specifying its three points //
        var t = new JS3Tri(); 
    // position this Triangle at 50 pixels on the x and y axis //   
            t.x = 50;
            t.y = 50;
    // x1 will be drawn at the global coordinate of 80, y1 at 100 etc... //
            t.x1 = 30;
            t.y1 = 50;
            t.x2 = 60;
            t.y2 = 0;
            t.x3 = 90;
            t.y3 = 50;                                                        
        stage.addChild(c);             
                    </code></pre>
                    <hr>                    
                <h2 id='la' class='anchor-nav'>Lines and Arcs</h2>                    
                    <p>In addition to the base object properties, Lines & Arcs also have the following unique properites :</p>
                    <pre><code class='javascript'>  
        color       :Number = '#333';
        thickness   :Number = 4;
        capStyle    :String = 'butt'; // (valid values are 'butt, round, or square')
                    </code></pre>
                <p>To draw a line, simply define the x and y points to draw to.<br>
                    All lines & arcs start drawing from their x1 & y1 coordinates.<br>
                    If these are not set the line will start drawing from the line's x and y coordinates and if these are not set it will start from 0,0 </p>
                    <pre style='width:445px;float:left;margin-right:10px;'><code class='javascript'>
    	var line = new JS3Line();
    	    line.color = '#ff0000';    	 
    	    line.x = 50;
    	    line.y = 130;	
    	    line.y2 = -100;
    	    line.x2 = 340; 
    	stage.addChild(line);
                    </code></pre>
                <canvas id="d1" width='440' height='173'></canvas>
                <p class='clearfix'>
                    Drawing an Arc is simple and just requires an additional point to "pull" the Line in one direction or another.<br>
                    This third point is a control point defined with the properties <strong><u>xc</u></strong> and <strong><u>yc</u></strong>.</p>
                    <pre style='width:445px;float:left;margin-right:10px;'><code class='javascript'>
    	var arc = new JS3Arc();
            arc.color = '#ff0000';	
            arc.x = 50; 	
            arc.y = 190;
            arc.x1 = 0; 	
            arc.y1 = 0;
            arc.yc = -250; 	
            arc.xc = 170;
            arc.x2 = 340; 	
            arc.y2 = 0;	
        stage.addChild(arc);
                    </code></pre>
                <canvas id="d2" width='440' height='245'></canvas>
            </div>
        <?php include ('../local/footer.php'); ?>
        <script type="text/javascript" src="./drawing.js"></script>            
	    <script type="text/javascript" src="http://yandex.st/highlightjs/6.1/highlight.min.js"></script>
        <script>hljs.initHighlightingOnLoad();</script>
    </body>
</html>