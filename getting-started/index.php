<?php
    include ('../local/header.php'); 
?>
        <div id='content'>
            <div id="header">
                <h1>Getting Started</h1>
                <p class='anchor-nav'>JS3 makes it easy to draw five basic primitive shapes. 
                    <a href='#cr'>Circles</a>,
                    <a href='#cr'>Rectangles</a>, 
                    <a href='#tri'>Triangles</a>, 
                    <a href='#la'>Lines</a> and 
                    <a href='#la'>Arcs.</a></p>
                <hr>
            </div>
            
                <div>
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
                
        <?php include ('../local/footer.php'); ?>
        <script type="text/javascript" src="./getting-started.js"></script>            
	    <script type="text/javascript" src="http://yandex.st/highlightjs/6.1/highlight.min.js"></script>
        <script>hljs.initHighlightingOnLoad();</script>
    </body>
</html>