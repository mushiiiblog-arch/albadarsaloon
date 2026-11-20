// Al-Baddar Barbers — small enhancements; the site works without JS.
document.documentElement.classList.add('js');

// Reveal sections as they scroll into view
var io = 'IntersectionObserver' in window && new IntersectionObserver(function (es) {
  es.forEach(function (e) { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } });
}, { rootMargin: '0px 0px -8% 0px' });
document.querySelectorAll('.rv').forEach(function (el) { io ? io.observe(el) : el.classList.add('in'); });

// Gallery slider
var slider = document.querySelector('[data-slider]');
if (slider) {
  var slides = slider.querySelectorAll('.slides figure');
  var thumbs = slider.querySelectorAll('.thumbs button');
  var num = slider.querySelector('[data-num]');
  var i = 0, timer;
  var show = function (n) {
    i = (n + slides.length) % slides.length;
    slides.forEach(function (s, k) { s.classList.toggle('on', k === i); });
    thumbs.forEach(function (t, k) { t.classList.toggle('on', k === i); t.setAttribute('aria-pressed', k === i); });
    num.textContent = String(i + 1).padStart(2, '0');
  };
  var play = function () { clearInterval(timer); timer = setInterval(function () { show(i + 1); }, 4000); };
  slider.querySelector('[data-prev]').onclick = function () { show(i - 1); play(); };
  slider.querySelector('[data-next]').onclick = function () { show(i + 1); play(); };
  thumbs.forEach(function (t, k) { t.onclick = function () { show(k); play(); }; });
  if (!matchMedia('(prefers-reduced-motion: reduce)').matches) play();
}

// Service page photo thumbnails
var main = document.querySelector('[data-main-img]');
document.querySelectorAll('.pthumbs button').forEach(function (b, k, all) {
  b.onclick = function () {
    main.srcset = b.dataset.srcset;  // srcset wins over src, so both must change
    main.src = b.dataset.src;
    all.forEach(function (x) { x.classList.toggle('on', x === b); });
  };
});

// Close mobile menu after choosing a link
document.querySelectorAll('.mnav a').forEach(function (a) {
  a.addEventListener('click', function () { a.closest('details').open = false; });
});

var y = document.querySelector('[data-year]');
if (y) y.textContent = new Date().getFullYear();

// Hero video: self-hosted, muted, looping (phones get a lighter file via <source media>).
// Starts as soon as the page is parsed and the video is on screen; pauses off-screen.
// If the phone blocks autoplay (e.g. Low Power Mode), a play button appears instead.
var hv = document.getElementById('hero-video');
if (hv) {
  var vbtn = document.querySelector('[data-vplay]');
  var tryPlay = function () {
    var pr = hv.play();
    if (pr && pr.catch) pr.catch(function () { if (vbtn) vbtn.hidden = false; });
  };
  if (vbtn) vbtn.onclick = function () { vbtn.hidden = true; hv.play(); };
  hv.addEventListener('playing', function () { if (vbtn) vbtn.hidden = true; });
  if (matchMedia('(prefers-reduced-motion: reduce)').matches) { if (vbtn) vbtn.hidden = false; }
  else {
    hv.preload = 'auto';
    if ('IntersectionObserver' in window) {
      new IntersectionObserver(function (es) { es[0].isIntersecting ? tryPlay() : hv.pause(); }, { threshold: 0.25 }).observe(hv);
    } else { tryPlay(); }
  }
}

// Google reviews slider
var rv = document.querySelector('[data-reviews]');
if (rv) {
  var track = rv.querySelector('.rtrack');
  var step = function (dir) {
    var card = track.querySelector('.rcard');
    var w = card ? card.getBoundingClientRect().width + 20 : track.clientWidth;
    var end = track.scrollLeft + track.clientWidth >= track.scrollWidth - 5;
    if (dir > 0 && end) track.scrollTo({ left: 0, behavior: 'smooth' });
    else track.scrollBy({ left: dir * w, behavior: 'smooth' });
  };
  rv.querySelector('[data-rprev]').onclick = function () { step(-1); };
  rv.querySelector('[data-rnext]').onclick = function () { step(1); };
  var rtimer, paused = false;
  ['mouseenter', 'touchstart', 'focusin'].forEach(function (e) { rv.addEventListener(e, function () { paused = true; }, { passive: true }); });
  rv.addEventListener('mouseleave', function () { paused = false; });
  if (!matchMedia('(prefers-reduced-motion: reduce)').matches) rtimer = setInterval(function () { if (!paused) step(1); }, 6000);
}

// Cookie consent: Google Maps loads only after "Accept all" or "Show map".
var KEY = 'ab-consent';
var getConsent = function () { try { return localStorage.getItem(KEY); } catch (e) { return null; } };
var setConsent = function (v) { try { localStorage.setItem(KEY, v); } catch (e) {} };
var loadMaps = function () {
  document.querySelectorAll('.map iframe[data-src]').forEach(function (f) { f.src = f.dataset.src; f.removeAttribute('data-src'); f.closest('.map').classList.add('on'); });
};
var banner = document.getElementById('cookie');
var showBanner = function () { if (banner) { banner.hidden = false; requestAnimationFrame(function () { banner.classList.add('show'); }); } };
var hideBanner = function () { if (banner) { banner.classList.remove('show'); setTimeout(function () { banner.hidden = true; }, 400); } };
if (getConsent() === 'all') loadMaps();
if (!getConsent()) setTimeout(showBanner, 3000);
document.querySelectorAll('[data-cookie]').forEach(function (b) {
  b.onclick = function () { setConsent(b.dataset.cookie); if (b.dataset.cookie === 'all') loadMaps(); hideBanner(); };
});
document.querySelectorAll('[data-show-map]').forEach(function (b) { b.onclick = function () { setConsent('all'); loadMaps(); hideBanner(); }; });
document.querySelectorAll('[data-cookie-settings]').forEach(function (b) { b.onclick = showBanner; });

// Contact page: build the WhatsApp message from the form fields
var book = document.getElementById('book');
if (book) {
  book.addEventListener('submit', function (ev) {
    ev.preventDefault();
    var f = book.elements;
    var lines = ['Hi Al-Baddar Barbers, I would like to book an appointment.',
      'Name: ' + f.name.value, 'Service: ' + f.service.value, 'Day: ' + f.day.value, 'Time: ' + f.time.value];
    if (f.phone.value) lines.push('Phone: ' + f.phone.value);
    if (f.message.value) lines.push('Message: ' + f.message.value);
    window.open('https://wa.me/441273494283?text=' + encodeURIComponent(lines.join('\n')), '_blank', 'noopener');
  });
}
