var MathFunction = function(color){
	this.function = null;
	this.string = "";
	this.color = color;

	// Functions
	this.functionsArray  = ['sqrt', 'sin', 'cos', 'tan', 'abs',
							'ln', 'log', 'asin', 'acos', 'atan'];

	// RegEx strings
	this.sFunction        = this.functionsArray.join('\\(|') + '\\(';
	// variable or literal   (   "(" (     <decimal>         |x,a,b,c ) ")" )
	this.sNumber          = '(?:\\(?(?:\\d+(?:(?:\\.|,)\\d+)?|x|a|b|c)\\)?)';
	// number or function    (   "("(       <function>       |      <number>      ))
	this.sElement         = '(?:\\(?(?:' + this.sFunction + '|' + this.sNumber + '))';
	// operator
	this.sOperator        = '[\\+\\-\\*\\/\\^]';

	// Regular expressions                   <element>     (      <operator> ?       <element>    )*
	this.rValidFunctionString = new RegExp( this.sElement+'(?:'+this.sOperator+'?'+this.sElement+')*' );
	this.rWhiteSpace = /\s+/;
	this.rComma = /\,/;
	this.rSymbol = new RegExp(this.sOperator);
	this.rFunction = new RegExp('^' + this.sFunction + '$');
	this.rNeedsMultiplySymbol = new RegExp('(' + this.sNumber + ')(' + this.sElement + ')', 'g');
	// exponent              <before>"^"<after>
	this.rExponent = new RegExp('.*?\\^.*','g');
};

(function declareFunctions(){

	// Constants
	var pi    = Math.PI;		var e     = Math.E;
	// Functions
	var sqrt  = Math.sqrt;		var ln    = Math.log;
	var sin   = Math.sin;		var asin  = Math.asin;
	var cos   = Math.cos;		var acos  = Math.acos;
	var tan   = Math.tan;		var atan  = Math.atan;
	var abs   = Math.abs;		var pow   = Math.pow;
	var log   = function(x){return Math.log(x) * Math.LOG10E};
	//var sinh
	//var cosh
	//var tanh
	//var asinh
	//var acosh
	//var atanh

	MathFunction.prototype.setValue = function(str) {
		this.string = this.prepareString(str);
		if (this.string !== null)
			eval("this.function = function(x, a, b, c){ return " + this.string + ";}");
		else
			this.function = null;
	};
})()

MathFunction.prototype.prepareString = function(string) {
	// Transform the string to valid Javascript syntax and check if it is valid
	var _this = this, exponentFound = true;

	// Test brackets
	var bracketCount = 0;
	for (var i = 0; i <= string.length; i++) {
		var c = string.charAt(i);
		if (c === '(') bracketCount++;
		if (c === ')') bracketCount--;
		if (bracketCount < 0){
			console.log('String \'' + string + '\' has unmatched brackets. (1)')
			return null;
		}
	};
	if (bracketCount != 0){
		console.log('String \'' + string + '\' has unmatched brackets. (2)')
		return null;
	}

	// Test whether string is valid
	if (!this.rValidFunctionString.test(string)){
		console.log('String \'' + string + '\' failed rValidFunctionString.')
		return null;
	}

	// Transform string to match Javascript Syntax
	var insertMultiplySymbol = function(match, firstFactor, secondFactor){
		console.log(arguments);
		if (!_this.rFunction.test(match))
			return firstFactor + '*' + secondFactor;
		return match;
	}

	var insertPow = function(match){
		console.log(arguments);
		exponentFound = true;
		var index = match.indexOf('^');
		var base = '', exponent = '', bracketCount = 0;
		for (var i = index - 1; i >= 0; i--) {
			var c = match.charAt(i);
			base = c + base;
			if (c === '(') bracketCount++;
			if (c === ')') bracketCount--;
			if (bracketCount == 0 && _this.rSymbol.test(c))
				break;
		};
		bracketCount = 0;
		for (i = index + 1; i <= match.length; i++) {
			c = match.charAt(i);
			exponent = exponent + c;
			if (c === '(') bracketCount++;
			if (c === ')') bracketCount--;
			if (bracketCount == 0 && _this.rSymbol.test(c))
				break;
		};
		return 'pow(' + base + ', ' + exponent + ')';
	}
	var s = string.replace(this.rWhiteSpace, '')
				.replace(this.rComma, '.')
				.replace(this.rNeedsMultiplySymbol, insertMultiplySymbol)
				// Do this twice, because they might be interleaving
				.replace(this.rNeedsMultiplySymbol, insertMultiplySymbol)
				.toLowerCase();

	while(exponentFound){
		s = s.replace(this.rExponent, insertPow);
		exponentFound = false;
	}

	console.log('After transformation:', s);

	return s;
};

MathFunction.prototype.calculate = function() {
	return this.function.apply(this, arguments);
};

MathFunction.prototype.hasValue = function() {
	return this.function != null;
};