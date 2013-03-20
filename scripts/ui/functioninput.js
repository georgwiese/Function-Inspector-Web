var FunctionInput = function(parentElement, index, onChange){
	var _this = this;
	this.parent = parentElement;
	this.index = index;
	this.div = $('<div>').addClass('input');
	this.input = $('<input>').change(function(evt){
		onChange(_this.index, _this.input[0].value);
	});

	this.div.append('f' + (index + 1) + '(x) = ')
					.append(this.input);

	this.parent.append(this.div);
}