<?php
    include ('./php/header.php'); 
?>
        <div id='content'>
            <div id="header">
                <h1>Drawing Shapes</h1>
                <p>JS3 makes it easy to draw five basic primitive shapes. Circles, Rectangles, Triangles, Lines and Arcs.</p>
                <hr>
            </div>
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
                    </code></pre><hr>
                <h2>Circles, Rectangles and Triangles</h2>
                <p>In addition to the base object properties defined above, Circles, Rectangles & Triangles also define fill & stroke values.<br>To turn off a Shape's fill or stroke set its <strong><u>fillAlpha</u></strong> or <strong><u>strokeAlpha</u></strong> property to zero.</p>
                    <pre><code>
        fillColor   :Number = '#DDD';
        fillAlpha   :Number = 1;
        strokeColor :Number = '#CCC';
        strokeAlpha :Number = 1;
        strokeWidth :Number = 4;
                    </code></pre>
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
                    <p><strong>Quick Note :</strong> Setting a Shape's size will overwrite any previous values that have been set for its width and height.<br>
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
                    </code></pre>                        
                    <p>There are <strong><u>three</u></strong> ways to draw Triangles.<br> 
                        In addition to setting its size, width & height you can also draw custom Triangles by specifying the x and y location of each of its three points.</p>
                    <pre><code>
    // draw a Triangle whose sides are 50 pixels in length //                    
        var t = new JS3Triangle(); 
            t.size = 50;
        stage.addChild(t);
    // draw a Triangle whose horizontal side is 80 pixels and whose vertical sides are 40 pixels in length //
        var t = new JS3Triangle(); 
            t.width = 80;
            t.height = 40;            
        stage.addChild(t);            
    // draw a custom Triangle by specifying its three points relative to the its x & y position.
        var t = new JS3Triangle(); 
    // position this Triangle at 50 pixels on the x and y axis    
            t.x = 50;
            t.y = 50;
    // x1 will be drawn at the global coordinate of 80, y1 at 100 etc...
            t.x1 = 30;
            t.y1 = 50;
            t.x2 = 60;
            t.y2 = 0;
            t.x3 = 90;
            t.y3 = 50;                                                        
        stage.addChild(c);             
                    </code></pre>                            
                        
                    <hr>                    
                <h2>Lines and Arcs</h2>                    
                    <p>Lines & Arcs define the following unique values :</p>
                    <pre><code>  
        color       :Number = '#333';
        thickness   :Number = 4;
        capStyle    :String = 'butt'; // (valid values are 'butt, round, or square')
                    </code></pre><hr>               
            </div>
        </div>
        <script type="text/javascript" src="./vendor/jquery-1.7.1.min.js"></script>
        <script type="text/javascript" src="./local/drawing.js"></script>         
        <script type="text/javascript" src="./vendor/bootstrap-dropdown.js"></script>
	    <script src="http://yandex.st/highlightjs/6.1/highlight.min.js"></script>
        <script>hljs.initHighlightingOnLoad();</script>          
    </body>
</html>