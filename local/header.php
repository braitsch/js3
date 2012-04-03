<?php function linkto($n){ echo 'http://localhost:8888'.$n;} ?>
<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="utf-8">
        <title>JS3 - A lightweight port of the AS3 TweenLite library for the JavaScript Canvas</title>
        <meta name="description" content="A lightweight port of the AS3 TweenLite library for the JavaScript Canvas">
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
                    <ul class="nav pull-left">
                        <li class="divider-vertical"></li>
                        <li><a href=<?php linkto('')?>>JS3</a></li>
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
                    </ul>               
                </div><!-- container -->
            </div><!-- navbar-inner -->
        <button class="btn btn-success" id='btn-download'><i class="icon-download icon-white"></i>Download</button>
        </div><!-- navbar -->