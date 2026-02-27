/* ============================================
   LUXE RENTALS — JavaScript
   Animations, Interactions, Filters, Calendar
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {

  // ===== SCROLL REVEAL =====
  const revealElements = document.querySelectorAll('.reveal');
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

  revealElements.forEach(el => revealObserver.observe(el));

  // ===== NAVBAR SCROLL =====
  const navbar = document.getElementById('navbar');
  let lastScroll = 0;

  window.addEventListener('scroll', () => {
    const currentScroll = window.scrollY;
    if (currentScroll > 60) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
    lastScroll = currentScroll;
  });

  // ===== MOBILE MENU =====
  const menuToggle = document.getElementById('menuToggle');
  const navLinks = document.getElementById('navLinks');

  if (menuToggle) {
    menuToggle.addEventListener('click', () => {
      navLinks.classList.toggle('open');
      menuToggle.classList.toggle('active');
    });

    // Close on link click
    navLinks.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        navLinks.classList.remove('open');
        menuToggle.classList.remove('active');
      });
    });
  }

  // ===== BACK TO TOP =====
  const backToTop = document.getElementById('backToTop');
  if (backToTop) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 500) {
        backToTop.classList.add('visible');
      } else {
        backToTop.classList.remove('visible');
      }
    });

    backToTop.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  // ===== PRODUCT FILTERS =====
  const filterBtns = document.querySelectorAll('.filter-btn');
  const productCards = document.querySelectorAll('.product-card');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      // Update active state
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.dataset.filter;

      productCards.forEach(card => {
        if (filter === 'all' || card.dataset.category === filter) {
          card.style.display = '';
          card.style.animation = 'fadeInUp 0.5s var(--ease-premium) forwards';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });

  // ===== CALENDAR (Product Detail Page) =====
  const calendarDays = document.getElementById('calendarDays');
  const calendarMonth = document.getElementById('calendarMonth');

  if (calendarDays) {
    let currentDate = new Date(2026, 2, 1); // March 2026

    const monthNames = [
      'January', 'February', 'March', 'April', 'May', 'June',
      'July', 'August', 'September', 'October', 'November', 'December'
    ];

    const dayLabels = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];

    // Unavailable dates (random for demo)
    const unavailableDates = [3, 4, 5, 12, 13, 19, 20, 26, 27];

    function renderCalendar() {
      calendarDays.innerHTML = '';

      const year = currentDate.getFullYear();
      const month = currentDate.getMonth();

      calendarMonth.textContent = `${monthNames[month]} ${year}`;

      // Day labels
      dayLabels.forEach(day => {
        const label = document.createElement('span');
        label.className = 'day-label';
        label.textContent = day;
        calendarDays.appendChild(label);
      });

      // First day of month
      const firstDay = new Date(year, month, 1).getDay();
      const daysInMonth = new Date(year, month + 1, 0).getDate();

      // Empty cells
      for (let i = 0; i < firstDay; i++) {
        const empty = document.createElement('span');
        empty.className = 'day empty';
        calendarDays.appendChild(empty);
      }

      // Day cells
      for (let d = 1; d <= daysInMonth; d++) {
        const dayEl = document.createElement('span');
        dayEl.className = 'day';
        dayEl.textContent = d;

        if (unavailableDates.includes(d)) {
          dayEl.classList.add('unavailable');
        } else {
          dayEl.addEventListener('click', function () {
            document.querySelectorAll('.calendar-days .day.selected').forEach(s => s.classList.remove('selected'));
            this.classList.add('selected');
          });
        }

        calendarDays.appendChild(dayEl);
      }
    }

    window.changeMonth = function (dir) {
      currentDate.setMonth(currentDate.getMonth() + dir);
      renderCalendar();
    };

    renderCalendar();
  }

  // ===== SMOOTH SCROLL for anchor links =====
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        e.preventDefault();
        const offset = 80;
        const targetPos = target.getBoundingClientRect().top + window.scrollY - offset;
        window.scrollTo({ top: targetPos, behavior: 'smooth' });
      }
    });
  });

  // ===== PARALLAX SUBTLE EFFECT on hero =====
  const heroBg = document.querySelector('.hero-bg');
  if (heroBg) {
    window.addEventListener('scroll', () => {
      const scroll = window.scrollY;
      heroBg.style.transform = `translateY(${scroll * 0.3}px)`;
    });
  }

});

// ===== PRODUCT DETAIL PAGE FUNCTIONS =====

// Image gallery
function changeImage(thumb) {
  const mainImage = document.getElementById('mainImage');
  if (mainImage && thumb) {
    mainImage.style.opacity = '0';
    mainImage.style.transform = 'scale(0.98)';
    setTimeout(() => {
      mainImage.src = thumb.src;
      mainImage.alt = thumb.alt;
      mainImage.style.opacity = '1';
      mainImage.style.transform = 'scale(1)';
    }, 250);

    document.querySelectorAll('.thumb').forEach(t => t.classList.remove('active'));
    thumb.classList.add('active');
  }
}

// Duration selector
function selectDuration(el) {
  document.querySelectorAll('.duration-option').forEach(opt => opt.classList.remove('selected'));
  el.classList.add('selected');

  const price = el.querySelector('.dur-price').textContent;
  const reserveBtn = document.querySelector('.btn-reserve');
  if (reserveBtn) {
    reserveBtn.textContent = `Reserve Now — ${price}`;
  }
}

// Wishlist toggle
function toggleWishlist(btn) {
  btn.classList.toggle('wishlisted');
  if (btn.classList.contains('wishlisted')) {
    btn.innerHTML = '♥';
    btn.style.color = '#8B0000';
    btn.style.borderColor = '#8B0000';
    btn.style.background = 'rgba(139,0,0,0.15)';
  } else {
    btn.innerHTML = '♡';
    btn.style.color = '';
    btn.style.borderColor = '';
    btn.style.background = '';
  }
}

// Reserve button
function handleReserve() {
  const btn = document.querySelector('.btn-reserve');
  if (btn) {
    const original = btn.textContent;
    btn.textContent = '✓ Reserved Successfully!';
    btn.style.background = 'linear-gradient(135deg, #2E7D32, #4CAF50)';
    btn.style.boxShadow = '0 0 30px rgba(76,175,80,0.3)';

    setTimeout(() => {
      btn.textContent = original;
      btn.style.background = '';
      btn.style.boxShadow = '';
    }, 2500);
  }
}

// FAQ Accordion toggle
function toggleFaq(btn) {
  const item = btn.closest('.faq-item');
  const isOpen = item.classList.contains('open');

  // Close all
  document.querySelectorAll('.faq-item.open').forEach(i => i.classList.remove('open'));

  // Open clicked if it was closed
  if (!isOpen) {
    item.classList.add('open');
  }
}

