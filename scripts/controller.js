var model = null;
var view  = null;
//var mouseTracker = null;

var mouseTracker = {
	x : 0,
	y : 0,
	isDragging : false
};

mouseTracker.update = function(evt){
	var result = {
		x : this.x - evt.pageX,
		y : this.y - evt.pageY  }
	this.x = evt.pageX; this.y = evt.pageY;
	return result;
};

mouseTracker.setDragging = function(isDragging, evt){
	this.isDragging = isDragging;
	if (typeof evt !== 'undefined')
		this.update(evt);
};

function toggleMenuActive(event){
	var element = $(event.currentTarget).parent().parent();
	if (element.hasClass("menuActive"))
		element.removeClass("menuActive");
	else
		element.addClass("menuActive");
}

window.onload = function(){
	model = new Model();
	view = new View(model);
	//mouseTracker = new MouseTracker();

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
			model.middle.x += diff.x / model.zoomFactor;
			model.middle.y += diff.y / model.zoomFactor;
			view.redraw();
		}
	})
}