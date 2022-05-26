// Спойлеры для карточек фонда
$(document).ready(function() {
	if($(window).width() < 651) {
		$('.soviet-item__card').click(function(event) {
			let firstButton = $(this).find('.inactive-spoiler');
			firstButton.toggleClass('visible-button');
			let secondButton = $(this).find('.active-spoiler');
			secondButton.toggleClass('visible-button');
			let thisCardInfo = $(this).find('.info__soviet-card');
			thisCardInfo.toggleClass('active-info-spoiler');
		});
	};
});