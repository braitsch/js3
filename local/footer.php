<div id='footer'><i>Hand-Crafted with Love by <a href='http://twitter.com/braitsch'>@braitsch</a> in San Francisco, California</i></div>
</div><!-- close content div -->
<script type="text/javascript" src=<?php linkto('/vendor/jquery-1.7.1.min.js')?>></script>
<script type="text/javascript" src=<?php linkto('/vendor/bootstrap-dropdown.js')?>></script>
<script type="text/javascript" src=<?php linkto('/src/JS3.js')?>></script>
<script type="text/javascript">
$(document).ready(function() {    
    $(".anchor a").click(function() {
        var a = $(this).attr("href");
	    a = a.substr(a.indexOf('#'));
        $(window).scrollTop($(a).offset().top - 50);
	    return false;
	    });
    $("#btn-download").click(function()  {
        window.location.href = "https://raw.github.com/braitsch/js3/master/src/JS3-"+'<?php echo $version;?>'+".js";
    });
// move to anchor offset if coming from another page //    
    var a = window.location.href.substr(window.location.href.lastIndexOf('#'));
    if (a) setTimeout(function(){ $(window).scrollTop($(a).offset().top - 50); }, 100);
});
</script>