(function(){
	// Helper functions
	var split = function(string, separatorArray) {
		
		var res = [], l = 0, bracketCount = 0;
		
		var append = function( s ){
			if ( s.length > 0 ){
				if ( separatorArray.indexOf( s.charAt(0) ) >= 0)
					res.push(s);
				else
					res.push(separatorArray[0] + s);
			}
		}

		for ( var r = 0; r < string.length; r++){
			
			var c = string.charAt(r);

			if (c === '(') bracketCount++;
			if (c === ')') bracketCount--;
			if (bracketCount != 0) continue;

			if (separatorArray.indexOf( c ) >= 0){
				append(string.substring(l, r));
				l = r;
			}
		}

		if( l < r )
			append(string.substring(l, r));
		
		return res;
	};

	window.Expression = function( s ){
		var _this = this;
		this.string = "";
		split(s, ['+', '-']).forEach( function(summandString) {
			_this.string += new Summand(summandString).string;
		});
	};

	window.Summand = function( s ){
		var _this = this;
		this.positive = s.charAt(0) === '+';

		this.string = this.positive? '+' : '-';
		split(s.substring(1), ['*', '/']).forEach( function(factorString, i) {
			var factor = new Factor(factorString).string;
			if (i == 0){
				factor = factor.substring(1);
			}
			_this.string += factor;
		});
	};

	window.Factor = function( s ){

		// Function and Constant mapping
		Fkts = {
			// . Constants
			pi    : 'Math.PI',		  e     : 'Math.E',
			// . Functions
			sqrt  : 'Math.sqrt',	  ln    : 'Math.log',
			sin   : 'Math.sin',			asin  : 'Math.asin',
			cos   : 'Math.cos',			acos  : 'Math.acos',
			tan   : 'Math.tan',			atan  : 'Math.atan',
			abs   : 'Math.abs',			pow   : 'Math.pow',
			log   : '(Math.log(x) * Math.LOG10E)'
		};

		var prefix = s.charAt(0).toString();
		s = s.substring(1);

		// Bracket term
		if ( s.charAt(0) === '(' ){
			if ( s.charAt(s.length - 1) !== ')')
				throw "syntaxError";
			var exp = new Expression(s.substring(1, s.length - 1));
			this.string = prefix + '(' + exp.string + ')';
			return;
		}

		// Function
		var functions = s.match(RegEx.rFunctionOrPow);
		if ( functions ){
			var exps = [];
			s = s.substring( s.indexOf('(') + 1, s.length - 1 );
			s.split(',').forEach( function(argString){
				exps.push( new Expression(argString).string );
			});
			var func = Fkts[functions[0].substring( 0, functions[0].length - 1 )];
			this.string = prefix + func + '(' + exps.join(',') + ')';
			return;
		}

		// Variable or literal
		if (s === "x" || s === "a" || s === "b" || s === "c" ) {
			this.string = prefix + s;
			return;
		}

		try {
			var number = parseFloat(s);
			this.string = prefix + s;
		} catch (e) {
			throw "syntaxError";
		}
	};
})();