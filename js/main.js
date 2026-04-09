(function ($) {
    "use strict";

    function hideSpinner() {
        window.setTimeout(function () {
            var spinner = $('#spinner');
            if (spinner.length) {
                spinner.removeClass('show');
            }
        }, 1);
    }

    function initWow() {
        if (typeof WOW === 'function') {
            new WOW().init();
        }
    }

    function initStickyNavbar() {
        $(window).on('scroll', function () {
            if ($(this).scrollTop() > 45) {
                $('.navbar').addClass('sticky-top shadow-sm');
            } else {
                $('.navbar').removeClass('sticky-top shadow-sm');
            }
        });
    }

    function initCarousel(selector, options) {
        if ($.fn.owlCarousel && $(selector).length) {
            $(selector).owlCarousel(options);
        }
    }

    function initCounterUp() {
        if ($.fn.counterUp && $('[data-toggle="counter-up"]').length) {
            $('[data-toggle="counter-up"]').counterUp({
                delay: 5,
                time: 2000
            });
        }
    }

    function initSnowEffect() {
        var snowContainer = document.getElementById('snow-container');
        if (!snowContainer) {
            return;
        }

        var snowContent = ['&#10052', '&#10053', '&#10054'];
        var snowRemoved = false;

        function random(limit) {
            return Math.floor(Math.random() * limit);
        }

        function getRandomStyles() {
            var top = random(100);
            var left = random(100);
            var duration = random(10) + 10;
            var size = random(25) + 25;
            return [
                'top: -' + top + '%;',
                'left: ' + left + '%;',
                'font-size: ' + size + 'px;',
                'animation-duration: ' + duration + 's;'
            ].join(' ');
        }

        function removeSnow() {
            if (snowRemoved || !snowContainer.parentNode) {
                return;
            }

            snowRemoved = true;
            snowContainer.style.opacity = '0';
            window.setTimeout(function () {
                if (snowContainer.parentNode) {
                    snowContainer.parentNode.removeChild(snowContainer);
                }
            }, 500);
        }

        for (var i = 0; i < 30; i += 1) {
            var snow = document.createElement('div');
            snow.className = 'snow';
            snow.style.cssText = getRandomStyles();
            snow.innerHTML = snowContent[random(snowContent.length)];
            snowContainer.appendChild(snow);
        }

        window.setTimeout(removeSnow, 60000);
        window.addEventListener('click', removeSnow, { once: true });
    }

    hideSpinner();
    initWow();
    initStickyNavbar();
    initCarousel('.header-carousel', {
        animateOut: 'fadeOut',
        items: 1,
        margin: 0,
        stagePadding: 0,
        autoplay: true,
        smartSpeed: 500,
        mouseDrag: true,
        touchDrag: true,
        pullDrag: true,
        dots: true,
        loop: true,
        nav: true,
        navText: [
            '<i class="bi bi-arrow-left"></i>',
            '<i class="bi bi-arrow-right"></i>'
        ],
        responsive: {
            0: {
                nav: false
            },
            768: {
                nav: true
            }
        }
    });
    initCarousel('.blog-carousel', {
        autoplay: true,
        smartSpeed: 1500,
        center: false,
        dots: false,
        loop: true,
        margin: 25,
        nav: true,
        navText: [
            '<i class="fa fa-angle-right"></i>',
            '<i class="fa fa-angle-left"></i>'
        ],
        responsiveClass: true,
        responsive: {
            0: { items: 1 },
            576: { items: 1 },
            768: { items: 2 },
            992: { items: 2 },
            1200: { items: 3 }
        }
    });
    initCarousel('.testimonial-carousel', {
        autoplay: true,
        smartSpeed: 1500,
        center: false,
        dots: true,
        loop: true,
        margin: 25,
        nav: true,
        navText: [
            '<i class="fa fa-angle-right"></i>',
            '<i class="fa fa-angle-left"></i>'
        ],
        responsiveClass: true,
        responsive: {
            0: { items: 1 },
            576: { items: 1 },
            768: { items: 2 },
            992: { items: 2 },
            1200: { items: 3 }
        }
    });
    initCounterUp();
    initSnowEffect();
})(jQuery);