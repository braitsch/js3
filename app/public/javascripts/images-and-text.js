$(document).ready(function() {
    drawImage();
});

function drawImage()
{
	var stage = new JS3('img-1');
	var img = new JS3Image({src:'/img/nyancat.png'});
	img.x = 25;
	img.y = 30;
	stage.addChild(img);
	
	var stage = new JS3('img-2');
	var img = new JS3Image( {x:25, y:30} );
	img.src = '/img/nyancat.png';
	img.rotation = 90;
	stage.addChild(img);
	
	var stage = new JS3('img-3');
    var text = new JS3Text( {text:'Hello World!', bold:true, color:'green', size:20} );
	text.x = 50;
	text.y = 35;
    stage.addChild(text);

	var stage = new JS3('img-4');
	var text = new JS3Text( {text:'Hello World!', bold:true, color:'green', size:20} );
	text.x = 50;
	text.y = 35;
	stage.run(function(){ text.rotation +=1; });
	stage.addChild(text);
}
