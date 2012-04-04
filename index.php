<?php
    include ('./local/header.php'); 
?>
        <div id='content'>
                <div id="header">
                    <h1>Simple, Flash-like Tweening for the JavaScript Canvas</h1>
                    <p>JS3 is a fast and lightweight drawing and animation library for the JavaScript Canvas allowing you to easily do things like :</p>                    
                </div>
                <div id="header-example">
                    <pre id='home-canvas-code'><code>                     
        var c = new JS3Circle();
        stage.addChild(c);
        stage.tween(c, 2, {x:500});
                    </code></pre>
                    <canvas id="home-canvas" width='585' height='102'></canvas>
                </div><hr>
                <div id="features" class='clearfix'>
                    <h2>Core Features</h2>
                    <ul>
                        <li>Simple API for drawing basic primitives: 
                            <a href=<?php linkto('/drawing/#cr')?>>Circles, Ellipses, Squares, Rectangles</a>, 
                            <a href=<?php linkto('/drawing/#tri')?>>Triangles</a>, 
                            <a href=<?php linkto('/drawing/#la')?>>Lines & Arcs</a></li>
                        <li>Built in Mouse interactions: <a href=<?php linkto('/mouse-events')?>>Click, Drag, RollOver, RollOut, etc..</a></li>
                        <li>Support for displaying <a href=<?php linkto('/images-and-text')?>>Images and Text</a></li>
                        <li>Tween multiple properties at the same time: <b>x, y & alpha, etc..</b></li>
                        <li>Delayed Tweens, onStart & onComplete callbacks</li>
                        <li>Sequence, or daisy-chain multiple tweens together using callbacks</li>
                    </ul>
                </div><hr>
                <h2>Interactive Demo</h2>
                <p >Move the Shape and Target around and paste the generated code into your HTML document.</p>                
                <div id="js3-demo">                    
                    <canvas id="demo-canvas" width="623" height="278" style='float:left;margin-right:10px'></canvas>
                    <div id="datgui" style='margin:-30px 10px 0 0;float:left'></div>
                </div>
                <pre style='margin-top:5px;'><code id='js3-demo-out' class='javascript'></code></pre><hr>

            <p class='next-page'><b>Learn how to easily add JS3 to your project. <a href=<?php linkto('/getting-started');?>>Click here to get started.</a></b></p><hr>

        <?php include ('./local/footer.php'); ?>
        <script type="text/javascript" src="./home/demo.js"></script>
        <script type="text/javascript" src="./home/home.js"></script>
        <script type="text/javascript" src="./vendor/dat.gui.min.js"></script>
	    <script type="text/javascript" src="http://yandex.st/highlightjs/6.1/highlight.min.js"></script>
        <script>hljs.initHighlightingOnLoad();</script>
    </body>
</html>