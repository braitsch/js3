
var size = (canvas.width-20) / 75;
var circs = [];

function init()
{
	canvas.drawClean = false;
	canvas.background = '#777';
	draw();
}

function draw()
{
	var c = Math.round((canvas.width - 20) / (size));
	var r = Math.round((canvas.height - 20) / (size));
	for (var i = (c * r) - 1; i >= 0; i--){
		var o = {};
			o.size = size;
			o.fillColor = '#555';			
			o.strokeWidth = 4;
			o.strokeColor = '#777';		
			o.x = (size/2 + 10) + (size * (i%c));
			o.y = (size/2 + 12) + (size * Math.floor(i/c))
		circs.push(o);
		canvas.drawCircle(o);
	};
	canvas.run(toggle);	
}

function toggle()
{
	for (var i = 20; i >= 0; i--){
	var o = circs[Math.floor(Math.random() * circs.length)];	
	if (o.fillColor == '#555' || o.fillColor == '#E8A840'){
		o.fillColor = '#333';
	}	else {
		o.fillColor = '#E8A840';		
	}
	canvas.drawCircle(o);	
	};
}

init();