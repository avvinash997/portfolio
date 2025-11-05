// Smooth reveal on scroll using IntersectionObserver + modal + accordion toggles
document.addEventListener('DOMContentLoaded', () => {
  // Reveal on scroll
  const reveals = document.querySelectorAll('.reveal');
  const io = new IntersectionObserver((entries, obs) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('visible');
        obs.unobserve(e.target);
      }
    });
  }, { root:null, rootMargin: '0px 0px -10% 0px', threshold: 0.12 });
  reveals.forEach(r=>io.observe(r));

  // Accordion toggles for experience roles
  document.querySelectorAll('.role-toggle').forEach(btn=>{
    btn.addEventListener('click', ()=>{
      const body = btn.nextElementSibling;
      const isVisible = body.style.maxHeight && body.style.maxHeight !== '0px';
      // collapse others in same company
      const parent = btn.closest('.exp-company');
      parent.querySelectorAll('.role-body').forEach(rb=>{
        rb.style.maxHeight = null;
      });
      if (!isVisible) {
        body.style.maxHeight = body.scrollHeight + 'px';
      } else {
        body.style.maxHeight = null;
      }
    });
  });

  // Initialize role bodies collapsed
  document.querySelectorAll('.role-body').forEach(rb=>{
    rb.style.maxHeight = null;
  });

  // Modal logic
  const openButtons = document.querySelectorAll('[data-modal-open]');
  const closeButtons = document.querySelectorAll('[data-modal-close]');
  openButtons.forEach(btn=>{
    btn.addEventListener('click', ()=> {
      const id = btn.getAttribute('data-modal-open');
      const modal = document.getElementById(id);
      if (modal) {
        modal.setAttribute('aria-hidden','false');
        modal.querySelector('.modal-close').focus();
      }
    });
  });
  closeButtons.forEach(btn=>{
    btn.addEventListener('click', ()=> {
      const modal = btn.closest('.modal');
      if (modal) modal.setAttribute('aria-hidden','true');
    });
  });
  // close on background click
  document.querySelectorAll('.modal').forEach(m=>{
    m.addEventListener('click', (e)=>{
      if (e.target === m) m.setAttribute('aria-hidden','true');
    });
  });
  // escape key closes modals
  document.addEventListener('keydown', (e)=>{
    if (e.key === 'Escape') {
      document.querySelectorAll('.modal').forEach(m=>m.setAttribute('aria-hidden','true'));
    }
  });

  // Smooth anchor click behavior
  document.querySelectorAll('a[href^="#"]').forEach(a=>{
    a.addEventListener('click', (e)=>{
      // normal behavior; CSS scroll-behavior handles smooth scroll
    });
  });
});

// Expandable project cards
document.querySelectorAll(".project-toggle").forEach(btn => {
  btn.addEventListener("click", () => {
    const card = btn.closest(".project-card");
    card.classList.toggle("open");
    btn.textContent = card.classList.contains("open") ? "Hide details" : "More details";
  });
});

// Scroll reveal logic
document.addEventListener('DOMContentLoaded', () => {
  const elems = document.querySelectorAll('.reveal-on-scroll');
  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if(entry.isIntersecting) {
        entry.target.classList.add('visible');
        obs.unobserve(entry.target);
      }
    });
  }, {
    root: null,
    rootMargin: '0px 0px -10% 0px',
    threshold: 0.1
  });
  elems.forEach(el => observer.observe(el));
});

// Strong bidirectional scroll animations
document.addEventListener("DOMContentLoaded", () => {

  const items = document.querySelectorAll(".reveal-left, .reveal-right");

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      const el = entry.target;

      if (entry.isIntersecting) {
        // ENTER viewport
        el.classList.add("reveal-visible");
        el.classList.remove("reveal-hide-left", "reveal-hide-right");
      } else {
        // EXIT viewport (scroll up)
        if (el.classList.contains("reveal-left")) {
          el.classList.add("reveal-hide-left");
        } else {
          el.classList.add("reveal-hide-right");
        }
        el.classList.remove("reveal-visible");
      }
    });
  }, {
    threshold: 0.2
  });

  items.forEach(el => observer.observe(el));
});

// Toggle project details
document.querySelectorAll(".project-card").forEach(card => {
  const btn = card.querySelector(".more-details-btn");
  const details = card.querySelector(".project-details");

  btn.addEventListener("click", () => {
    card.classList.toggle("open");
    if (card.classList.contains("open")) {
      btn.textContent = "Hide Details";
    } else {
      btn.textContent = "More Details";
    }
  });
});
