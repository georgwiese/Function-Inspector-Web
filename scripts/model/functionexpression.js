var benchmark = function(){
	var exp  = new Expression("1+2+3-1-2-3+4*5*6/4/5/6-1+1/x");
	var func = new Function("x", "return 1+2+3-1-2-3+4*5*6/4/5/6-1+1/x;");

	var start, i;
	console.log("=== Benchmark ===");

	start = (new Date()).getTime();
	for(i = 0; i < 100000; i++)
		exp.calculate(i);
	console.log("--> Exp:", (new Date()).getTime() - start);

	start = (new Date()).getTime();
	for(i = 0; i < 100000; i++)
		func(i);
	console.log("--> Func:", (new Date()).getTime() - start);
};

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
		var summands = [];
		console.log('Expression:', s);

		split(s, ['+', '-']).forEach( function(summandString) {
			summands.push( new Summand(summandString) );
		});

		this.calculate = function(x, a, b, c) {
			//console.log("E:", summands.length);
			var res = 0;
			summands.forEach( function(summand){
				res += summand.calculate(x, a, b, c);
			});
			//console.log("Done.");
			return res;
		}

		console.log("Resulting Expression", this);
	};

	window.Summand = function( s ){
		var factors = [];
		var positive = s.charAt(0) === '+';
		console.log('Summand:', s);

		split(s.substring(1), ['*', '/']).forEach( function(factorString) {
			factors.push( new Factor(factorString) );
		});

		this.calculate = function(x, a, b, c) {
			//console.log("S:", factors.length);
			var res = 1;
			factors.forEach( function(factor){
				res *= factor.calculate(x, a, b, c);
			});
			if (!positive)
				res *= -1;
			return res;
		};
	};

	window.Factor = function( s ){
		console.log('Factor:', s);

		// Function and Constant definition
		Fkts = {
			// . Constants
			pi    : Math.PI,		  e     : Math.E,
			// . Functions
			sqrt  : Math.sqrt,	  ln    : Math.log,
			sin   : Math.sin,		asin  : Math.asin,
			cos   : Math.cos,		acos  : Math.acos,
			tan   : Math.tan,		atan  : Math.atan,
			abs   : Math.abs,		pow   : Math.pow,
			log   : function(x){return Math.log(x) * Math.LOG10E}
			//sinh
			//cosh
			//tanh
			//asinh
			//acosh
			//atanh
		};

		var r;

		// Take care of reciprocal
		if (s.charAt(0) === '*')
			r = function( v ){
				return v; }
		if (s.charAt(0) === '/')
			r = function( v ){
				return 1 / v; }
		s = s.substring(1);

		// Bracket term
		if ( s.charAt(0) === '(' ){
			var exp = new Expression(s.substring(1, s.length - 1));
			this.calculate = function(x, a, b, c) {
				return r( exp.calculate(x, a, b, c) );
			};
			return;
		}

		// Function
		var functions = s.match(RegEx.rFunctionOrPow);
		if ( functions ){
			//exp  = new Expression( s.substring( s.indexOf('(') + 1, s.length - 1 ) );
			var exps = [];
			s = s.substring( s.indexOf('(') + 1, s.length - 1 );
			s.split(',').forEach( function(argString){
				exps.push( new Expression(argString) );
			});
			var func = Fkts[functions[0].substring( 0, functions[0].length - 1 )];
			this.calculate = function(x, a, b, c) {
				//console.log("F: calculate function:", functions[0].substring( 0, functions[0].length - 1 ), func);
				var args = [];
				exps.forEach( function(e){
					args.push( e.calculate(x, a, b, c));
				});
				return r( func.apply( Math, args ) );
			};
			console.log("func", func);
			return;
		}

		// Variable or literal
		if (s === "x")
			this.calculate = function(x, a, b, c) { return r( x ); };
		else if (s === "a")
			this.calculate = function(x, a, b, c) { return r( a ); };
		else if (s === "b")
			this.calculate = function(x, a, b, c) { return r( b ); };
		else if (s === "c")
			this.calculate = function(x, a, b, c) { return r( c ); };
		else {
			var number = parseFloat(s);
			this.calculate = function(x, a, b, c) { return r( number ); };
		}
	};
})();