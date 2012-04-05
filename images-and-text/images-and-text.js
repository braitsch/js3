$(document).ready(function() {
    drawImage();
});

function drawImage()
{
	var stage = new JS3('img-1');
	var img = new JS3Image({src:'nyancat.png'});
	img.x = 25;
	img.y = 25;
	stage.addChild(img);
	
	var stage = new JS3('img-2');	
	var img = new JS3Image( {x:25, y:25} );
	img.src = 'nyancat.png';
	img.rotation = 90;
	stage.addChild(img);
	
	var x = 50; var y = 35;
	var stage = new JS3('img-3');	
    var text = new JS3Text( {text:'Hello World!'} );
    text.x = x; 
	text.y = y;
    stage.addChild(text);
    var text = new JS3Text( {text:'Hello World!'} );
    text.x = x; 
	text.y = y;
	text.rotation = 45;	
    stage.addChild(text);
}
