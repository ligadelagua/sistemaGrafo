
(function($) {
	$(function() {
		var	$window = $(window),
			$body = $('body'),
			$header = $('#header'),	
			$footer = $('#footer');

		// Header.
			$header.each( function() {
				var t 		= jQuery(this),
					button 	= t.find('.button');

				button.click(function(e) {
					t.toggleClass('hide');
					var es = document.getElementById('demo-canvas');
					es.style.visibility= (es.style.visibility == 'hidden') ? 'visible' : 'hidden'; 			
				});
			});

		// Footer.
			$footer.each( function() {
				var t 		= jQuery(this),					
					button 	= t.find('.info');

				button.click(function(e) {
					t.toggleClass('show');
				});
			});
	});
})(jQuery);