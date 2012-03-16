<?php
    include ('./php/header.php');
?>
        <canvas id="cnvs" style='position:absolute; top:40px; display:none'></canvas><div id="datgui"></div>
        <script>document.body.style.background = '#222';</script> 
        <?php include ('./php/footer.php'); ?>        
        <script type="text/javascript" src="./local/gallery.js"></script>            
        <script type="text/javascript" src="./vendor/dat.gui.min.js"></script>
    	<script src=<?php echo './gallery/'. (empty($_GET['v']) ? 'honeycomb' : $_GET['v']) . '.js' ?>></script>        
    </body>
</html>