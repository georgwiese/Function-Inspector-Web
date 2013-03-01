function toggleMenuActive(event){
	var element = $(event.currentTarget).parent().parent();
	if (element.hasClass("menuActive"))
		element.removeClass("menuActive");
	else
		element.addClass("menuActive");
}

window.onload = function(){
	$('#mainNav .menuButton').on("click", toggleMenuActive);
}