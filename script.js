/**
 * Mahasakti Dental Clinic by Dr. Jyoti
 * Client Interactivity & Form Processing Script
 */

document.addEventListener('DOMContentLoaded', () => {
  // ==========================================
  // 1. STICKY HEADER SCROLL TRANSITION
  // ==========================================
  const header = document.getElementById('main-header');
  const scrollThreshold = 40;

  function handleHeaderScroll() {
    if (window.scrollY > scrollThreshold) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  }

  handleHeaderScroll();
  window.addEventListener('scroll', handleHeaderScroll);

  // ==========================================
  // 2. MOBILE MENU DRAWER TOGGLE
  // ==========================================
  const menuToggle = document.getElementById('menu-toggle');
  const mobileNav = document.getElementById('mobile-nav');
  const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');

  menuToggle.addEventListener('click', () => {
    menuToggle.classList.toggle('active');
    mobileNav.classList.toggle('open');
    
    if (mobileNav.classList.contains('open')) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
  });

  mobileNavLinks.forEach(link => {
    link.addEventListener('click', () => {
      menuToggle.classList.remove('active');
      mobileNav.classList.remove('open');
      document.body.style.overflow = '';
    });
  });

  // ==========================================
  // 3. SCROLL-ACTIVE NAVIGATION HIGHLIGHT
  // ==========================================
  const sections = document.querySelectorAll('section[id]');
  const desktopNavLinks = document.querySelectorAll('#desktop-nav .nav-link');

  function scrollActiveSpy() {
    const scrollY = window.pageYOffset;
    const headerHeight = 90;

    sections.forEach(current => {
      const sectionHeight = current.offsetHeight;
      const sectionTop = current.offsetTop - headerHeight;
      const sectionId = current.getAttribute('id');
      
      if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
        desktopNavLinks.forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href') === `#${sectionId}`) {
            link.classList.add('active');
          }
        });
      }
    });
  }

  window.addEventListener('scroll', scrollActiveSpy);
  scrollActiveSpy();

  // ==========================================
  // 4. FAQ ACCORDION TRANSITIONS
  // ==========================================
  const faqQuestions = document.querySelectorAll('.faq-question');

  faqQuestions.forEach(question => {
    question.addEventListener('click', () => {
      const faqItem = question.parentElement;
      const faqAnswer = faqItem.querySelector('.faq-answer');
      const isActive = faqItem.classList.contains('active');

      document.querySelectorAll('.faq-item').forEach(item => {
        item.classList.remove('active');
        item.querySelector('.faq-answer').style.maxHeight = null;
      });

      if (!isActive) {
        faqItem.classList.add('active');
        faqAnswer.style.maxHeight = faqAnswer.scrollHeight + 'px';
      }
    });
  });

  // ==========================================
  // 5. SMILE GALLERY BEFORE/AFTER TAB FILTER
  // ==========================================
  const galleryTabBtns = document.querySelectorAll('.gallery-tab-btn');
  const comparisonDisplays = document.querySelectorAll('.comparison-display');

  galleryTabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      galleryTabBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const targetGallery = btn.getAttribute('data-gallery');
      comparisonDisplays.forEach(display => {
        display.classList.remove('active');
        if (display.getAttribute('id') === `gallery-${targetGallery}`) {
          display.classList.add('active');
        }
      });
    });
  });

  // ==========================================
  // 6. BOOKING CONSULTATION MODAL ACTIONS
  // ==========================================
  const bookingModal = document.getElementById('booking-modal');
  const closeModalBtn = document.getElementById('close-modal');
  const openModalBtns = document.querySelectorAll('.open-modal-btn');
  const modalTreatmentSelect = document.getElementById('modal-treatment');
  const bookingForm = document.getElementById('booking-form');

  function closeModal() {
    bookingModal.classList.remove('open');
    document.body.style.overflow = '';
  }

  openModalBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      bookingModal.classList.add('open');
      document.body.style.overflow = 'hidden';

      const selectedTreatment = btn.getAttribute('data-treatment');
      if (selectedTreatment) {
        for (let i = 0; i < modalTreatmentSelect.options.length; i++) {
          if (modalTreatmentSelect.options[i].value === selectedTreatment) {
            modalTreatmentSelect.selectedIndex = i;
            break;
          }
        }
      }
    });
  });

  closeModalBtn.addEventListener('click', closeModal);

  bookingModal.addEventListener('click', (e) => {
    if (e.target === bookingModal) {
      closeModal();
    }
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && bookingModal.classList.contains('open')) {
      closeModal();
    }
  });

  // ==========================================
  // 7. FORM SUBMISSION VALIDATION & WHATSAPP REDIRECT
  // ==========================================
  bookingForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const nameInput = document.getElementById('modal-name');
    const phoneInput = document.getElementById('modal-phone');
    const emailInput = document.getElementById('modal-email');
    const treatmentSelect = document.getElementById('modal-treatment');
    const dateInput = document.getElementById('modal-date');
    const notesInput = document.getElementById('modal-notes');

    const nameVal = nameInput.value.trim();
    const phoneVal = phoneInput.value.trim();
    const emailVal = emailInput.value.trim();
    const treatmentVal = treatmentSelect.value;
    const dateVal = dateInput.value;
    const notesVal = notesInput.value.trim();

    if (!nameVal) {
      alert('Please enter the patient\'s name.');
      nameInput.focus();
      return;
    }

    const cleanedPhone = phoneVal.replace(/\D/g, '');
    const phoneRegex = /^[6-9]\d{9}$/;
    if (!phoneRegex.test(cleanedPhone)) {
      alert('Please enter a valid 10-digit mobile number starting with 6, 7, 8, or 9.');
      phoneInput.focus();
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(emailVal)) {
      alert('Please enter a valid email address.');
      emailInput.focus();
      return;
    }

    if (!treatmentVal) {
      alert('Please select the treatment needed.');
      treatmentSelect.focus();
      return;
    }

    if (!dateVal) {
      alert('Please choose a preferred date and time for the consultation.');
      dateInput.focus();
      return;
    }

    const dateObj = new Date(dateVal);
    const formattedDate = dateObj.toLocaleDateString('en-IN', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    }) + ' at ' + dateObj.toLocaleTimeString('en-IN', {
      hour: '2-digit',
      minute: '2-digit'
    });

    const clinicWhatsAppNumber = '919891215607'; // Dr. Jyoti's WhatsApp number with country code
    
    let message = `*Mahasakti Dental Clinic - Appointment Inquiry*\n`;
    message += `----------------------------------------\n`;
    message += `*Patient Name:* ${nameVal}\n`;
    message += `*Contact Phone:* ${cleanedPhone}\n`;
    message += `*Email Address:* ${emailVal}\n`;
    message += `*Treatment Needed:* ${treatmentVal}\n`;
    message += `*Preferred Date:* ${formattedDate}\n`;
    if (notesVal) {
      message += `*Patient Notes:* ${notesVal}\n`;
    } else {
      message += `*Patient Notes:* None provided.\n`;
    }
    message += `----------------------------------------\n`;
    message += `Please confirm if this slot is available. Thank you!`;

    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://api.whatsapp.com/send?phone=${clinicWhatsAppNumber}&text=${encodedMessage}`;

    window.open(whatsappUrl, '_blank');

    closeModal();
    bookingForm.reset();
  });
});
