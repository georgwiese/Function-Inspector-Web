var MathFunction = function(color){
	this.function = null;
	this.string = "";
	this.color = color;

	// Functions and their translation
	this.functionsArray = ['sqrt', 'sin', 'cos', 'tan', 'abs',
							'ln', 'log', 'asin', 'acos', 'atan'];
	for (f in this.functions)
		this.functionsArray.push(f);

	this.functionsString = this.functionsArray.join('|');

	// Regular expressions
	this.rValidFunctionString =
		new RegExp('(((\\d+((\\.|,)\\d+)?)|x|a|b|c|' + this.functionsString + ')' + 
			'(\\+|\-|\\*|\\/|\\^|\\(|\\))?)+');
	console.log('rValidFunctionString', this.rValidFunctionString.toString());
	this.rWhiteSpace = /\s+/;
	this.rFunction = new RegExp(this.functionsString, 'g');
};

(function declareFunctions(){

	// Constants
	var pi    = Math.PI;
	var e     = Math.E;
	// Functions
	var sqrt  = Math.sqrt;
	var sin   = Math.sin;
	var cos   = Math.cos;
	var tan   = Math.tan;
	var abs   = Math.abs;
	var ln    = Math.log;
	var log   = function(x){return Math.log(x) * Math.LOG10E};
	var asin  = Math.asin;
	var acos  = Math.acos;
	var atan  = Math.atan;
	//var sinh
	//var cosh
	//var tanh
	//var asinh
	//var acosh
	//var atanh

	MathFunction.prototype.setValue = function(str) {
		this.string = this.prepareString(str);
		if (this.checkString(this.string))
			eval("this.function = function(x, a, b, c){ return " + this.string + ";}");
		else
			this.function = null;
	};
})()

MathFunction.prototype.checkString = function(string) {
	// return whether this is a valid function string
	console.log('Test:', string, 'Result:', this.rValidFunctionString.test(string));
	return this.rValidFunctionString.test(string);
};

MathFunction.prototype.prepareString = function(string) {
	return string.replace(this.rWhiteSpace, '').toLowerCase();
};

MathFunction.prototype.calculate = function() {
	return this.function.apply(this, arguments);
};

MathFunction.prototype.hasValue = function() {
	return this.function != null;
};