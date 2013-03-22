var MathFunction = function(color){
	this.function = null;
	this.string = "";
	this.color = color;
};

MathFunction.prototype.setValue = function(str) {
	this.string = str;
	if (str !== "")
		eval("this.function = function(x, a, b, c){ return " + str + ";}");
	else
		this.function = null;
};

MathFunction.prototype.calculate = function() {
	return this.function.apply(this, arguments);
};

MathFunction.prototype.hasValue = function() {
	return this.function != null;
};