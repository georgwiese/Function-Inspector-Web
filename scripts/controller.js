var model = null;
var view  = null;
var mouseTracker = null;

function toggleMenuActive(event){
	var element = $(this).parent();
	if (element.hasClass("menuActive"))
		element.removeClass("menuActive");
	else
		element.addClass("menuActive");
}

window.onload = function(){
	model = new Model();
	view = new View(model);
	mouseTracker = new MouseTracker();
	console.log(mouseTracker);

	$('#mainNav .menuButton').on("click", toggleMenuActive);

	// Mouse
	$(window).mousedown( function(evt){ 
		mouseTracker.setDragging(true, evt); })
	$(window).mouseup( function(){ 
		mouseTracker.setDragging(false) })
	$(window).mousemove( function(evt){
		var diff = mouseTracker.update(evt);
		if(mouseTracker.isDragging){
			model.middle.x += diff.x / model.zoomFactor;
			model.middle.y += diff.y / model.zoomFactor;
			view.redraw();
		}
	})

	// UI Components
	$('#radioParam').buttonset()
	.find('label')
	.css({
		'width' : '33.3%',
		'box-sizing': 'border-box'
	});
	$('#sliderParam').slider();
}