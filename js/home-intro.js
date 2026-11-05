(function () {
    'use strict';

    var intro = document.querySelector('.home-intro');
    if (!intro) return;

    var root = document.documentElement;
    var motion = window.matchMedia('(prefers-reduced-motion: reduce)');
    var mobile = window.matchMedia('(max-width: 767.98px)').matches;
    var skip = intro.querySelector('.home-intro__skip');
    var finished = false;
    var dismissTimer;
    var safetyTimer;

    function finish(immediate) {
        if (finished) return;
        finished = true;
        window.clearTimeout(dismissTimer);
        window.clearTimeout(safetyTimer);
        root.classList.remove('intro-active');
        if (!immediate) root.classList.add('intro-revealing');
        intro.classList.remove('show');
        skip.tabIndex = -1;

        if (intro.contains(document.activeElement)) {
            var home = document.querySelector('.site-brand');
            if (home) home.focus({ preventScroll: true });
            else skip.blur();
        }
        intro.setAttribute('aria-hidden', 'true');
        if (immediate) intro.remove();
        document.dispatchEvent(new CustomEvent('homeintro:end'));
        window.setTimeout(function () {
            root.classList.remove('intro-revealing');
            intro.remove();
        }, immediate ? 0 : 650);
        document.removeEventListener('keydown', onKeyDown);
        document.removeEventListener('focusin', onFocus);
        window.removeEventListener('pagehide', onPageHide);
        if (motion.removeEventListener) motion.removeEventListener('change', onMotionChange);
        else if (motion.removeListener) motion.removeListener(onMotionChange);
    }

    function onKeyDown(event) {
        // Reveal before keyboard focus can move behind the overlay.
        if (event.key === 'Escape' || event.key === 'Tab') finish(true);
    }
    function onFocus(event) {
        if (!intro.contains(event.target)) finish(true);
    }
    function onMotionChange() { if (motion.matches) finish(true); }
    function onPageHide() { finish(true); }

    // Hash links and history navigation should take visitors directly to their place.
    var navigation = window.performance && performance.getEntriesByType('navigation')[0];
    if (motion.matches || window.location.hash || (navigation && navigation.type === 'back_forward')) {
        intro.remove();
        return;
    }

    // This local script starts before the rest of the page and needs no CDN libraries.
    safetyTimer = window.setTimeout(function () { finish(true); }, 3200);
    root.classList.add('intro-active');
    intro.classList.add('show');
    intro.setAttribute('aria-hidden', 'false');
    skip.tabIndex = 0;
    skip.addEventListener('click', function () { finish(false); });
    document.addEventListener('keydown', onKeyDown);
    document.addEventListener('focusin', onFocus);
    window.addEventListener('pagehide', onPageHide);
    if (motion.addEventListener) motion.addEventListener('change', onMotionChange);
    else if (motion.addListener) motion.addListener(onMotionChange);

    dismissTimer = window.setTimeout(function () { finish(false); }, mobile ? 1100 : 1600);
})();
