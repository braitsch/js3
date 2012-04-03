<?php
    include ('../local/header.php'); 
?>
        <div id='content'>
            <div id="header">
                <h1>Mouse Events</h1>
                <p class='anchor-nav'>All JS3Objects can easily be told to listen for Mouse Events</p><hr>
            </div>
            <div>
                <h2>Enabling Mouse Events</h2>
                <p>To optimize performance, Mouse Events are ignored by default. To tell the Stage to listen for Mouse Events set the Stage's <u>interactive</u> property to <u>true</u>.</p>
                    <pre><code>  
        stage = new JS3('my-canvas');
        stage.interactive = true;
                    </code></pre>
                <p>All JS3Objects have two basic properties that control their interactivity.<br>
To make any Object draggable, set its <u>draggable</u> property to <u>true</u>, likewise to tell any Object to ignore Mouse Events, set its <u>enabled</u> property to <u>false</u>.</p>
                <pre><code>  
        var c = new JS3Circle();
        c.enabled   = true;     // default
        c.draggable = false;    // default
                </code></pre>
            </div><hr>
            <div>
                <h2>Adding Event Listeners</h2>
                <p>JS3Objects have the following methods to listen for Mouse Interactions.<br>
Each method takes a callback function which will be executed each time that interaction takes place.</p>
                    <pre><code>  
        var c = new JS3Circle();
        c.click = function(){ trace('I was clicked!'); };
        c.dragStart = function(){ trace('I am starting to be dragged!'); };
        c.drag = function(){ trace('I am being dragged!'); };
        c.dragComplete = function(){ trace('I am done being dragged!'); };        
                    </code></pre>
                <p>The callbacks receive the Object they are associated with so you can do things like :</p>
                    <pre><code>  
        var c = new JS3Circle();
        c.name = 'my-circle';
        c.click = onCircleClick;
        
        function onCircleClick(o)
        {
            trace(o.name); // traces 'my-circle';
        }     
                    </code></pre>
                    <p><strong>Quick Tip :</strong> Adding a Drag Function to an Object automatically sets its <u>draggable</u> property to <u>true</u>.<br>However you can always disable dragging by setting <u>draggable</u> or <u>enabled</u> to <u>false</u> without the need to remove the callback.</p>
            </div><hr>
        <?php include ('../local/footer.php'); ?>
        <script type="text/javascript" src="./mouse-events.js"></script>            
	    <script type="text/javascript" src="http://yandex.st/highlightjs/6.1/highlight.min.js"></script>
        <script>hljs.initHighlightingOnLoad();</script>
    </body>
</html>