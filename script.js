document.addEventListener('DOMContentLoaded', () => {

  /* ==========================================
     1. URGENCY COUNTDOWN TIMER
     ========================================== */
  const startCountdown = () => {
    const hoursVal = document.getElementById('hours');
    const minutesVal = document.getElementById('minutes');
    const secondsVal = document.getElementById('seconds');

    if (!hoursVal || !minutesVal || !secondsVal) return;

    // Use a relative countdown of 2 hours, 14 minutes, 35 seconds
    // to simulate real-time urgency for each visitor
    let totalSeconds = (2 * 60 * 60) + (14 * 60) + 35;

    const updateTimer = () => {
      if (totalSeconds <= 0) {
        // Reset or stop
        totalSeconds = (2 * 60 * 60) + (14 * 60) + 35; // loop for demo safety
      }

      const hrs = Math.floor(totalSeconds / 3600);
      const mins = Math.floor((totalSeconds % 3600) / 60);
      const secs = totalSeconds % 60;

      hoursVal.textContent = String(hrs).padStart(2, '0');
      minutesVal.textContent = String(mins).padStart(2, '0');
      secondsVal.textContent = String(secs).padStart(2, '0');

      totalSeconds--;
    };

    updateTimer();
    setInterval(updateTimer, 1000);
  };
  startCountdown();


  /* ==========================================
     2. PREVIEW CAROUSEL
     ========================================== */
  // Preview carousel is now managed infinitely and seamlessly using CSS animation marquee


  /* ==========================================
     3. FAQ ACCORDION
     ========================================== */
  const initFAQ = () => {
    const faqItems = document.querySelectorAll('.faq-item');

    faqItems.forEach(item => {
      const trigger = item.querySelector('.faq-trigger');
      const content = item.querySelector('.faq-content');

      if (!trigger || !content) return;

      trigger.addEventListener('click', () => {
        const isActive = item.classList.contains('active');

        // Close all other items first
        faqItems.forEach(otherItem => {
          otherItem.classList.remove('active');
          const otherContent = otherItem.querySelector('.faq-content');
          if (otherContent) otherContent.style.maxHeight = null;
        });

        // Toggle current item
        if (!isActive) {
          item.classList.add('active');
          content.style.maxHeight = content.scrollHeight + 'px';
        } else {
          item.classList.remove('active');
          content.style.maxHeight = null;
        }
      });
    });
  };
  initFAQ();


  /* ==========================================
     4. CHECKOUT CONTROLS & TABS
     ========================================== */
  const initCheckout = () => {
    const tabBtns = document.querySelectorAll('.checkout-tab-btn');
    const pixDetails = document.querySelector('.pix-details');
    const cardDetails = document.querySelector('.card-details');
    const checkoutForm = document.getElementById('checkout-form');
    const pixCopyBtn = document.getElementById('pix-copy-btn');
    const pixInput = document.getElementById('pix-code-input');
    const toast = document.getElementById('success-toast');

    let currentPaymentMethod = 'pix'; // default

    if (tabBtns.length === 0) return;

    tabBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        tabBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        const method = btn.getAttribute('data-method');
        currentPaymentMethod = method;

        if (method === 'pix') {
          pixDetails.classList.add('active');
          cardDetails.classList.remove('active');
        } else {
          pixDetails.classList.remove('active');
          cardDetails.classList.add('active');
        }
      });
    });

    // Copy Pix code
    if (pixCopyBtn && pixInput) {
      pixCopyBtn.addEventListener('click', () => {
        pixInput.select();
        pixInput.setSelectionRange(0, 99999); // for mobile
        navigator.clipboard.writeText(pixInput.value)
          .then(() => {
            const originalText = pixCopyBtn.textContent;
            pixCopyBtn.textContent = 'Copiado!';
            pixCopyBtn.style.background = '#10b981';
            setTimeout(() => {
              pixCopyBtn.textContent = originalText;
              pixCopyBtn.style.background = '';
            }, 2000);
          })
          .catch(err => {
            console.error('Erro ao copiar código PIX: ', err);
          });
      });
    }

    // Form submission (Demo feedback)
    if (checkoutForm && toast) {
      checkoutForm.addEventListener('submit', (e) => {
        e.preventDefault();

        // Get basic inputs
        const nameInput = document.getElementById('client-name');
        const emailInput = document.getElementById('client-email');

        if (!nameInput.value || !emailInput.value) {
          alert('Por favor, preencha os campos obrigatórios.');
          return;
        }

        // Show toast success message
        toast.classList.add('show');

        // Reset checkout form
        checkoutForm.reset();

        // Hide toast after 5 seconds
        setTimeout(() => {
          toast.classList.remove('show');
        }, 5000);
      });
    }
  };
  initCheckout();

  /* ==========================================
     5. DYNAMIC PROMO END DATE & PURCHASE NOTIFICATIONS
     ========================================== */
  const initUrgencyAndNotifications = () => {
    // A. Urgency End Date Banner
    const dateSpan = document.getElementById('promo-end-date');
    if (dateSpan) {
      const today = new Date();
      
      const day = String(today.getDate()).padStart(2, '0');
      const month = String(today.getMonth() + 1).padStart(2, '0');
      const year = today.getFullYear();
      
      dateSpan.textContent = `${day}/${month}/${year}`;
    }

    // B. Purchase Toast Notifications
    const firstNames = [
      'Mariana', 'Carlos', 'Fernanda', 'Thiago', 'Gabriela', 'Felipe', 'Aline', 
      'Lucas', 'Juliana', 'Rodrigo', 'Camila', 'Bruno', 'Beatriz', 'Gustavo', 
      'Patricia', 'Renato', 'Larissa', 'Diego', 'Amanda', 'Matheus', 'Pedro', 
      'Joao', 'Ana', 'Maria', 'Sofia', 'Julia', 'Gabriel', 'Rafael', 'Daniel', 
      'Marcos', 'Andre', 'Ricardo', 'Vanessa', 'Renata', 'Laura', 'Giovanna', 
      'Isabela', 'Luana', 'Eduardo', 'Leonardo', 'Vinicius'
    ];
    
    const lastInitials = ['A.', 'B.', 'C.', 'D.', 'E.', 'F.', 'G.', 'H.', 'I.', 'J.', 'K.', 'L.', 'M.', 'N.', 'O.', 'P.', 'Q.', 'R.', 'S.', 'T.', 'U.', 'V.', 'W.', 'X.', 'Y.', 'Z.'];
    
    const actions = [
      'garantiu o Kit!',
      'acabou de garantir o Kit!',
      'garantiu o Kit Completo!'
    ];

    const times = [
      'há poucos segundos',
      'há 1 minuto',
      'há 2 minutos',
      'há 42 segundos',
      'há 3 minutos'
    ];

    const toast = document.getElementById('purchase-notification');
    const nameSpan = document.getElementById('toast-name');
    const actionSpan = document.getElementById('toast-action');
    const timeSpan = document.getElementById('toast-time');
    const closeBtn = document.getElementById('toast-close');
    
    if (toast && nameSpan && actionSpan) {
      let toastTimeout;

      const showNotification = () => {
        // Generate random name, pick action and time
        const randomFirstName = firstNames[Math.floor(Math.random() * firstNames.length)];
        const randomLastInitial = lastInitials[Math.floor(Math.random() * lastInitials.length)];
        const randomName = `${randomFirstName} ${randomLastInitial}`;
        
        const randomAction = actions[Math.floor(Math.random() * actions.length)];
        const randomTime = times[Math.floor(Math.random() * times.length)];
        
        nameSpan.textContent = randomName;
        actionSpan.textContent = randomAction;
        if (timeSpan) timeSpan.textContent = randomTime;
        
        toast.classList.add('show');
        
        // Clear any previous auto-close timer
        if (toastTimeout) clearTimeout(toastTimeout);
        
        toastTimeout = setTimeout(() => {
          toast.classList.remove('show');
        }, 5000);
      };
      
      // Show first notification after 4 seconds, then repeat every 30 seconds
      setTimeout(() => {
        showNotification();
        setInterval(showNotification, 30000);
      }, 4000);

      // Close button handler
      if (closeBtn) {
        closeBtn.addEventListener('click', () => {
          if (toastTimeout) clearTimeout(toastTimeout);
          toast.classList.remove('show');
        });
      }
    }
  };
  initUrgencyAndNotifications();
  
  /* ==========================================
     6. CURRICULUM TABS INTERACTION
     ========================================== */
  const initCurriculumTabs = () => {
    const tabBtns = document.querySelectorAll('.curriculum-tab-btn');
    const panes = document.querySelectorAll('.curriculum-pane');
    const placeholder = document.getElementById('curriculum-placeholder');

    if (tabBtns.length === 0) return;

    tabBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        const targetLevel = btn.getAttribute('data-level');
        const targetPane = document.getElementById(`pane-${targetLevel}`);
        const isActive = btn.classList.contains('active');

        // Reset all buttons and panes first
        tabBtns.forEach(b => b.classList.remove('active'));
        panes.forEach(p => p.classList.remove('active'));

        if (isActive) {
          // If clicked the already active button, collapse it and show placeholder
          if (placeholder) {
            placeholder.classList.remove('hidden');
          }
        } else {
          // If clicked a new button, activate it and hide placeholder
          btn.classList.add('active');
          if (targetPane) {
            targetPane.classList.add('active');
          }
          if (placeholder) {
            placeholder.classList.add('hidden');
          }
        }
      });
    });
  };
  initCurriculumTabs();

  /* ==========================================
     7. DRAGGABLE INFINITE MARQUEE
     ========================================== */
  const initDraggableMarquees = () => {
    const makeDraggableMarquee = (carouselSelector, trackSelector, durationSeconds) => {
      const carousel = document.querySelector(carouselSelector);
      if (!carousel) return;
      const track = carousel.querySelector(trackSelector);
      if (!track) return;

      // Disable default CSS animations
      track.style.animation = 'none';

      let currentTranslateX = 0;
      let isDragging = false;
      let startX = 0;
      let prevTranslateX = 0;
      let animationId = null;

      const getGroupWidth = () => {
        const groups = track.querySelectorAll('.carousel-group, .testimonials-group');
        if (groups.length > 0) {
          return groups[0].offsetWidth;
        }
        return track.offsetWidth / 2;
      };

      // Base speed per frame at 60fps
      const getSpeed = () => {
        return getGroupWidth() / (durationSeconds * 60);
      };

      let lastTime = performance.now();

      const update = (now) => {
        const deltaTime = now - lastTime;
        lastTime = now;

        // Scale by delta time to keep speed consistent on 60Hz, 120Hz, etc.
        const timeScale = isNaN(deltaTime) ? 1 : deltaTime / 16.67;
        const speed = getSpeed();

        if (!isDragging) {
          currentTranslateX -= speed * timeScale;

          const limit = getGroupWidth();
          // Wrap around seamlessly
          if (Math.abs(currentTranslateX) >= limit) {
            currentTranslateX += limit;
          }

          track.style.transform = `translate3d(${currentTranslateX}px, 0, 0)`;
        }
        animationId = requestAnimationFrame(update);
      };

      // Start looping
      animationId = requestAnimationFrame(update);

      // Handle drag prevention on images
      track.querySelectorAll('img').forEach(img => {
        img.addEventListener('dragstart', (e) => e.preventDefault());
      });

      const onDragStart = (e) => {
        isDragging = true;
        startX = e.type.includes('touch') ? e.touches[0].clientX : e.clientX;
        prevTranslateX = currentTranslateX;
        carousel.classList.add('grabbing');
      };

      const onDragMove = (e) => {
        if (!isDragging) return;
        const currentX = e.type.includes('touch') ? e.touches[0].clientX : e.clientX;
        const dx = currentX - startX;

        currentTranslateX = prevTranslateX + dx;

        const limit = getGroupWidth();
        // Seamless wrap around while dragging
        if (currentTranslateX > 0) {
          currentTranslateX -= limit;
        } else if (Math.abs(currentTranslateX) >= limit) {
          currentTranslateX += limit;
        }

        track.style.transform = `translate3d(${currentTranslateX}px, 0, 0)`;
      };

      const onDragEnd = () => {
        if (!isDragging) return;
        isDragging = false;
        carousel.classList.remove('grabbing');
      };

      // Event Listeners
      track.addEventListener('mousedown', onDragStart);
      window.addEventListener('mousemove', onDragMove);
      window.addEventListener('mouseup', onDragEnd);

      track.addEventListener('touchstart', onDragStart, { passive: true });
      track.addEventListener('touchmove', onDragMove, { passive: true });
      track.addEventListener('touchend', onDragEnd);
    };

    // Initialize both marquees (previews: 35s, testimonials: 55s)
    makeDraggableMarquee('.preview-carousel', '.carousel-track', 35);
    makeDraggableMarquee('.testimonials-carousel', '.testimonials-track', 55);
  };
  initDraggableMarquees();

  /* ==========================================
     9. SMOOTH SCROLL FOR ANCHOR LINKS
     ========================================== */
  const initSmoothScroll = () => {
    const anchorLinks = document.querySelectorAll('a[href^="#"]');
    anchorLinks.forEach(link => {
      link.addEventListener('click', function(e) {
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
          e.preventDefault();
          
          // Get the height of the sticky promo banner dynamically
          const banner = document.querySelector('.promo-banner');
          const bannerHeight = banner ? banner.offsetHeight : 0;
          
          // Compute final scroll position with dynamic banner height and 16px safety margin
          const elementPosition = targetElement.getBoundingClientRect().top + window.pageYOffset;
          const offsetPosition = elementPosition - bannerHeight - 16;
          
          window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
          });
        }
      });
    });
  };
  initSmoothScroll();

});


