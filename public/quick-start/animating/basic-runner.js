
var stage;
function init()
{
	stage = new JS3('my-canvas');
	stage.background = '#CCC';
// call addSnowFlake every 10th of a second	
	stage.run(addSnowFlake, .1);
// call moveSnowFlakes on every frame	
	stage.run(moveSnowFlakes);	
}

function addSnowFlake()
{
// give each snowflake a random x position
	var x = JS3.getRandomValue(0, stage.width);
// and a random diameter between 1 & 6 pixels	
	var size = JS3.getRandomValue(1, 6);
// draw the circle	
	var c = new JS3Circle({fillColor:'white', stroke:false, x:x, size:size});
// add some custom properites to our snowflake		
// a random speed to fall at..
	c.speed = JS3.getRandomValue(.2, .8);
// and a drift value to move the flake back and forth;	
	c.drift = .05;
	stage.addChild(c);
}

function moveSnowFlakes()
{
	// loop over all snowflakes currently on the stage
	for (var i = stage.numChildren - 1; i >= 0; i--){
		var c = stage.getChildAt(i);
		if (c.y < stage.height + c.size){
	// increase y position by this flake's speed		
			c.y += c.speed;
	// move back and forth on a simple sine wave
			c.x += Math.sin(c.drift); c.drift+=.05;
		}	else{
	// clean up after ourselves to save resources //	
			stage.removeChildAt(i);
		}
	}
}

window.onload = init;		