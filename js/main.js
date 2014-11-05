$(function () {
	$('.list-group-item').on('click',function(e){
		var previous = $(this).closest(".list-group").children(".active");
		previous.removeClass('active'); // previous list-item
		if ( $(e.target).hasClass('list-group-item') ) {
			$(e.target).addClass('active'); // activated list-item
		} else {
			$(e.target).closest('.list-group-item').addClass('active'); // activated list-item
		}
	});
});
