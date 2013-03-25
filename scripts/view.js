var View = function(model){

	var _this = this;

	this.model = model;
	this.functionInputs = [];
	this.COLORS = ['#f00', '#0f0', '#00f', '#ff0', '#f0f', '#0ff'];

	this.rExp = /(\+|\-).*/;
	this.rBase = /^[^e]*/;

	// Param buttons
	$('#radioParam').buttonset()
	.click( function(evt) {
		_this.updateSlider(
			$('#radioParam label[aria-pressed=true]').text());
	})
	.find('label')
	.css({
		'width' : '33.3%',
		'box-sizing': 'border-box'
	});

	// Param slider
	this.updateSlider('a');

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
	$(window).resize( function(){ _this.redraw(); });
	this.redraw();
};

View.prototype.updateSlider = function(param) {
	var _this = this;
	var paramObject = this.model.parameters[param];
	var refreshSlider = function(){
		_this.model.parameters[param].val = $('#sliderParam').slider('value');
		console.log(param, '-->', _this.model.parameters[param].val);
		_this.redraw();
	}
	console.log('Update slider for', param, '; paramObject:', paramObject);
	$('#sliderParam').slider({
		slide  : refreshSlider,
		change : refreshSlider,
		min    : paramObject.min,
		max    : paramObject.max,
		value  : paramObject.val,
		step   : (paramObject.max - paramObject.min) / 100
	});
};

View.prototype.redraw = function() {
	var _this = this;

	this.canvas.width = document.width;
	this.canvas.height = document.height;
	var ctx = this.canvas.getContext('2d');
	ctx.fillStyle = '#000';
	ctx.fillRect(0, 0, document.width, document.height)

	// Draw Coordinate System
	var round = function(value){
		// Round base to 1, 2 or 5
		var expString = value.toExponential();
		var base      = parseFloat(expString.match(_this.rBase)[0]);
		var exponent  = parseInt(expString.match(_this.rExp)[0]);
		var newBase;

		if (base < 1.5)      newBase = 1;
		else if (base < 2.5) newBase = 2;
		else if (base < 7.5) newBase = 5;
		else { newBase = 1; exponent++;}

		return newBase * Math.pow(10, exponent);
	}
	var unit = round(50 / this.model.zoomFactor);

	x0 = this.model.unitToPixelX(0);
	y0 = this.model.unitToPixelY(0);
	var xMin = Math.floor(this.model.pixelToUnitX(0) / unit);
	var xMax = Math.ceil(this.model.pixelToUnitX(document.width) / unit);
	var yMin = Math.floor(this.model.pixelToUnitY(document.height) / unit);
	var yMax = Math.ceil(this.model.pixelToUnitY(0) / unit);

	ctx.strokeStyle = '#333';
	ctx.fillStyle = '#fff';
	ctx.font = '16px Georgia';
	ctx.beginPath();
	for (var i = xMin; i <= xMax; i += unit ) {
		var x = i * unit;
		var xP = this.model.unitToPixelX(x);
		ctx.moveTo(xP, 0);
		ctx.lineTo(xP, document.height);
		if (x != 0)
			ctx.fillText(x, xP - ctx.measureText(x).width / 2, y0 + 20);
	};
	for (var i = yMin; i <= yMax; i += unit ) {
		var y = i * unit;
		var yP = this.model.unitToPixelY(y);
		ctx.moveTo(0, yP);
		ctx.lineTo(document.width, yP);
		if (y != 0)
			ctx.fillText(y, x0 - ctx.measureText(y).width - 5, yP + 8);
	};
	ctx.stroke();

	ctx.strokeStyle = '#fff';
	ctx.beginPath();
	ctx.moveTo(x0, 0);
	ctx.lineTo(x0, document.height);
	ctx.moveTo(0, y0);
	ctx.lineTo(document.width, y0);
	ctx.stroke();

	// Draw Functions
	var functions = this.model.getFunctions();
	for (i = functions.length - 1; i >= 0; i--) {
		var f = functions[i];

		var x2, y;
		ctx.strokeStyle = f.color;
		ctx.beginPath();
		ctx.moveTo(0, this.model.unitToPixelY( f.calculate( this.model.pixelToUnitX( 0 ))))
		for (var x = 0; x < this.canvas.width; x++) {
			x2 = this.model.pixelToUnitX( x );
			y = this.model.unitToPixelY( f.calculate( x2 ) );
			ctx.lineTo(x, y)
		};
		ctx.stroke();
	};
};