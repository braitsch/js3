<?php
    include ('../../local/header.php');
?>

<canvas id="cnvs" style='position:absolute; top:40px; display:none'></canvas><div id="datgui"></div>
<script>document.body.style.background = '#222';</script>

<script type="text/javascript" src=<?php linkto('/vendor/jquery-1.7.1.min.js')?>></script>
<script type="text/javascript" src=<?php linkto('/vendor/bootstrap-dropdown.js')?>></script>
<script type="text/javascript" src=<?php linkto('/vendor/dat.gui.min.js')?>></script>
<script type="text/javascript" src=<?php linkto('/src/JS3.js')?>></script>
<script type="text/javascript" src=<?php linkto('/gallery/gallery.js')?>></script>

<script type="text/javascript">
$(document).ready(function() {    
    $("#btn-download").click(function()  {
        window.location.href = "https://raw.github.com/braitsch/js3/master/src/JS3-"+'<?php echo $version;?>'+".js";
    });
});
</script>