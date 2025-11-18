/* =====================================================
   PSR COMPUTERS — script.js (Clean & Optimized Build)
   Author: Shabbir
   ===================================================== */


/* =====================================================
   1️⃣ HERO SLIDER
   ===================================================== */
const slides = document.querySelectorAll('.hero-slide');
const sliderContainer = document.querySelector('.slider-container');
const dotsContainer = document.querySelector('.dots');
let currentSlide = 0;

// Create dots dynamically
slides.forEach((_, i) => {
  const dot = document.createElement('button');
  dot.addEventListener('click', () => goToSlide(i));
  dotsContainer.appendChild(dot);
});
const dots = dotsContainer.querySelectorAll('button');

function updateDots() {
  dots.forEach(dot => dot.classList.remove('active'));
  if (dots[currentSlide]) dots[currentSlide].classList.add('active');
}
function showSlide(i) {
  sliderContainer.style.transform = `translateX(-${i * 100}%)`;
  updateDots();
}
function nextSlide() {
  currentSlide = (currentSlide + 1) % slides.length;
  showSlide(currentSlide);
}
function prevSlide() {
  currentSlide = (currentSlide - 1 + slides.length) % slides.length;
  showSlide(currentSlide);
}
function goToSlide(i) {
  currentSlide = i;
  showSlide(currentSlide);
}
function openLink(url) {
  window.open(url, '_self');
}

// Initialize slider
showSlide(0);
let slideInterval = setInterval(nextSlide, 6000);

const heroSlider = document.querySelector('.hero-slider');
if (heroSlider) {
  heroSlider.addEventListener('mouseenter', () => clearInterval(slideInterval));
  heroSlider.addEventListener('mouseleave', () => {
    slideInterval = setInterval(nextSlide, 6000);
  });
}


/* =====================================================
   2️⃣ EMAILJS CONTACT FORM
   ===================================================== */
document.getElementById('emailForm')?.addEventListener('submit', e => {
  e.preventDefault();

  const email = document.getElementById('userEmail').value.trim();
  const message = document.getElementById('message').value.trim();
  const statusDiv = document.getElementById('status');

  if (!email || !message) {
    statusDiv.innerText = 'Please fill in all fields.';
    return;
  }

  statusDiv.innerText = 'Sending...';

  emailjs.send('service_abppf7b', 'template_sgy0vac', {
      from_email: email,
      message,
      to_email: 'shabbirtawar786@gmail.com'
    }, 'bXeUZEr67aNH06I_g')
    .then(() => {
      statusDiv.innerText = 'Message sent successfully!';
      e.target.reset();
    })
    .catch(() => {
      statusDiv.innerText = 'Failed to send message. Please try again.';
    });
});


/* =====================================================
   3️⃣ SOCIAL BAR (Analytics Hook)
   ===================================================== */
document.querySelectorAll('.social-bar a').forEach(a => {
  a.addEventListener('click', () => {
    // Optional: track clicks (future use)
  });
});


/* =====================================================
   4️⃣ COOKIE CONSENT MODAL
   ===================================================== */
function setCookie(name, value, days) {
  const d = new Date();
  d.setTime(d.getTime() + days * 86400000);
  document.cookie = `${name}=${value};expires=${d.toUTCString()};path=/`;
}
function getCookie(name) {
  const cname = name + '=';
  return document.cookie.split(';')
    .map(c => c.trim())
    .find(c => c.startsWith(cname))
    ?.substring(cname.length) || '';
}

document.addEventListener('DOMContentLoaded', () => {
  const cookieModal = document.getElementById('cookieModal');
  const saveBtn = document.getElementById('cookieSave');
  const acceptBtn = document.getElementById('cookieAccept');
  const analytics = document.getElementById('analyticsCookie');
  const marketing = document.getElementById('marketingCookie');

  if (cookieModal && !getCookie('cookiePrefs')) {
    cookieModal.style.display = 'flex';
  }

  const savePrefs = () => {
    const prefs = {
      analytics: analytics?.checked || false,
      marketing: marketing?.checked || false
    };
    setCookie('cookiePrefs', JSON.stringify(prefs), 365);
    cookieModal.style.display = 'none';
  };

  saveBtn?.addEventListener('click', savePrefs);
  acceptBtn?.addEventListener('click', () => {
    setCookie('cookiePrefs', '{"analytics":true,"marketing":true}', 365);
    cookieModal.style.display = 'none';
  });
});


/* =====================================================
   5️⃣ BRAND SLIDER (Pause on Hover)
   ===================================================== */
const brandSlider = document.getElementById('brandSlider');
if (brandSlider) {
  brandSlider.addEventListener('mouseover', () => brandSlider.style.animationPlayState = 'paused');
  brandSlider.addEventListener('mouseout', () => brandSlider.style.animationPlayState = 'running');
}


