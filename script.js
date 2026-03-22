/* script.js – Portfolio interactivity */

// ── Navbar scroll behavior ──────────────────────────────────
const navbar = document.getElementById('navbar');

window.addEventListener('scroll', () => {
  if (window.scrollY > 50) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
  highlightActiveNav();
});

// ── Hamburger menu ───────────────────────────────────────────
const hamburger = document.getElementById('hamburger');
const navLinks  = document.getElementById('nav-links');

hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('open');
  navLinks.classList.toggle('open');
});

// Close menu when a link is clicked
navLinks.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    hamburger.classList.remove('open');
    navLinks.classList.remove('open');
  });
});

// ── Active nav link on scroll ────────────────────────────────
function highlightActiveNav() {
  const sections = document.querySelectorAll('section[id]');
  const scrollPos = window.scrollY + 120;

  sections.forEach(section => {
    const top    = section.offsetTop;
    const bottom = top + section.offsetHeight;
    const id     = section.getAttribute('id');
    const link   = document.querySelector(`.nav-links a[href="#${id}"]`);

    if (link) {
      if (scrollPos >= top && scrollPos < bottom) {
        link.classList.add('active');
      } else {
        link.classList.remove('active');
      }
    }
  });
}

// ── Typed text animation ─────────────────────────────────────
const phrases = [
  'Hardware Engineer',
  'AI/ML Enthusiast',
  'Python Developer',
  'FPGA Designer',
];

let phraseIndex  = 0;
let charIndex    = 0;
let isDeleting   = false;
const typedEl    = document.getElementById('typed-text');
const typeSpeed  = 80;
const deleteSpeed = 50;
const pauseTime  = 1800;

function typeEffect() {
  const currentPhrase = phrases[phraseIndex];

  if (isDeleting) {
    typedEl.textContent = currentPhrase.substring(0, charIndex - 1);
    charIndex--;
  } else {
    typedEl.textContent = currentPhrase.substring(0, charIndex + 1);
    charIndex++;
  }

  let delay = isDeleting ? deleteSpeed : typeSpeed;

  if (!isDeleting && charIndex === currentPhrase.length) {
    delay = pauseTime;
    isDeleting = true;
  } else if (isDeleting && charIndex === 0) {
    isDeleting = false;
    phraseIndex = (phraseIndex + 1) % phrases.length;
    delay = 400;
  }

  setTimeout(typeEffect, delay);
}

typeEffect();

// ── Skill bar animation on scroll ───────────────────────────
const skillFills = document.querySelectorAll('.skill-fill');

const skillObserver = new IntersectionObserver(
  entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el    = entry.target;
        const width = el.getAttribute('data-width');
        el.style.width = width + '%';
        skillObserver.unobserve(el);
      }
    });
  },
  { threshold: 0.3 }
);

skillFills.forEach(fill => skillObserver.observe(fill));

// ── Timeline card entrance animation ────────────────────────
const timelineItems = document.querySelectorAll('.timeline-item');

const timelineObserver = new IntersectionObserver(
  entries => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        entry.target.style.animationDelay = `${i * 0.1}s`;
        entry.target.style.animationPlayState = 'running';
        timelineObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.15 }
);

timelineItems.forEach(item => {
  item.style.animationPlayState = 'paused';
  timelineObserver.observe(item);
});

// ── Contact form (client-side demo) ─────────────────────────
const contactForm = document.getElementById('contact-form');
const formNote    = document.getElementById('form-note');

contactForm.addEventListener('submit', e => {
  e.preventDefault();

  const name    = contactForm.name.value.trim();
  const email   = contactForm.email.value.trim();
  const message = contactForm.message.value.trim();

  if (!name || !email || !message) {
    formNote.style.color = '#ff6584';
    formNote.textContent = 'Please fill in all fields.';
    return;
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    formNote.style.color = '#ff6584';
    formNote.textContent = 'Please enter a valid email address.';
    return;
  }

  // Simulate sending
  formNote.style.color = '#6c63ff';
  formNote.textContent = 'Sending…';

  setTimeout(() => {
    formNote.style.color = '#4caf50';
    formNote.textContent = `Thanks, ${name}! Your message has been sent.`;
    contactForm.reset();
  }, 1000);
});
