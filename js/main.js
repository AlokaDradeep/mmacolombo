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
        var classPages = ['nugegoda.html', 'wattala.html', 'gallery.html'];
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
                var href = (($(this).attr('href') || '').split('#')[0].split('/').pop() || 'index.html').toLowerCase();
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

            var total = safeReviews.reduce(function (sum, review) { return sum + Number(review.rating || 0); }, 0);
            var average = safeReviews.length ? (total / safeReviews.length).toFixed(1) : '0.0';
            $('#reviews-average').text(average);
            $('#reviews-count').text(safeReviews.length);
            if (!safeReviews.length) {
                list.innerHTML = '<p class="reviews-status">No reviews yet. Be the first to share your experience.</p>';
                return;
            }
            list.innerHTML = safeReviews.slice(0, 6).map(function (review) {
                var rating = Math.max(1, Math.min(5, Number(review.rating) || 5));
                return '<article class="review-card"><div class="review-card__top"><strong>' + escapeHtml(review.name) + '</strong><span class="review-card__stars" aria-label="' + rating + ' out of 5 stars">' + '★'.repeat(rating) + '</span></div><p>' + escapeHtml(review.message) + '</p><time datetime="' + escapeHtml(review.date) + '">' + new Date(review.date).toLocaleDateString('en-LK', { year: 'numeric', month: 'short', day: 'numeric' }) + '</time></article>';
            }).join('');
        }

        function loadReviews() {
            if (!endpoint) {
                renderReviews(readLocalReviews());
                return;
            }
            fetch(endpoint).then(function (response) { return response.json(); }).then(renderReviews).catch(function () {
                renderReviews(readLocalReviews());
            });
        }

        form.addEventListener('submit', function (event) {
            event.preventDefault();
            var status = document.getElementById('review-form-status');
            var review = {
                name: form.elements.name.value.trim(),
                rating: Number(form.elements.rating.value),
                message: form.elements.message.value.trim(),
                date: new Date().toISOString().slice(0, 10)
            };
            var reviews = readLocalReviews();
            reviews.unshift(review);
            status.textContent = 'Publishing...';
            var request = endpoint ? fetch(endpoint, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(review) }) : Promise.resolve({ ok: true });
            request.then(function (response) {
                if (!response.ok) { throw new Error('Review submission failed'); }
                localStorage.setItem(storageKey, JSON.stringify(reviews));
                renderReviews(reviews);
                form.reset();
                status.textContent = endpoint ? 'Thank you. Your review is now live.' : 'Review added on this device. Connect the live endpoint to share it everywhere.';
            }).catch(function () {
                status.textContent = 'Could not publish right now. Please try again.';
            });
        });

        loadReviews();
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
