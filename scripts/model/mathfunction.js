var MathFunction = function(model, color){
	this.fkt = null;
	this.string = "";
	this.color = color;
	this.model = model;
};

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
	if (!RegEx.rValidFunctionString.test(string)){
		console.log('String \'' + string + '\' failed rValidFunctionString.')
		return null;
	}

	// Transform string to match Javascript Syntax
	var insertMultiplySymbol = function(match, firstFactor, secondFactor){
		if (!RegEx.rFunction.test(match))
			return firstFactor + '*' + secondFactor;
		return match;
	}

	var insertPow = function(match){
		exponentFound = true;
		var index = match.indexOf('^');
		bracketCount = 0;
		for (var baseIndex = index - 1; baseIndex >= 0; baseIndex--) {
			var c = match.charAt(baseIndex);
			if (c === '(') bracketCount++;
			if (c === ')') bracketCount--;
			if (RegEx.rSymbol.test(c)){
				baseIndex++;
				break;
			}
			if (bracketCount == 0)
				break;
		};
		bracketCount = 0;
		for (exponentIndex = index + 1; exponentIndex <= match.length; exponentIndex++) {
			c = match.charAt(exponentIndex);
			if (c === '(') bracketCount++;
			if (c === ')') bracketCount--;
			if (RegEx.rSymbol.test(c)){
				exponentIndex--;
				break;
			}
			if (bracketCount == 0)
				break;
		};
		return match.substring(0, baseIndex) + 
			'pow(' + match.substring(baseIndex, index) +
			',' + match.substring(index + 1, exponentIndex + 1) + ')' + 
			match.substring(exponentIndex + 1);
	}
	var s = string.replace(RegEx.rWhiteSpace, '')
				.replace(RegEx.rComma, '.')
				.replace(RegEx.rNeedsMultiplySymbol, insertMultiplySymbol)
				// Do this twice, because they might be interleaving
				.replace(RegEx.rNeedsMultiplySymbol, insertMultiplySymbol)
				.toLowerCase();

	while(exponentFound){
		s = s.replace(RegEx.rExponent, insertPow);
		exponentFound = false;
	}

	console.log('After transformation:', s);

	return s;
};

MathFunction.prototype.setValue = function(s) {
	this.fkt = null;

	var prepared = this.prepareString(s);
	if (prepared){
		try {
			console.log("Javascript string:", new Expression(prepared).string)
			this.fkt = new Function("x", "a", "b", "c", "return " + new Expression(prepared).string + ";" );
		} catch (e) {
			console.log(e);
		}
	}
};

MathFunction.prototype.calculate = function(x) {
	var params = this.model.getParams();
	return this.fkt(x, params[0], params[1], params[2]);
};

MathFunction.prototype.hasValue = function() {
	return this.fkt != null;
};