// ===============================
//  IMAGE SLIDER / CAROUSEL
// ===============================
const track = document.getElementById("sliderTrack");
const slides = document.querySelectorAll(".slide");
const dots = document.querySelectorAll(".dot");

let index = 0;
const totalSlides = slides.length;

function updateSlider(newIndex) {
  index = (newIndex + totalSlides) % totalSlides;
  track.style.transform = `translateX(-${index * 100}%)`;
  dots.forEach(dot => dot.classList.remove("active"));
  dots[index].classList.add("active");
}

dots.forEach(dot => {
  dot.addEventListener("click", () => updateSlider(parseInt(dot.dataset.index)));
});

// Auto-slide
setInterval(() => updateSlider(index + 1), 5000);



//  LIGHTBOX (fullscreen view)
// ===============================
const lightbox = document.getElementById("lightbox");
const lbImage = document.getElementById("lbImage");
const lbPrev = document.getElementById("lbPrev");
const lbNext = document.getElementById("lbNext");
const lbClose = document.getElementById("lbClose");
const lbOverlay = document.getElementById("lbOverlay");

slides.forEach((slide, i) => {
  slide.addEventListener("click", () => openLightbox(i));
});

function openLightbox(i) {
  lightbox.classList.add("open");
  lbImage.src = slides[i].querySelector("img").src;
  lbImage.dataset.index = i;
}

function closeLightbox() {
  lightbox.classList.remove("open");
}

lbClose.addEventListener("click", closeLightbox);
lbOverlay.addEventListener("click", closeLightbox);

lbPrev.addEventListener("click", () => {
  let i = parseInt(lbImage.dataset.index);
  i = (i - 1 + totalSlides) % totalSlides;
  openLightbox(i);
});

lbNext.addEventListener("click", () => {
  let i = parseInt(lbImage.dataset.index);
  i = (i + 1) % totalSlides;
  openLightbox(i);
});



// AUTO YEAR UPDATE
document.addEventListener("DOMContentLoaded", () => {
  const yearSpan = document.getElementById("year");
  if (yearSpan) {
    yearSpan.textContent = new Date().getFullYear();
  }
});


// ===============================
// DOT ALIGNMENT FIX (KEY CHANGE)
// ===============================
window.addEventListener("load", () => {
  const dotContainer = document.querySelector(".dots");
  if (dotContainer) {
    dotContainer.style.display = "flex";
    dotContainer.style.justifyContent = "center";
    dotContainer.style.alignItems = "center";
    dotContainer.style.gap = "8px";
    dotContainer.style.marginTop = "15px";
    dotContainer.style.position = "relative";
    dotContainer.style.bottom = "0"; // ensures dots stay below slider
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
  dropdownToggles.forEach(toggle => {
    toggle.addEventListener('click', e => {
      const parent = toggle.parentElement;
      const icon = toggle.querySelector('.dropdown-icon');
      e.preventDefault();
      const isOpen = parent.classList.toggle('open');
      if (icon) icon.classList.toggle('rotate', isOpen);
      e.stopPropagation();
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




// === DEMO REQUEST MODAL ===
const modal = document.getElementById("demoModal");
const modalBox = modal.querySelector(".modal-box");
const modalClose = document.getElementById("modalClose");
const modalBackdrop = document.getElementById("modalBackdrop");
const modalCancel = document.getElementById("modalCancel");
const demoForm = document.getElementById("demoForm");

const demoButtons = document.querySelectorAll("#requestDemoBtn, #requestDemoBtnBottom");

demoButtons.forEach(btn => {
  if (btn) {
    btn.addEventListener("click", (e) => {
      e.preventDefault();
      modal.classList.add("open");
      document.body.style.overflow = "hidden";
    });
  }
});

function closeModal() {
  modal.classList.remove("open");
  document.body.style.overflow = "";
}

// Close only when clicking backdrop itself, not inside box
modal.addEventListener("click", (e) => {
  if (e.target === modal || e.target === modalBackdrop) {
    closeModal();
  }
});

[modalClose, modalCancel].forEach(el => {
  el.addEventListener("click", closeModal);
});

// Handle form submit
demoForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const email = document.getElementById("demoEmail").value.trim();

  if (!email) {
    alert("⚠️ Please enter your email before sending!");
    return;
  }

  alert("✅ Thank you! Your demo request has been submitted.");
  demoForm.reset();
  closeModal();
});
