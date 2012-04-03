<?php
    include ('../local/header.php'); 
?>
        <div id='content'>
            <div id="header">
                <h1>Getting Started</h1>
                <p>Here's how to add JS3 to your project to quickly get started drawing and animating.</p>
                <hr>
            </div>
                <div>
                    <p><b>1.</b> First things first, add a canvas tag to your HTML and give it a unique id.</p>
                    <pre><code class='html'>
        &lt;body&gt;                
        &lt;canvas id="my-canvas" width="800" height="100"&gt;&lt;/canvas&gt;
        &lt;/body&gt;        
                    </code></pre>    
                    <p><b>2.</b> Include a link to the JS3 library right before your closing body tag.</p>
                    <pre><code>
        &lt;body&gt;                
        &lt;canvas id="my-canvas" width="800" height="100"&gt;&lt;/canvas&gt;                        
        &lt;script src="<?php echo $dl;?>"&gt;&lt;/script&gt;
        &lt;/body&gt;                
                    </code></pre>    
                    <p><b>3.</b> Initialize a new JS3 object and pass in the id of your canvas element.</p>
                    <pre><code>
        &lt;body&gt;                
        &lt;canvas id="my-canvas" width="800" height="100"&gt;&lt;/canvas&gt;                        
        &lt;script src="<?php echo $dl;?>"&gt;&lt;/script&gt;
        &lt;script&gt;
            var stage = new JS3('my-canvas');
        &lt;/script&gt;
        &lt;/body&gt;                
                    </code></pre>
                <p><b>4.</b> And that's it! You're now ready to start <a href=<?php linkto('/drawing');?>>drawing</a> and <a href=<?php linkto('/tweening');?>>animating</a>.</p>                     
                <hr>
                <p><b>Here's a quick example of how to draw a red circle and tween it across the Stage.</b></p>
                <pre><code>
        &lt;body&gt;                
        &lt;canvas id="my-canvas" width="800" height="100"&gt;&lt;/canvas&gt;                        
        &lt;script src="<?php echo $dl;?>"&gt;&lt;/script&gt;
        &lt;script&gt;
            var stage = new JS3('my-canvas');
                stage.background = '#CCC'
            var circ = new JS3Circle();
                circ.strokeColor = '#EEE';
                circ.strokeWidth = 4;
                circ.fillColor = '#9C0C0C';                
                circ.x = 25;
                circ.y = 35;
            stage.addChild(circ);
            var tweenCirc = function()
            {
                circ.x = 25;
        // automatically call tweenCirc again after the tween completes //                    
                stage.tween(circ, 8, {x:840, onComplete:tweenCirc});
            }
            tweenCirc();
        &lt;/script&gt;
        &lt;/body&gt;                
                </code></pre>
            <canvas id="gs-canvas" width='898' height='100'></canvas><hr>
            <p><b>Awesome, you're ready for the next section. Click here to learn more about <a href=<?php linkto('/drawing');?>>drawing shapes.</a></b></p><hr>
                
        <?php include ('../local/footer.php'); ?>
        <script type="text/javascript" src="./getting-started.js"></script>            
	    <script type="text/javascript" src="http://yandex.st/highlightjs/6.1/highlight.min.js"></script>
        <script>hljs.initHighlightingOnLoad();</script>
    </body>
</html>