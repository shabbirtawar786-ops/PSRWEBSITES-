// our porducts chekbox
const products = {
  exam: {
    name: "Exam Tracking",
    features: [
      { name: "Tracks marks of exams of students", basic: true, standard: true, premium: true },
      { name: "Auto grade calculation", basic: false, standard: true, premium: true },
      { name: "Generate performance report", basic: false, standard: true, premium: true },
      { name: "Parent notification system", basic: true, standard: false, premium: true },
    ],
  },
  fee: {
    name: "Fee Tracking",
    features: [
      { name: "Track paid and unpaid fees", basic: true, standard: true, premium: true },
      { name: "Automated fee reminders", basic: false, standard: true, premium: true },
      { name: "Custom reports", basic: false, standard: false, premium: true },
      { name: "Multi-user access", basic: false, standard: true, premium: true },
    ],
  },
  library: {
    name: "Library",
    features: [
      { name: "Book issue & return tracking", basic: true, standard: true, premium: true },
      { name: "Late fine automation", basic: false, standard: true, premium: true },
      { name: "Student borrowing history", basic: false, standard: true, premium: true },
      { name: "E-book integration", basic: false, standard: false, premium: true },
    ],
  },
  paysoft: {
    name: "Paysoft",
    features: [
      { name: "Salary management", basic: true, standard: true, premium: true },
      { name: "Tax & deduction tracking", basic: false, standard: true, premium: true },
      { name: "Bank transfer integration", basic: false, standard: false, premium: true },
      { name: "Employee attendance sync", basic: false, standard: true, premium: true },
    ],
  },
  contax: {
    name: "Contax",
    features: [
      { name: "Contact management", basic: true, standard: true, premium: true },
      { name: "Email integration", basic: false, standard: true, premium: true },
      { name: "Advanced analytics", basic: false, standard: false, premium: true },
    ],
  },
  levsoft: {
    name: "Levsoft",
    features: [
      { name: "Leave application tracking", basic: true, standard: true, premium: true },
      { name: "Auto approval system", basic: false, standard: true, premium: true },
      { name: "Calendar integration", basic: false, standard: true, premium: true },
      { name: "Advanced report export", basic: false, standard: false, premium: true },
    ],
  },
  stusoft: {
    name: "Stusoft",
    features: [
      { name: "Student info database", basic: true, standard: true, premium: true },
      { name: "Parent login portal", basic: false, standard: true, premium: true },
      { name: "Performance analytics", basic: false, standard: false, premium: true },
      { name: "AI-based insights", basic: false, standard: false, premium: true },
    ],
  },
};

function showProduct(key) {
  const container = document.getElementById("pricing-table-container");
  const product = products[key];

  let table = `
    <div class="table-wrapper">
      <h2>${product.name}</h2>
      <table>
        <thead>
          <tr>
            <th>Features</th>
            <th>Basic</th>
            <th>Standard</th>
            <th>Premium</th>
          </tr>
        </thead>
        <tbody>
  `;

  product.features.forEach((f) => {
    table += `
      <tr>
        <td>${f.name}</td>
        <td>${f.basic ? "✓" : "–"}</td>
        <td>${f.standard ? "✓" : "–"}</td>
        <td>${f.premium ? "✓" : "–"}</td>
      </tr>
    `;
  });

  table += `
        </tbody>
      </table>
    </div>
  `;

  container.innerHTML = table;
}

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
