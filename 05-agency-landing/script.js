// Бургер-меню
const burger = document.getElementById('burger');
const nav = document.getElementById('nav');
burger.addEventListener('click', () => nav.classList.toggle('is-open'));
nav.querySelectorAll('a').forEach((a) =>
  a.addEventListener('click', () => nav.classList.remove('is-open'))
);

// Появление блоков при скролле
const io = new IntersectionObserver(
  (entries) => {
    entries.forEach((e) => {
      if (e.isIntersecting) {
        e.target.classList.add('is-visible');
        io.unobserve(e.target);
      }
    });
  },
  { threshold: 0.12 }
);
document.querySelectorAll('[data-reveal]').forEach((el) => io.observe(el));

// Отправка формы заявки (демо)
const form = document.getElementById('form');
const note = document.getElementById('formNote');
form.addEventListener('submit', (e) => {
  e.preventDefault();
  form.reset();
  note.hidden = false;
});

// Текущий год
document.getElementById('year').textContent = new Date().getFullYear();
