<?php 
$version='0.2.5'; $dl='https://raw.github.com/braitsch/js3/master/src/JS3-'.$version.'-min.js';
$root = $_SERVER["REMOTE_ADDR"] == '127.0.0.1' ? 'http://localhost:8888' :  'http://js3.quietless.com';
function linkto($n){ global $root; echo $root.$n;}
?>
<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="utf-8">
        <title>JS3 is a fast and lightweight drawing and animation library for the HTML5 JavaScript Canvas</title>
        <meta name="description" content="A fast and lightweight drawing and animation library for the HTML5 JavaScript Canvas">
        <meta name="author" content="Stephen Braitsch">    
        <link href=<?php linkto('/vendor/bootstrap.min.css')?> rel="stylesheet">
        <link href="http://yandex.st/highlightjs/6.1/styles/github.min.css" rel="stylesheet" > 
        <link href=<?php linkto('/css/styles.css')?> rel="stylesheet">        
        <link rel="shortcut icon" href="images/favicon.ico">
    <script type="text/javascript">
      var _gaq = _gaq || [];
      _gaq.push(['_setAccount', 'UA-1890531-7']);
      _gaq.push(['_trackPageview']);
      (function() {
        var ga = document.createElement('script'); ga.type = 'text/javascript'; ga.async = true;
        ga.src = ('https:' == document.location.protocol ? 'https://ssl' : 'http://www') + '.google-analytics.com/ga.js';
        var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(ga, s);
      })();
    </script>
    </head>
    <body>
        <div class="navbar navbar-fixed-top">
            <div class="navbar-inner">
                <div class="container" style="width: auto;">               
                    <ul id='global-nav' class="nav pull-left">
                        <li class="divider-vertical"></li>
                        <li><a href=<?php linkto('/')?>>JS3</a></li>
                        <li class="divider-vertical"></li>
                        <li><a href=<?php linkto('/getting-started')?>>Getting Started</a></li>                        
                        <li class="divider-vertical"></li>
                        <li><a href=<?php linkto('/drawing')?>>Drawing Shapes</a></li>
                        <li class="divider-vertical"></li>
                        <li><a href=<?php linkto('/images-and-text')?>>Images & Text</a></li>
                        <li class="divider-vertical"></li>
                        <li><a href=<?php linkto('/tweening')?>>Tweening</a></li>
                        <li class="divider-vertical"></li>
                        <li><a href=<?php linkto('/mouse-events')?>>Mouse Events</a></li>
                        <li class="divider-vertical"></li>
                        <li><a href=<?php linkto('/api')?>>API</a></li>
                        <li class="divider-vertical"></li>
                        <li class="dropdown">
                        <a href="#" class="dropdown-toggle" data-toggle="dropdown">Gallery<b class="caret"></b></a>
                            <ul class="dropdown-menu">
                                <li><a href=<?php linkto('/gallery/honeycomb')?>>HoneyComb</a></li>
                                <li><a href=<?php linkto('/gallery/rings')?>>Rings</a></li>
                                <li><a href=<?php linkto('/gallery/lite-brite')?>>LiteBrite</a></li>
                                <li><a href=<?php linkto('/gallery/tube-worms')?>>TubeWorms</a></li>                            
                                <li class="divider"></li>                               
                                <li><a href=<?php linkto('/gallery/joints')?>>Joints</a></li>
                                <li><a href=<?php linkto('/gallery/spiders')?>>Spiders</a></li>
                                <li><a href=<?php linkto('/gallery/confetti')?>>Confetti</a></li>                            
                                <li><a href=<?php linkto('/gallery/snowflakes')?>>SnowFlakes</a></li>                                                                                                                                                                                                               
                            </ul>
                        </li>                        
                        <li class="divider-vertical"></li>               
                    </ul><!-- download-group -->
                    <div class="btn-group" style='float:right;right:10px;top:1px;'>
                        <button class="btn btn-success dropdown-toggle" style='width:161px;' data-toggle="dropdown"><i class="icon-download icon-white"></i>Download <?php echo 'v'.$version;?></button>
                        <ul class="dropdown-menu">
                            <li><a href=<?php echo 'https://raw.github.com/braitsch/js3/master/src/JS3-'.$version.'-min.js';?>>Minified</a></li>
                            <li><a href=<?php echo 'https://raw.github.com/braitsch/js3/master/src/JS3-'.$version.'.js';?>>Uncompressed</a></li>
                            <li class="divider"></li>
                            <li><a href=<?php echo $root . '/quick-start.zip'?>>Quick Start</a></li>                            
                        </ul>
                    </div><!-- download-group -->
                </div><!-- container -->               
            </div><!-- navbar-inner -->          
            
        </div><!-- navbar -->
        
<a href="http://github.com/braitsch/js3"><img style="position:absolute;top:41px;right:0;border:0;" src="https://a248.e.akamai.net/camo.github.com/7afbc8b248c68eb468279e8c17986ad46549fb71/687474703a2f2f73332e616d617a6f6e6177732e636f6d2f6769746875622f726962626f6e732f666f726b6d655f72696768745f6461726b626c75655f3132313632312e706e67" alt="Fork me on GitHub"></a>
            