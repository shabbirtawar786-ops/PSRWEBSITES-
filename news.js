document.addEventListener("DOMContentLoaded", async () => {
  const container = document.getElementById("trending-container");

  try {
    // Use your chosen RSS feed URL:
    const rssUrl = "https://timesofindia.indiatimes.com/rssfeeds/-2128936835.cms";  // example TOI feed
    const response = await fetch(`https://api.allorigins.win/raw?url=${encodeURIComponent(rssUrl)}`);
    const text  = await response.text();
    const parser = new DOMParser();
    const xml   = parser.parseFromString(text, "application/xml");
    const items = xml.querySelectorAll("item");

    if (items.length) {
      const headlines = Array.from(items).slice(0, 5).map(item => {
        return item.querySelector("title").textContent.trim();
      });
      container.innerHTML = `<p>${headlines.join(" • ")}</p>`;
    } else {
      container.innerHTML = "<p>No trending headlines right now.</p>";
    }
  } catch (err) {
    console.error("Error loading RSS feed:", err);
    container.innerHTML = "<p>Unable to load trending news.</p>";
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
