$(document).ready(function() {
	var stage = new JS3('mouse-1');
		stage.interactive = true;
	stage.click = function(o) 
	{
		alert(o.name + ' was clicked');
	}
	var c = new JS3Circle({x:25, y:25, size:50});
	c.name = 'my-circle';
	c.enabled = true;
	stage.addChild(c);
});