/* =====================================================
   6️⃣ AUTO YEAR IN FOOTER
   ===================================================== */
document.addEventListener('DOMContentLoaded', () => {
  const yearSpan = document.getElementById('year');
  if (yearSpan) yearSpan.textContent = new Date().getFullYear();
});


/* =====================================================
   7️⃣ ABOUT SECTION SCROLL ANIMATIONS
   ===================================================== */
// Fade-in
document.addEventListener('scroll', () => {
  document.querySelectorAll('.about-us-section').forEach(sec => {
    const rect = sec.getBoundingClientRect();
    if (rect.top < window.innerHeight - 150) {
      sec.classList.add('visible');
    }
  });
});

// Parallax background
window.addEventListener('scroll', () => {
  document.querySelectorAll('.about-us-section').forEach(sec => {
    const rect = sec.getBoundingClientRect();
    if (rect.top < window.innerHeight && rect.bottom > 0) {
      sec.classList.add('parallax-active');
    } else {
      sec.classList.remove('parallax-active');
    }
  });
});


/* =====================================================
   8️⃣ TRUSTED SECTION FADE-IN
   ===================================================== */
const trustedSection = document.querySelector('.trusted-section');
window.addEventListener('scroll', () => {
  if (!trustedSection) return;
  const rect = trustedSection.getBoundingClientRect();
  if (rect.top < window.innerHeight * 0.85) {
    trustedSection.classList.add('visible');
  }
});


/* =====================================================
   9️⃣ NAVBAR & HAMBURGER MENU
   ===================================================== */
document.addEventListener('DOMContentLoaded', () => {
  const hamburger = document.querySelector('.hamburger');
  const navLinks = document.querySelector('.nav-links');
  const overlay = document.querySelector('.menu-overlay');
  const dropdownToggles = document.querySelectorAll('.dropdown > a');
  const logo = document.querySelector('.logo');
  const nav = document.querySelector('.nav-blur');

  /* ----- Hamburger Toggle ----- */
  hamburger?.addEventListener('click', () => {
    const open = navLinks.classList.toggle('open');
    overlay.classList.toggle('show', open);
    document.body.classList.toggle('no-scroll', open);
    hamburger.classList.toggle('active', open);
    hamburger.setAttribute('aria-expanded', open);
  });

  /* ----- Overlay Click (Close Menu) ----- */
  overlay?.addEventListener('click', () => {
    navLinks.classList.remove('open');
    overlay.classList.remove('show');
    document.body.classList.remove('no-scroll');
    hamburger?.classList.remove('active');
    hamburger?.setAttribute('aria-expanded', 'false');
  });

  /* ----- Dropdown Toggle (Mobile) ----- */
 /* ----- Dropdown Toggle (Mobile Only) ----- */
dropdownToggles.forEach(toggle => {
  toggle.addEventListener('click', e => {

    if (window.innerWidth > 768) return; // ❗ desktop: do nothing

    e.preventDefault();
    const parent = toggle.parentElement;

    // Close all other dropdowns
    document.querySelectorAll(".dropdown").forEach(d => {
      if (d !== parent) d.classList.remove("open");
    });

    // Toggle this one
    parent.classList.toggle("open");
  });
});


  /* ----- Close Dropdowns When Clicking Outside ----- */
  document.addEventListener('click', e => {
    if (!e.target.closest('.dropdown')) {
      document.querySelectorAll('.dropdown').forEach(d => d.classList.remove('open'));
      document.querySelectorAll('.dropdown-icon').forEach(i => i.classList.remove('rotate'));
    }
  });

  /* ----- Close Mobile Menu on Resize ----- */
  window.addEventListener('resize', () => {
    if (window.innerWidth > 768) {
      navLinks.classList.remove('open');
      overlay.classList.remove('show');
      document.body.classList.remove('no-scroll');
      hamburger?.classList.remove('active');
      hamburger?.setAttribute('aria-expanded', 'false');
    }
  });

  /* ----- Scroll Dark Navbar + Logo Switch ----- */
  let isDark = false;
  window.addEventListener('scroll', () => {
    const scrolled = window.scrollY > 80;
    if (scrolled && !isDark) {
      nav.classList.add('nav-dark');
      logo.src = 'images/logore.png'; // white logo when scrolled
      // ✅ Do NOT change hamburger color on scroll
      isDark = true;
    } else if (!scrolled && isDark) {
      nav.classList.remove('nav-dark');
      logo.src = 'images/logo.png'; // normal logo at top
      // ✅ Hamburger stays same maroon always
      isDark = false;
    }
  });
});

console.log("✅ Navbar script is running!");
// Add this at the very bottom:

