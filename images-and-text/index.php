<?php
    include ('../local/header.php'); 
?>
        <div id='content'>
            <div id="header">
                <h1>Images & Text</h1>
                <p>JS3 has built in support to easily display Images and render Text.</p>
                <hr>
            </div>
            
        <h2>Displaying Images</h2>
        <p>To display an Image on the canvas, simply create a JS3Image Object and pass in the path of the file to be loaded.</p>
            <pre><code class='javascript'>
        var stage = new JS3('my-canvas');                
        var img = new JS3Image( {src:'nyancat.png'} );
            img.x = 25; 
            img.y = 25;                          
        stage.addChild(img);
            </code></pre>
        <canvas id="img-1" width='898' height='100'></canvas>
        <p>Or of course you can specify the <u><b>src</b></u> on the JS3Image itself instead of passing it into the constructor.</p>            
            <pre><code class='javascript'>
        var stage = new JS3('my-canvas');                
        var img = new JS3Image( {x:25, y:25} );
            img.src = 'nyancat.png';
            img.rotation = 90;
        stage.addChild(img);
            </code></pre>
        <canvas id="img-2" width='898' height='100'></canvas>
        <p><b>Supported Image file formats include <span style='color:blue'>png, jpg, </span>and <span style='color:blue'>gif.</span></b></p><hr>
        <h2>Rendering Text</h2>
        <p>Rendering Text on the canvas is as simple as creating a JS3Text Object and adding it to the Stage.</p>
            <pre><code class='javascript'>
        var stage = new JS3('my-canvas');
        var text = new JS3Text( {text:'Hello World!'} );
            text.x = 25; 
            text.y = 25;
            text.rotation = 180;
        stage.addChild(text);
            </code></pre>
        <canvas id="img-3" width='898' height='100'></canvas>
               
        <?php include ('../local/footer.php'); ?>        
        <script type="text/javascript" src="./images-and-text.js"></script>            
	    <script type="text/javascript" src="http://yandex.st/highlightjs/6.1/highlight.min.js"></script>
        <script>hljs.initHighlightingOnLoad();</script>
    </body>
</html>