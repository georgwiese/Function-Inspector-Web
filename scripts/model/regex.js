(function (){

	window.RegEx = {};

	// Functions
	functionsArray  = ['sqrt', 'sin', 'cos', 'tan', 'abs',
							'ln', 'log', 'asin', 'acos', 'atan'];

	// RegEx strings
	sFunction        = functionsArray.join('\\(|') + '\\(';
	// variable or literal   (   "(" (     <decimal>         |x,a,b,c ) ")" )
	sNumber          = '(?:\\(?(?:\\d+(?:(?:\\.|,)\\d+)?|x|a|b|c)\\)?)';
	// number or function    (   "("(       <function>       |      <number>      ))
	sElement         = '(?:\\(?(?:' + sFunction + '|' + sNumber + '))';
	// operator
	sOperator        = '[\\+\\-\\*\\/\\^]';

	// Regular expressions                   <element>     (      <operator> ?       <element>    )*
	RegEx.rValidFunctionString = new RegExp( sElement+'(?:'+sOperator+'?'+sElement+')*' );
	RegEx.rWhiteSpace = /\s+/;
	RegEx.rComma = /\,/;
	RegEx.rSymbol = new RegExp(sOperator);
	RegEx.rFunction = new RegExp('^' + sFunction + '$');
	RegEx.rFunctionOrPow = new RegExp(sFunction + '|pow\\(');
	RegEx.rNeedsMultiplySymbol = new RegExp('(' + sNumber + ')(' + sElement + ')', 'g');
	// exponent              <before>"^"<after>
	RegEx.rExponent = new RegExp('.*?\\^.*','g');

})();