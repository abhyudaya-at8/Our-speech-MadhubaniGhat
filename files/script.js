/* =========================================
   Speech Event Website — JavaScript
   Handles: animations, interactivity
   ========================================= */

document.addEventListener('DOMContentLoaded', function () {

  // ===== ENTRANCE ANIMATIONS =====
  // Add fade-in animation to cards on page load
  const animateIn = (selector, delay = 0) => {
    const elements = document.querySelectorAll(selector);
    elements.forEach((el, i) => {
      el.style.opacity = '0';
      el.style.transform = 'translateY(20px)';
      el.style.transition = `opacity 0.4s ease ${delay + i * 0.1}s, transform 0.4s ease ${delay + i * 0.1}s`;

      // Trigger after a tiny delay so transition works
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          el.style.opacity = '1';
          el.style.transform = 'translateY(0)';
        });
      });
    });
  };

  // Animate speaker card and action cards on index page
  animateIn('.speaker-card', 0.1);
  animateIn('.action-card', 0.2);
  animateIn('.takeaway-card', 0.15);
  animateIn('.proposal-item', 0.1);
  animateIn('.summary-theme', 0.1);

  // ===== CLICK RIPPLE EFFECT ON ACTION CARDS =====
  const actionCards = document.querySelectorAll('.action-card');

  actionCards.forEach(card => {
    card.addEventListener('click', function (e) {
      // Visual feedback flash
      this.style.transform = 'scale(0.98)';
      setTimeout(() => {
        this.style.transform = '';
      }, 150);
    });
  });

  // ===== HIGHLIGHT ACTIVE NAV (for summary page back button) =====
  const backBtn = document.querySelector('.back-btn');
  if (backBtn) {
    backBtn.addEventListener('mouseenter', function () {
      this.style.color = 'white';
    });
  }

  // ===== TOAST NOTIFICATION on Email click =====
  const emailCard = document.querySelector('.action-email');
  if (emailCard) {
    emailCard.addEventListener('click', function () {
      showToast('Email app खुल रहा है... ✉️');
    });
  }

  // ===== TOAST NOTIFICATION on Form click =====
  const formCard = document.querySelector('.action-form');
  if (formCard) {
    formCard.addEventListener('click', function () {
      showToast('Google Form खुल रहा है... 📝');
    });
  }

  // ===== TOAST FUNCTION =====
  function showToast(message) {
    // Remove existing toast if any
    const existing = document.querySelector('.toast-msg');
    if (existing) existing.remove();

    const toast = document.createElement('div');
    toast.className = 'toast-msg';
    toast.textContent = message;

    // Inline styles so no extra CSS needed
    Object.assign(toast.style, {
      position: 'fixed',
      bottom: '2rem',
      left: '50%',
      transform: 'translateX(-50%) translateY(20px)',
      background: '#1a1a1a',
      color: 'white',
      padding: '0.65rem 1.5rem',
      borderRadius: '999px',
      fontSize: '0.9rem',
      fontFamily: "'Noto Sans Devanagari', sans-serif",
      zIndex: '9999',
      opacity: '0',
      transition: 'all 0.3s ease',
      whiteSpace: 'nowrap',
      boxShadow: '0 4px 16px rgba(0,0,0,0.2)'
    });

    document.body.appendChild(toast);

    // Animate in
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        toast.style.opacity = '1';
        toast.style.transform = 'translateX(-50%) translateY(0)';
      });
    });

    // Auto remove after 3 seconds
    setTimeout(() => {
      toast.style.opacity = '0';
      toast.style.transform = 'translateX(-50%) translateY(20px)';
      setTimeout(() => toast.remove(), 400);
    }, 3000);
  }

}); // End DOMContentLoaded
