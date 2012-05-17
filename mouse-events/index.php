<?php
include ('../local/header.php'); 
?>
<div id='content'>
    <div id="header">
    <h1>Mouse Events</h1>
    <p>All JS3Objects can easily be told to listen for Mouse Events</p><hr>
    </div>

    <h2>Enabling Mouse Events</h2>
    <p>To optimize performance, Mouse Events are ignored by default. To tell the Stage to listen for Mouse Events set the Stage's <u>interactive</u> property to <u>true</u>.</p>
    <pre><code class='javascript'>  
    var stage = new JS3('my-canvas');
    stage.interactive = true;
    </code></pre>
    <p>All JS3Objects have two basic properties that control their interactivity.</p>
    <pre><code class='javascript'>  
    var c = new JS3Circle();
        c.enabled   = false;    // default
        c.draggable = false;    // default
    </code></pre>
    <p>To make any Object draggable, set its <u>draggable</u> property to <u>true</u>, likewise to tell any Object to ignore Mouse Events, set its <u>enabled</u> property to <u>false</u>.</p>
    <hr>

    <h2>Listening For Events</h2>
    <p>All JS3Objects have the following handlers that listen for Mouse Interactions.<br>
    Each handler can be set to a callback function which will be executed whenever that interaction takes place.</p>
    <pre><code class='javascript'>  
    var c = new JS3Circle();
        c.down       	= function(){ trace('The Mouse was pressed!'); };
        c.up       	    = function(){ trace('The Mouse was released!'); };
        c.over      	= function(){ trace('I was moused over!'); };
        c.out       	= function(){ trace('I was moused out!'); };	
        c.click         = function(){ trace('I was clicked!'); };
        c.dclick        = function(){ trace('I was doubled clicked!'); };	        			
        c.dragStart     = function(){ trace('I am starting to be dragged!'); };
        c.dragChange    = function(){ trace('I am being dragged!'); };
        c.dragComplete  = function(){ trace('I am done being dragged!'); };        
    </code></pre>
    <p>The callbacks receive a <a class='anchor' href='#event-object'>JS3EventObject</a> that describes the type of event and to whom and where it took place.</p>
    <pre><code class='javascript'>  
    var c = new JS3Circle();
        c.name = 'my-circle';
        c.click = onCircleClick;
    function onCircleClick(e)
    {
        trace(e.target.name); // traces 'my-circle';
    }
    </code></pre>
    <p><strong>Quick Tip :</strong> Assigning a callback to any drag handler automatically sets that Object's <u>draggable</u> property to <u>true</u>.<br>However you can always disable dragging by setting <u>draggable</u> or <u>enabled</u> to <u>false</u> without the need to remove the callback.</p>
    <hr>

    <h2>Stage Events</h2>
    <p>You can also bind the following callbacks directly to the Stage.</p>
    <pre><code class='javascript'>
    var stage = new JS3('my-canvas');      
        stage.down     = function(){ trace('The Mouse was pressed'); };
        stage.up       = function(){ trace('The Mouse was released'); };        
        stage.move     = function(){ trace('The Mouse moved'); };
        stage.click    = function(){ trace('The Stage was clicked'); };
        stage.dclick   = function(){ trace('The Stage was doubled clicked'); };
        stage.enter    = function(){ trace('The Mouse entered the Stage'); };
        stage.leave    = function(){ trace('The Mouse left the Stage'); };    
        stage.focusIn  = function(){ trace('The Window gained focus'); };
        stage.focusOut = function(){ trace('The Window lost focus'); };                  
    </code></pre>
    <p>The following example shows how to listen for Mouse clicks on the Stage.<br>
    If we set the <u>enabled</u> property of the Circle to <u>true</u>, we can capture that target even though the callback is bound to the Stage.</p>
    <pre><code class='javascript'>
    var stage = new JS3('my-canvas'); 
    var c = new JS3Circle( { x:25, y:25, size:50 });
        c.name = 'my-circle';
        c.enabled = true;            
    stage.addChild(c);
    stage.click = function(e) 
    {
        alert(e.target.name + 'was clicked');
    }    
    </code></pre>
    <p>Click around in the Canvas below.</p>
    <canvas id="mouse-1" width='898' height='100'></canvas><hr>

    <h2 id='event-object'>The JS3 Event Object</h2>
    <p>Callbacks bound to handlers receive a <u>JS3EventObject</u> with the following properties</p>
    <pre><code class='javascript'>
    event.x         : Number        // global mouse X position where the event occurred
    event.y         : Number        // global mouse Y position where the event occurred
    event.type      : String        // the type of event that occurred
    event.owner     : JS3Object     // the JS3Object to which the callback was bound
    event.target    : JS3Object     // the JS3Object that actually received the event
    </code></pre><hr>

    <h2>Disabling Mouse Events</h2>
    <p>You can easily enable / disable MouseEvent listeners by toggling the following properties on any JS3Object :</p>
    <pre><code class='javascript'>
    var c = new JS3Circle();
    c.enabled       : Boolean       // set to false to ignore click, dclick, over & out 
    c.draggable     : Boolean       // set to false to ignore dragStart, dragChange & dragComplete
    </code></pre>
    <p>Furthermore, you can at any time disable <u>all</u> MouseEvent Listeners by simply setting the <u>stage.interactive</u> property to false.</p>
    <pre><code class='javascript'>
    var stage = new JS3Circle();
    stage.interactive = false;
    </code></pre>
    <hr>

    <p class='next-page'><b>Awesome, you're ready for the next section. Click here to <a href=<?php linkto('/api');?>>review the full JS3 API.</a></b></p><hr>                

<?php include ('../local/footer.php'); ?>
<script type="text/javascript" src="./mouse-events.js"></script>            
<script type="text/javascript" src="http://yandex.st/highlightjs/6.1/highlight.min.js"></script>
<script>hljs.initHighlightingOnLoad();</script>
</body>
</html>