var state = {
	x : 0,
	y : 0,
	zoomFactor : 50,		// 1 => 1 unit is 1 pixels
	middle : {
		x : 0,
		y : 0
	}
};
var canvas = null;
var context = null;
var mouseTracker = {x : 0, y : 0, isDragging : false}
mouseTracker.update = function(evt){
	var result = {
		x : this.x - evt.pageX,
		y : this.y - evt.pageY  }
	this.x = evt.pageX; this.y = evt.pageY;
	return result;
}
mouseTracker.setDragging = function(isDragging, evt){
	this.isDragging = isDragging;
	if (typeof evt !== 'undefined')
		this.update(evt);
}

function toggleMenuActive(event){
	var element = $(event.currentTarget).parent().parent();
	if (element.hasClass("menuActive"))
		element.removeClass("menuActive");
	else
		element.addClass("menuActive");
}

function pixelToUnit(point){
	// Point2D((px-width/2)/30/zoom[0]+middle[0], (height/2-py)/30/zoom[1]+middle[1]);
	return {
		x : (point.x - canvas.width / 2) / state.zoomFactor + state.middle.x,
		y : (point.y - canvas.height / 2) / state.zoomFactor + state.middle.y
	}
}

function unitToPixel(point){
	// Point2D(Math.round((ux-middle[0])*30*zoom[0]+width/2), Math.round((middle[1] - uy)*30*zoom[1] + height/2));
	return {
		x : (point.x - state.middle.x) * state.zoomFactor + canvas.width / 2,
		y : (point.y - state.middle.y) * state.zoomFactor + canvas.height / 2
	}
}

function redraw(){
	canvas.width = document.width;
	canvas.height = document.height;
	ctx.fillStyle = "#000";
	ctx.fillRect(0, 0, document.width, document.height)

	ctx.fillStyle = "#f00";
	ctx.beginPath();
	var middlePixel = unitToPixel(state.middle);
	ctx.arc(middlePixel.x, middlePixel.y, 10, 0, 2*Math.PI);
	middlePixel = unitToPixel({ x : 0, y : 0 });
	ctx.arc(middlePixel.x, middlePixel.y, 10, 0, 2*Math.PI);
	ctx.fill();

	var f = "sin(x^2)"
	ctx.strokeStyle = "#0f0";
	ctx.beginPath()
	ctx.moveTo(0, unitToPixel({ x: 0, y : calculate(f, pixelToUnit({ x : 0, y : 0}).x)}).y)
	for (var x = 0; x < canvas.width; x++) {
		var y = unitToPixel({ x: 0, y : calculate(f, pixelToUnit({ x : x, y : 0}).x)}).y;
		console.log(x, y, pixelToUnit({ x : x, y : 0}).x, (x - canvas.width / 2) / state.zoomFactor, calculate(f, pixelToUnit({ x : x, y : 0}).x));
		ctx.lineTo(x, y)
	};
	ctx.stroke();

	var f = "x^2*sin(x)"
	ctx.strokeStyle = "#00f";
	ctx.beginPath()
	ctx.moveTo(0, unitToPixel({ x: 0, y : calculate(f, pixelToUnit({ x : 0, y : 0}).x)}).y)
	for (var x = 0; x < canvas.width; x++) {
		var y = unitToPixel({ x: 0, y : calculate(f, pixelToUnit({ x : x, y : 0}).x)}).y;
		console.log(x, y, pixelToUnit({ x : x, y : 0}).x, (x - canvas.width / 2) / state.zoomFactor, calculate(f, pixelToUnit({ x : x, y : 0}).x));
		ctx.lineTo(x, y)
	};
	ctx.stroke();
}

window.onload = function(){
	// ************* UI ELEMENTS
	$('#mainNav .menuButton').on("click", toggleMenuActive);
	// Mouse
	$(window).mousedown( function(evt){
		mouseTracker.setDragging(true, evt);
	})
	$(window).mouseup( function(){ mouseTracker.setDragging(false) })
	$(window).mousemove( function(evt){
		console.log(mouseTracker.isDragging);
		var diff = mouseTracker.update(evt);
		if(mouseTracker.isDragging){
			state.middle.x += diff.x / state.zoomFactor;
			state.middle.y += diff.y / state.zoomFactor;
			redraw();
		}
	})

	// ************* CANVAS
	canvas = $('#canvas')[0];
	ctx = canvas.getContext('2d');
	$(window).resize( redraw );
	redraw();
	console.log(ctx);
}