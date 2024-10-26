(function ($) {
	
	"use strict";

	// Page loading animation
	$(window).on('load', function() {

        $('#js-preloader').addClass('loaded');

    });


	$(window).scroll(function() {
	  var scroll = $(window).scrollTop();

	  if (scroll >= 100) {
	    $("header").addClass("background-header");
	  } else {
	    $("header").removeClass("background-header");
	  }
	})

	var width = $(window).width();
		$(window).resize(function() {
		if (width > 767 && $(window).width() < 767) {
			location.reload();
		}
		else if (width < 767 && $(window).width() > 767) {
			location.reload();
		}
	})

	$('.owl-testimonials').owlCarousel({
	  center: true,
      items:1,
      loop:true,
      margin:30,
      autoplay: true,
      autoplayTimeout: 5000,
      responsive:{
        992:{
            items:1
        },
		1200:{
			items:1
		}
      }
	});


	// Menu Dropdown Toggle
	if($('.menu-trigger').length){
		$(".menu-trigger").on('click', function() {	
			$(this).toggleClass('active');
			$('.header-area .nav').slideToggle(200);
		});
	}


	// Menu elevator animation
	$('.scroll-to-section a[href*=\\#]:not([href=\\#])').on('click', function() {
		if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') && location.hostname == this.hostname) {
			var target = $(this.hash);
			target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
			if (target.length) {
				var width = $(window).width();
				if(width < 767) {
					$('.menu-trigger').removeClass('active');
					$('.header-area .nav').slideUp(200);	
				}				
				$('html,body').animate({
					scrollTop: (target.offset().top) - 80
				}, 700);
				return false;
			}
		}
	});

	$(document).ready(function () {
	    $(document).on("scroll", onScroll);
	    
	    //smoothscroll
	    $('.scroll-to-section a[href^="#"]').on('click', function (e) {
	        e.preventDefault();
	        $(document).off("scroll");
	        
	        $('.scroll-to-section a').each(function () {
	            $(this).removeClass('active');
	        })
	        $(this).addClass('active');
	      
	        var target = this.hash,
	        menu = target;
	       	var target = $(this.hash);
	        $('html, body').stop().animate({
	            scrollTop: (target.offset().top) - 79
	        }, 500, 'swing', function () {
	            window.location.hash = target;
	            $(document).on("scroll", onScroll);
	        });
	    });
	});

	function onScroll(event){
	    var scrollPos = $(document).scrollTop();
	    $('.nav a').each(function () {
	        var currLink = $(this);
	        var refElement = $(currLink.attr("href"));
	        if (refElement.position().top <= scrollPos && refElement.position().top + refElement.height() > scrollPos) {
	            $('.nav ul li a').removeClass("active");
	            currLink.addClass("active");
	        }
	        else{
	            currLink.removeClass("active");
	        }
	    });
	}


	// Page loading animation
	$(window).on('ready', function() {
		if($('.cover').length){
			$('.cover').parallax({
				imageSrc: $('.cover').data('image'),
				zIndex: '1'
			});
		}

		$("#preloader").animate({
			'opacity': '0'
		}, 600, function(){
			setTimeout(function(){
				$("#preloader").css("visibility", "hidden").fadeOut();
			}, 300);
		});
	});

	const dropdownOpener = $('.main-nav ul.nav .has-sub > a');

    // Open/Close Submenus
    if (dropdownOpener.length) {
        dropdownOpener.each(function () {
            var _this = $(this);

            _this.on('tap click', function (e) {
                var thisItemParent = _this.parent('li'),
                    thisItemParentSiblingsWithDrop = thisItemParent.siblings('.has-sub');

                if (thisItemParent.hasClass('has-sub')) {
                    var submenu = thisItemParent.find('> ul.sub-menu');

                    if (submenu.is(':visible')) {
                        submenu.slideUp(450, 'easeInOutQuad');
                        thisItemParent.removeClass('is-open-sub');
                    } else {
                        thisItemParent.addClass('is-open-sub');

                        if (thisItemParentSiblingsWithDrop.length === 0) {
                            thisItemParent.find('.sub-menu').slideUp(400, 'easeInOutQuad', function () {
                                submenu.slideDown(250, 'easeInOutQuad');
                            });
                        } else {
                            thisItemParent.siblings().removeClass('is-open-sub').find('.sub-menu').slideUp(250, 'easeInOutQuad', function () {
                                submenu.slideDown(250, 'easeInOutQuad');
                            });
                        }
                    }
                }

                e.preventDefault();
            });
        });
    }

    $('.tech-filter').on('click', function () {
        $('.tech-filter').removeClass('selected');
        $(this).addClass('selected');

        shuffleInstance.filter($(this).data('filter'));
    });

    $("#contact-form").submit(function(e) {

        e.preventDefault(); // avoid to execute the actual submit of the form.

        var form = $(this);
        var actionUrl = form.attr('action');
        
        $.ajax({
            type: "POST",
            url: actionUrl,
            data: form.serialize(), // serializes the form's elements.
            success: function(data)
            {
                $('.form-submit-message').removeClass('d-none');
                $('#contact-form textarea').addClass('mb-0');
            }
        });
        
    });

    $('.main-btn').on('click', function () {
        $('html,body').animate({
            scrollTop: ($('#contact').offset().top) - 80
        }, 700);
    });

})(window.jQuery);

const element = document.getElementById('tech-list');

const shuffleInstance = new Shuffle(element, {
    itemSelector: '.tech',
    delimiter: ',',
    isCentered: true
});

var typed = new Typed('#profile-role h1', {
    strings: [
        'Full Stack Developer',
        'Expert in Laravel',
        'Expert in PHP',
        'Expert in Wordpress',
        'Expert in Javascript',
        'Expert in React JS'
    ],
    typeSpeed: 100,
    loop: true,
    showCursor: false,
    backSpeed: 50,
    startDelay: 250
});

lightGallery(document.getElementById('awards'), {
    selector: '.showcase-item',
    thumbnail: true,
    speed: 500
});

lightGallery(document.getElementById('showcase'), {
    // plugins: [lgZoom],
    selector: '.showcase-item',
    thumbnail: true,
    speed: 500
});

lightGallery(document.getElementById('showcase-videos'), {
    plugins: [lgVideo],
    videojs: true,
});
