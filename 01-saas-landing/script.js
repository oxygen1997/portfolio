// ===== Sticky header shadow on scroll =====
const header = document.getElementById('header');
const onScroll = () => {
  header.classList.toggle('is-scrolled', window.scrollY > 8);
};
window.addEventListener('scroll', onScroll, { passive: true });
onScroll();

// ===== Mobile menu =====
const burger = document.getElementById('burger');
const nav = document.getElementById('nav');

burger.addEventListener('click', () => {
  const open = nav.classList.toggle('is-open');
  burger.classList.toggle('is-open', open);
  burger.setAttribute('aria-expanded', String(open));
});

// Close mobile menu when a link is clicked
nav.querySelectorAll('.nav__link').forEach((link) => {
  link.addEventListener('click', () => {
    nav.classList.remove('is-open');
    burger.classList.remove('is-open');
    burger.setAttribute('aria-expanded', 'false');
  });
});

// ===== Reveal on scroll =====
const revealEls = document.querySelectorAll('[data-reveal]');

if ('IntersectionObserver' in window) {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
  );
  revealEls.forEach((el) => observer.observe(el));
} else {
  // Fallback: show everything
  revealEls.forEach((el) => el.classList.add('is-visible'));
}

// ===== FAQ: keep only one open at a time =====
const faqItems = document.querySelectorAll('.faq__item');
faqItems.forEach((item) => {
  item.addEventListener('toggle', () => {
    if (item.open) {
      faqItems.forEach((other) => {
        if (other !== item) other.open = false;
      });
    }
  });
});

// ===== Update footer year automatically =====
const yearTarget = document.querySelector('.footer__bottom span');
if (yearTarget) {
  yearTarget.textContent = yearTarget.textContent.replace('2026', new Date().getFullYear());
}
