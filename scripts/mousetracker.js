/*
var MouseTracker = function() {
	this.x = 0;
	this.y = 0;
	this.isDragging = false;
};

MouseTracker.pototype.update = function(evt){
	var result = {
		x : this.x - evt.pageX,
		y : this.y - evt.pageY  }
	this.x = evt.pageX; this.y = evt.pageY;
	return result;
};

MouseTracker.pototype.setDragging = function(isDragging, evt){
	this.isDragging = isDragging;
	if (typeof evt !== 'undefined')
		this.update(evt);
};*/