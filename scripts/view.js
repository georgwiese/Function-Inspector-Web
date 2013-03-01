var View = function(model){

	this.model = model;

	this.canvas = $('#canvas')[0];
	this.ctx = this.canvas.getContext('2d');
	$(window).resize( this.redraw );
	this.redraw();

};

View.prototype.redraw = function() {
	this.canvas.width = document.width;
	this.canvas.height = document.height;
	this.ctx.fillStyle = "#000";
	this.ctx.fillRect(0, 0, document.width, document.height)

	this.ctx.fillStyle = "#f00";
	this.ctx.beginPath();
	var middlePixel = this.model.unitToPixel(model.middle);
	this.ctx.arc(middlePixel.x, middlePixel.y, 10, 0, 2*Math.PI);
	middlePixel = this.model.unitToPixel({ x : 0, y : 0 });
	this.ctx.arc(middlePixel.x, middlePixel.y, 10, 0, 2*Math.PI);
	this.ctx.fill();

	var f = "sin(x^2)"
	this.ctx.strokeStyle = "#0f0";
	this.ctx.beginPath()
	this.ctx.moveTo(0, this.model.unitToPixel({ x: 0, y : calculate(f, this.model.pixelToUnit({ x : 0, y : 0}).x)}).y)
	for (var x = 0; x < this.canvas.width; x++) {
		var y = this.model.unitToPixel({ x: 0, y : calculate(f, this.model.pixelToUnit({ x : x, y : 0}).x)}).y;
		//console.log(x, y, this.model.pixelToUnit({ x : x, y : 0}).x, (x - this.canvas.width / 2) / model.zoomFactor, calculate(f, this.model.pixelToUnit({ x : x, y : 0}).x));
		this.ctx.lineTo(x, y)
	};
	this.ctx.stroke();

	var f = "x^2*sin(x)"
	this.ctx.strokeStyle = "#00f";
	this.ctx.beginPath()
	this.ctx.moveTo(0, this.model.unitToPixel({ x: 0, y : calculate(f, this.model.pixelToUnit({ x : 0, y : 0}).x)}).y)
	for (var x = 0; x < this.canvas.width; x++) {
		var y = this.model.unitToPixel({ x: 0, y : calculate(f, this.model.pixelToUnit({ x : x, y : 0}).x)}).y;
		//console.log(x, y, this.model.pixelToUnit({ x : x, y : 0}).x, (x - this.canvas.width / 2) / model.zoomFactor, calculate(f, this.model.pixelToUnit({ x : x, y : 0}).x));
		this.ctx.lineTo(x, y)
	};
	this.ctx.stroke();
};