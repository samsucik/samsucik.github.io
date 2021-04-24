/*
	Prologue by HTML5 UP
	html5up.net | @ajlkn
	Free for personal and commercial use under the CCA 3.0 license (html5up.net/license)
*/

(function($) {

	skel.breakpoints({
		wide: '(min-width: 961px) and (max-width: 1880px)',
		normal: '(min-width: 961px) and (max-width: 1620px)',
		narrow: '(min-width: 961px) and (max-width: 1320px)',
		narrower: '(max-width: 960px)',
		mobile: '(max-width: 736px)'
	});

	$(document).ready(function() {

		var	$window = $(window),
			$body = $('body');

		// Disable animations/transitions until the page has loaded.
			$body.addClass('is-loading');

			$window.on('load', function() {
				$body.removeClass('is-loading');
			});

		// CSS polyfills (IE<9).
			if (skel.vars.IEVersion < 9)
				$(':last-child').addClass('last-child');

		// Fix: Placeholder polyfill.
			$('form').placeholder();

		// Prioritize "important" elements on mobile.
			skel.on('+mobile -mobile', function() {
				$.prioritize(
					'.important\\28 mobile\\29',
					skel.breakpoint('mobile').active
				);
			});

		// Scrolly links.
			$('.scrolly').scrolly();

		// Nav.
			var $nav_a = $('#nav a.scrolly');

			// Scrolly-fy links.
				if($nav_a.scrolly()){
					$nav_a
						.scrolly()
						.on('click', function(e) {

							var t = $(this),
								href = t.attr('href');

							if (href[0] != '#')
								return;

							e.preventDefault();

							// Clear active and lock scrollzer until scrolling has stopped
								$nav_a
									.removeClass('active')
									.addClass('scrollzer-locked');

							// Set this link to active
								t.addClass('active');

						});
				}

			// Initialize scrollzer.
				var ids = [];

				$nav_a.each(function() {

					var href = $(this).attr('href');

					if (href[0] != '#')
						return;

					ids.push(href.substring(1));

				});

				$.scrollzer(ids, { pad: 200, lastHack: true });

		// Header (narrower + mobile).

			// Toggle.
				$(
					'<div id="headerToggle">' +
						'<a href="#header" class="toggle"></a>' +
					'</div>'
				)
					.appendTo($body);

			// Header.
				$('#header')
					.panel({
						delay: 500,
						hideOnClick: true,
						hideOnSwipe: true,
						resetScroll: true,
						resetForms: true,
						side: 'left',
						target: $body,
						visibleClass: 'header-visible'
					});

			// Fix: Remove transitions on WP<10 (poor/buggy performance).
				if (skel.vars.os == 'wp' && skel.vars.osVersion < 10)
					$('#headerToggle, #header, #main')
						.css('transition', 'none');
		
	  /* =======================
	  // Zoom Image
	  ======================= */
	  $(".page img, .post img").attr("data-action", "zoom");
	  $(".page a img, .post a img").removeAttr("data-action", "zoom");

		$(".birds-section").each(function(idx){
			$.fn.resizeImages = function(that, numImages){
				$this = that;
				var allWHRatios = [];
				$("img", $this).each(function(idx){
					allWHRatios.push(this.naturalWidth/this.naturalHeight);
				});
				var maxWidth = $($this).width();
				var maxHeight = maxWidth/allWHRatios.reduce((a, b) => a + b, 0);
				maxHeight = Math.min(maxHeight, 400);
				$(".image-container", $this).each(function(idx){
					$(this).css("height", (maxHeight-numImages)+"px");
				});
				var verticalPadding = parseInt($($this).css("padding-top")) + parseInt($($this).css("padding-bottom"));
			};

			var $images = $("img", this);
			var loadingOverlay = $(".loading", this);
			var loaded_images_count = 0;
			var thisContainer = this;
			$($images).css("visibility", "hidden");
			$images.load(function(){
		    loaded_images_count++;
		    if (loaded_images_count == $images.length) {
		      $.fn.resizeImages(thisContainer, $images.length);
		      $($images).css({opacity: 0.0, visibility: "visible"}).animate({opacity: 1.0}, 500, function(){
		      	$(loadingOverlay).animate({opacity: 0.0}, 300, function(){
			      	console.log("removing overlay");
		      		$(this).remove();
		      	});
		      });
		    }
			});
		});
		
    zoomWrapperFunction($);
	});
})(jQuery);