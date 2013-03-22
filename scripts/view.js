var View = function(model){

	var _this = this;

	this.model = model;
	this.functionInputs = [];
	this.COLORS = ['#f00', '#0f0', '#00f', '#ff0', '#f0f', '#0ff'];

	// Param buttons
	$('#radioParam').buttonset()
	.find('label')
	.css({
		'width' : '33.3%',
		'box-sizing': 'border-box'
	});

	// Param slider
	$('#sliderParam').slider();

	// Function inputs
	var functionsMenu = $('#functionsMenu')
	for (var i = 0; i < 3; i++) {
		var input = new FunctionInput(functionsMenu, i,
			function(index, val){
				_this.model.setFunction(index, val);
				_this.redraw();
			});
		this.model.addFunction(this.COLORS[i % this.COLORS.length]);
		this.functionInputs.push(input);
	};

	// Canvas
	this.canvas = $('#canvas')[0];
	$(window).resize( this.redraw );
	this.redraw();
};

View.prototype.redraw = function() {
	this.canvas.width = document.width;
	this.canvas.height = document.height;
	var ctx = this.canvas.getContext('2d');
	ctx.fillStyle = '#000';
	ctx.fillRect(0, 0, document.width, document.height)

	var functions = this.model.getFunctions();
	for (var i = functions.length - 1; i >= 0; i--) {
		var f = functions[i];

		var x2, y;
		ctx.strokeStyle = f.color;
		ctx.beginPath();
		ctx.moveTo(0, this.model.unitToPixel({ x: 0, y : f.calculate(this.model.pixelToUnit({ x : 0, y : 0}).x)}).y)
		for (var x = 0; x < this.canvas.width; x++) {
			//y = this.model.unitToPixel({ x: 0, y : f.calculate(this.model.pixelToUnit({ x : x, y : 0}).x)}).y;
			x2 = this.model.pixelToUnit({ x : x, y : 0}).x;
			y = this.model.unitToPixel({ x: 0, y : f.calculate(x2)}).y;
			ctx.lineTo(x, y)
		};
		ctx.stroke();
	};
};