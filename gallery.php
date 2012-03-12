<?php
    include ('./php/header.php');
?>
        <canvas id="cnvs" style='position:absolute; top:40px; display:none'></canvas>
        <script type="text/javascript" src="./vendor/jquery-1.7.1.min.js"></script>
        <script type="text/javascript" src="./vendor/bootstrap-dropdown.js"></script>        
    	<script src="./src/JS3.js"></script>         
    	<script src="./local/gallery.js"></script>
    	<script src=<?php echo './gallery/'.$_GET['v'].'.js'?>></script>    	
    </body>
</html>