<?php
    include ('../../local/header.php');
?>

<canvas id="cnvs" width='1440' height='737' style='position:absolute; top:40px; display:none;'></canvas><div id="datgui"></div>
<script>document.body.style.background = '#222';</script>

<script type="text/javascript" src=<?php linkto('/vendor/jquery-1.7.1.min.js')?>></script>
<script type="text/javascript" src=<?php linkto('/vendor/bootstrap-dropdown.js')?>></script>
<script type="text/javascript" src=<?php linkto('/vendor/dat.gui.min.js')?>></script>
<script type="text/javascript" src=<?php linkto('/src/JS3.js')?>></script>
<script type="text/javascript" src=<?php linkto('/gallery/gallery.js')?>></script>