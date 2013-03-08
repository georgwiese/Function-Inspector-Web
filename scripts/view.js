var View = function(model){

	this.model = model;

	this.canvas = $('#canvas')[0];
	$(window).resize( this.redraw );
	this.redraw();

};

View.prototype.redraw = function() {
	//return;
	this.canvas.width = document.width;
	this.canvas.height = document.height;
	var ctx = this.canvas.getContext('2d');
	ctx.fillStyle = "#000";
	ctx.fillRect(0, 0, document.width, document.height)

	ctx.fillStyle = "#f00";
	ctx.beginPath();
	var middlePixel = this.model.unitToPixel(model.middle);
	//ctx.arc(middlePixel.x, middlePixel.y, 10, 0, 2*Math.PI);
	middlePixel = this.model.unitToPixel({ x : 0, y : 0 });
	//ctx.arc(middlePixel.x, middlePixel.y, 10, 0, 2*Math.PI);
	ctx.fill();

	var f = "sin(x^2)";
	var x2, y;
	ctx.strokeStyle = "#0f0";
	ctx.beginPath();
	ctx.moveTo(0, this.model.unitToPixel({ x: 0, y : calculate(f, this.model.pixelToUnit({ x : 0, y : 0}).x)}).y)
	for (var x = 0; x < this.canvas.width; x++) {
		//y = this.model.unitToPixel({ x: 0, y : calculate(f, this.model.pixelToUnit({ x : x, y : 0}).x)}).y;
		x2 = this.model.pixelToUnit({ x : x, y : 0}).x;
		y = this.model.unitToPixel({ x: 0, y : Math.sin(x2*x2)}).y;
		//console.log(x, y, this.model.pixelToUnit({ x : x, y : 0}).x, (x - this.canvas.width / 2) / model.zoomFactor, calculate(f, this.model.pixelToUnit({ x : x, y : 0}).x));
		ctx.lineTo(x, y)
	};
	ctx.stroke();

	var f = "x^2*sin(x)"
	ctx.strokeStyle = "#00f";
	ctx.beginPath()
	ctx.moveTo(0, this.model.unitToPixel({ x: 0, y : calculate(f, this.model.pixelToUnit({ x : 0, y : 0}).x)}).y)
	for (var x = 0; x < this.canvas.width; x++) {
		//y = this.model.unitToPixel({ x: 0, y : calculate(f, this.model.pixelToUnit({ x : x, y : 0}).x)}).y;
		x2 = this.model.pixelToUnit({ x : x, y : 0}).x;
		y = this.model.unitToPixel({ x: 0, y : x2*x2*Math.sin(x2)}).y;
		//console.log(x, y, this.model.pixelToUnit({ x : x, y : 0}).x, (x - this.canvas.width / 2) / model.zoomFactor, calculate(f, this.model.pixelToUnit({ x : x, y : 0}).x));
		ctx.lineTo(x, y)
	};
	ctx.stroke();
};