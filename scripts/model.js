var Model = function(){
	this.x = 0;
	this.y = 0;
	this.zoomFactor = 50;		// 1 => 1 unit is 1 pixels
	this.middle = {
		x : 0,
		y : 0
	};
	this.functions = []

	this.ZOOM_FACTOR = 1.1;
};

Model.prototype.changed = function() {
	if (typeof this.changedCallback === 'function')
		this.changedCallback();
};

Model.prototype.addFunction = function(color){
	this.functions.push(new MathFunction(color));
}

Model.prototype.setFunction = function(index, value){
	this.functions[index].setValue(value);
}

Model.prototype.getFunctions = function() {
	var res = [];
	for (var i = this.functions.length - 1; i >= 0; i--) {
		if (this.functions[i].hasValue())
			res.push(this.functions[i]);
	};
	return res;
};

Model.prototype.zoomIn = function() {
	this.zoomFactor *= this.ZOOM_FACTOR;
	this.changed();
};

Model.prototype.zoomOut = function() {
	this.zoomFactor /= this.ZOOM_FACTOR;
	this.changed();
};

Model.prototype.pixelToUnit = function(point){
	// Point2D((px-width/2)/30/zoom[0]+middle[0], (height/2-py)/30/zoom[1]+middle[1]);
	return {
		x : (point.x - canvas.width / 2) / this.zoomFactor + this.middle.x,
		y : -(point.y - canvas.height / 2) / this.zoomFactor + this.middle.y
	}
};

Model.prototype.unitToPixel = function(point){
	// Point2D(Math.round((ux-middle[0])*30*zoom[0]+width/2), Math.round((middle[1] - uy)*30*zoom[1] + height/2));
	return {
		x : (point.x - this.middle.x) * this.zoomFactor + canvas.width / 2,
		y : -(point.y - this.middle.y) * this.zoomFactor + canvas.height / 2
	}
};

// Some helper Methods
Model.prototype.pixelToUnitX = function(x) { return this.pixelToUnit({x:x, y:0}).x;};
Model.prototype.pixelToUnitY = function(y) { return this.pixelToUnit({x:0, y:y}).y;};
Model.prototype.unitToPixelX = function(x) { return this.unitToPixel({x:x, y:0}).x;};
Model.prototype.unitToPixelY = function(y) { return this.unitToPixel({x:0, y:y}).y;};