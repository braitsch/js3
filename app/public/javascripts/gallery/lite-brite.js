
var size;
var circs = [];
var padding = 4;

function init()
{ 	
	canvas.drawClean = false;
	canvas.background = '#777';
	size = (canvas.width - 20) / 75; draw();
}

function draw()
{
	var c = Math.round((canvas.width - 20) / (size+padding));
	var r = Math.round((canvas.height - 20) / (size+padding));
	for (var i = (c * r) - 1; i >= 0; i--){
		var o = {};
			o.size = size;
			o.stroke='none';
			o.fillColor = '#555';			
			o.strokeWidth = 4;
			o.strokeColor = '#777';
			o.x = 10 + ((size+padding) * (i%c));
			o.y = 10 + ((size+padding) * Math.floor(i/c))
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