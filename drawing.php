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
                <p>All Shapes & Sprites inherit from a base graphics object with the following properties and default settings :</p>
                    <pre><code class='javascript'>  
        x           :Number = 0; // position on the x axis
        y           :Number = 0; // position on the y axis
        alpha       :Number = 1; // object opacity (valid values are 0 - 1)
        scale       :Number = 1; // object scale (valid values are 0 - 1)
        rotation    :Number = 1; // object rotation (valid values are 0 - 1)        
                    </code></pre>
                    <p>Furthermore, Circles, Rectangles, & Triangles define fill & stroke values :</p>
                    <pre><code class='javascript'>  
        fillColor   :Number = '#333'; // inside color of the shape
        fillAlpha   :Number = 1; // opacity of the inside color of the shape
        strokeAlpha :Number = 1; // opacity of the border color of the shape
        strokeWidth :Number = 4; // border thickness
        strokeColor :Number = undefined; // border color of the shape, by default borders are turned off        
                    </code></pre>    
                    <p>Lines & Arcs define the following unique values :</p>
                    <pre><code class='javascript'>  
        color       :Number = '#333';
        thickness   :Number = 4;
        capStyle    :String = 'butt'; // (valid values are 'butt, round, or square')
                    </code></pre><hr>
                <h2>Circles</h2>
                <p>The full list of properties available to Circles is listed below.</p>
                    <pre><code class='javascript'>  
        size        :Number = 25; // the diameter of the circle
    // values inherited from base object //                
        x           :Number = 0; // position on the x axis
        y           :Number = 0; // position on the y axis
        alpha       :Number = 1; // object opacity (valid values are 0 - 1)
        scale       :Number = 1; // object scale (valid values are 0 - 1)
        rotation    :Number = 1; // object rotation (valid values are 0 - 1) 
        fillColor   :Number = '#333'; // inside color of the shape
        fillAlpha   :Number = 1; // opacity of the inside color of the shape
        strokeAlpha :Number = 1; // opacity of the border color of the shape
        strokeWidth :Number = 4; // border thickness
        strokeColor :Number = undefined; // border color of the shape, by default borders are turned off                
                    </code></pre>                
            </div>
        </div>
        <script type="text/javascript" src="./vendor/jquery-1.7.1.min.js"></script>
        <script type="text/javascript" src="./local/drawing.js"></script>         
        <script type="text/javascript" src="./vendor/bootstrap-dropdown.js"></script>
	    <script src="http://yandex.st/highlightjs/6.1/highlight.min.js"></script>
        <script>hljs.initHighlightingOnLoad();</script>          
    </body>
</html>