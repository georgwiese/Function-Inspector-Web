var Model = function(){
	this.x = 0;
	this.y = 0;
	this.zoomFactor = 50;		// 1 => 1 unit is 1 pixels
	this.middle = {
		x : 0,
		y : 0
	};
};

Model.prototype.pixelToUnit = function(point){
	// Point2D((px-width/2)/30/zoom[0]+middle[0], (height/2-py)/30/zoom[1]+middle[1]);
	return {
		x : (point.x - canvas.width / 2) / this.zoomFactor + this.middle.x,
		y : (point.y - canvas.height / 2) / this.zoomFactor + this.middle.y
	}
};

Model.prototype.unitToPixel = function(point){
	// Point2D(Math.round((ux-middle[0])*30*zoom[0]+width/2), Math.round((middle[1] - uy)*30*zoom[1] + height/2));
	return {
		x : (point.x - this.middle.x) * this.zoomFactor + canvas.width / 2,
		y : (point.y - this.middle.y) * this.zoomFactor + canvas.height / 2
	}
};