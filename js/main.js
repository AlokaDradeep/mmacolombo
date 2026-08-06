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

    function initSiteNavigation() {
        var currentPage = (window.location.pathname.split('/').pop() || 'index.html').toLowerCase();
        var classPages = ['nugegoda.html', 'wattala.html', 'gallary.html'];
        var mobileNavScrollY = 0;

        if (!$('.mobile-nav-backdrop').length) {
            $('<div class="mobile-nav-backdrop" aria-hidden="true"></div>').appendTo('body');
        }

        function lockMobilePageScroll() {
            mobileNavScrollY = window.pageYOffset || document.documentElement.scrollTop || 0;
            $('html, body').addClass('mobile-nav-open');
            $('body').css({
                position: 'fixed',
                top: -mobileNavScrollY + 'px',
                left: 0,
                right: 0,
                width: '100%'
            });
        }

        function unlockMobilePageScroll() {
            if (!$('body').hasClass('mobile-nav-open')) {
                return;
            }

            $('html, body').removeClass('mobile-nav-open');
            $('body').css({
                position: '',
                top: '',
                left: '',
                right: '',
                width: ''
            });
            window.scrollTo(0, mobileNavScrollY);
        }

        $('.navbar-toggler').attr({
            'aria-label': 'Toggle navigation',
            'aria-controls': 'navbarCollapse',
            'aria-expanded': 'false'
        });

        $('.navbar .nav-link, .navbar .dropdown-item').each(function () {
            var href = (($(this).attr('href') || '').split('#')[0]).toLowerCase();
            if (href === currentPage) {
                $(this).addClass('active').attr('aria-current', 'page');
            } else if (href && href !== '#') {
                $(this).removeClass('active').removeAttr('aria-current');
            }
        });

        if (classPages.indexOf(currentPage) !== -1) {
            $('.navbar .dropdown > .nav-link').addClass('active');
        }

        $('#navbarCollapse')
            .on('show.bs.collapse', function () {
                lockMobilePageScroll();
                $('.navbar-toggler').attr('aria-expanded', 'true');
            })
            .on('hidden.bs.collapse', function () {
                unlockMobilePageScroll();
                $('.navbar-toggler').attr('aria-expanded', 'false');
            });

        $(window).on('resize', function () {
            if (window.innerWidth >= 992) {
                unlockMobilePageScroll();
            }
        });

        $(document).on('click', function (event) {
            if (window.innerWidth >= 992 || !$('body').hasClass('mobile-nav-open')) {
                return;
            }

            if ($(event.target).closest('#navbarCollapse, .navbar-toggler').length) {
                return;
            }

            var collapseElement = document.getElementById('navbarCollapse');
            var collapse = collapseElement && typeof bootstrap !== 'undefined'
                ? bootstrap.Collapse.getInstance(collapseElement)
                : null;

            if (collapse) {
                collapse.hide();
            }
        });

        $('.navbar-collapse a:not([data-bs-toggle="dropdown"])').on('click', function () {
            if (window.innerWidth < 992 && typeof bootstrap !== 'undefined') {
                var collapseElement = document.getElementById('navbarCollapse');
                var collapse = bootstrap.Collapse.getInstance(collapseElement);
                if (collapse) {
                    collapse.hide();
                }
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

    hideSpinner();
    initWow();
    initStickyNavbar();
    initSiteNavigation();
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
                autoplay: false,
                loop: false,
                nav: false
            },
            768: {
                autoplay: true,
                loop: true,
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
})(jQuery);
