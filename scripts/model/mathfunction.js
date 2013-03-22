var MathFunction = function(color){
	this.function = null;
	this.string = "";
	this.color = color;

	// Functions and their translation
	this.functions = {
		sin : "Math.sin",
		cos : "Math.cos",
		tan : "Math.tan"
	};

	this.functionsArray = [];
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

MathFunction.prototype.setValue = function(str) {
	this.string = str.replace(this.rWhiteSpace, '');
	if (this.checkString(str))
		eval("this.function = function(x, a, b, c){ return " + this.prepareString(str) + ";}");
	else
		this.function = null;
};

MathFunction.prototype.checkString = function(string) {
	// return whether this is a valid function string
	console.log('Test:', string, 'Result:', this.rValidFunctionString.test(string));
	return this.rValidFunctionString.test(string);
};

MathFunction.prototype.prepareString = function(string) {
	// Replace functions
	var _this = this;
	var res = string.replace(this.rFunction, function(f){
		console.log('Replacing:', f, 'with:', _this.functions[f]);
		return _this.functions[f];
	})
	console.log('After preparation:', res);
	return res;
};

MathFunction.prototype.calculate = function() {
	return this.function.apply(this, arguments);
};

MathFunction.prototype.hasValue = function() {
	return this.function != null;
};