const currentPath = window.location.pathname.split('/').pop() || 'index.html';

function initializeNavigation() {
  const nav = document.querySelector('.site-nav');
  if (!nav) return;

  const toggle = nav.querySelector('.nav-toggle');
  const links = nav.querySelector('.nav-links');

  toggle?.addEventListener('click', () => {
    links.classList.toggle('open');
    toggle.classList.toggle('open');
  });

  links.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      links.classList.remove('open');
      toggle.classList.remove('open');
    });
  });

  const activeLink = nav.querySelector(`.nav-links a[href="${currentPath}"]`);
  if (activeLink) {
    activeLink.classList.add('active');
  }
}

function setGreeting() {
  const greeting = document.getElementById('greetingText');
  if (!greeting) return;

  const hour = new Date().getHours();
  let salutation = 'Welcome to Amaanah Nexus';
  
  if (hour >= 5 && hour < 12) {
    salutation = 'Good Morning, Welcome to Amaanah Nexus';
  } else if (hour >= 12 && hour < 17) {
    salutation = 'Good Afternoon, Welcome to Amaanah Nexus';
  } else if (hour >= 17 && hour < 22) {
    salutation = 'Good Evening, Welcome to Amaanah Nexus';
  } else {
    salutation = 'Welcome to Amaanah Nexus';
  }
  
  greeting.textContent = salutation;
}

function showVisitorToast(message) {
  const toast = document.getElementById('visitorToast');
  if (!toast) return;

  toast.textContent = message;
  toast.classList.add('show');

  setTimeout(() => {
    toast.classList.remove('show');
  }, 2600);
}

function showPatientPopup(message) {
  const popup = document.getElementById('patientPopup');
  const text = document.getElementById('patientMessage');
  if (!popup || !text) return;

  text.innerText = message;
  popup.classList.add('active');

  setTimeout(() => {
    popup.classList.remove('active');
  }, 2800);
}

function showLoader() {
  const loader = document.getElementById('loader');
  loader?.classList.add('active');
}

function hideLoader() {
  const loader = document.getElementById('loader');
  loader?.classList.remove('active');
}

function playSound(type) {
  const audioSrc = type === 'success'
    ? 'https://assets.mixkit.co/active_storage/sfx/2571/2571-preview.mp3'
    : 'https://assets.mixkit.co/active_storage/sfx/2570/2570-preview.mp3';

  const audio = new Audio(audioSrc);
  audio.volume = 0.35;
  audio.play().catch(() => {});
}

function submitVisitor(event) {
  event.preventDefault();

  const name = document.getElementById('vname')?.value.trim();
  const number = document.getElementById('vnumber')?.value.trim();
  const address = document.getElementById('vaddress')?.value.trim();

  // Enhanced validation
  if (!name) {
    showVisitorToast('Please enter your full name');
    document.getElementById('vname').focus();
    return;
  }

  if (!number || !/^\+?[\d\s\-\(\)]{10,}$/.test(number)) {
    showVisitorToast('Please enter a valid phone number');
    document.getElementById('vnumber').focus();
    return;
  }

  if (!address) {
    showVisitorToast('Please enter your address');
    document.getElementById('vaddress').focus();
    return;
  }

  playSound('success');
  showLoader();

  setTimeout(() => {
    hideLoader();
    showVisitorToast(`Welcome ${name.split(' ')[0]}! We're glad you're here.`);

    setTimeout(() => {
      window.location.href = 'about.html';
    }, 1500);
  }, 1800);
}

function openForm(event, department) {
  const modal = document.getElementById('formModal');
  const content = modal.querySelector('.modal-content');
  const title = document.getElementById('deptTitle');
  if (!modal || !content || !title) return;

  title.innerText = department;
  modal.classList.add('active');

  // Position the modal content at the click/tap position
  const contentRect = content.getBoundingClientRect();
  const contentWidth = contentRect.width || 420;
  const contentHeight = contentRect.height || 300;

  let x = event.clientX;
  let y = event.clientY;
  
  if (x === undefined && event.touches && event.touches.length > 0) {
    x = event.touches[0].clientX;
    y = event.touches[0].clientY;
  }

  // Position top-left at click point, but adjust to keep within viewport
  const viewportWidth = window.innerWidth;
  const viewportHeight = window.innerHeight;

  let left = x;
  let top = y;

  // If it would go off the right, position from the right edge
  if (left + contentWidth > viewportWidth) {
    left = viewportWidth - contentWidth - 10;
  }

  // If it would go off the bottom, position from the bottom edge
  if (top + contentHeight > viewportHeight) {
    top = viewportHeight - contentHeight - 10;
  }

  // Ensure not off the left or top
  left = Math.max(10, left);
  top = Math.max(10, top);

  // Set transformOrigin so the animation originates exactly from the click
  let originX = x - left;
  let originY = y - top;

  content.style.left = `${left}px`;
  content.style.top = `${top}px`;
  content.style.position = 'absolute';
  content.style.transformOrigin = `${originX}px ${originY}px`;
}

function closeForm() {
  document.getElementById('formModal')?.classList.remove('active');
}

function submitForm(event) {
  event.preventDefault();

  const name = document.getElementById('name')?.value.trim();
  const disease = document.getElementById('disease')?.value.trim();
  const number = document.getElementById('number')?.value.trim();

  if (!name || !disease || !number) {
    playSound('error');
    showPatientPopup('Please fill all patient details.');
    return;
  }

  playSound('success');
  showLoader();

  setTimeout(() => {
    hideLoader();
    showPatientPopup('Patient registered successfully 🏥');
    closeForm();
  }, 1400);
}

function createHomeFeatures() {
  const container = document.querySelector('.feature-grid');
  if (!container) return;

  const cards = [
    {
      title: '🏥 Affordable Healthcare',
      text: 'Community-first services for hospital care and physiotherapy with transparent pricing and compassionate support.',
    },
    {
      title: '👨‍⚕️ Expert Medical Team',
      text: 'Skilled healthcare professionals delivering personalized treatment plans with years of experience.',
    },
    {
      title: '🤝 Patient-Centered Care',
      text: 'Friendly guidance, seamless appointments, and comprehensive recovery follow-up for every patient.',
    },
  ];

  cards.forEach((card, index) => {
    const item = document.createElement('div');
    item.className = 'info-card';
    item.style.animationDelay = `${index * 0.2}s`;
    item.innerHTML = `<h3>${card.title}</h3><p>${card.text}</p>`;
    container.appendChild(item);
  });
}

function initTiltCard() {
  const card = document.getElementById('tilt-card');
  if (!card) return;

  card.addEventListener('mousemove', (event) => {
    const rect = card.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    const rotateX = -(y - rect.height / 2) / 18;
    const rotateY = (x - rect.width / 2) / 18;
    card.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
  });

  card.addEventListener('mouseleave', () => {
    card.style.transform = 'rotateX(0) rotateY(0)';
  });
}

function initScrollAnimations() {
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.animationPlayState = 'running';
      }
    });
  }, observerOptions);

  // Observe all animated elements
  document.querySelectorAll('.info-card, .content, .visitor-panel').forEach(el => {
    el.style.animationPlayState = 'paused';
    observer.observe(el);
  });
}

function initSmoothScrolling() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        target.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    });
  });
}

function initParallaxEffect() {
  let ticking = false;
  
  function updateParallax() {
    const scrolled = window.pageYOffset;
    const rate = scrolled * -0.5;
    
    // Apply subtle parallax to hero background elements
    const hero = document.querySelector('.hero');
    if (hero) {
      hero.style.transform = `translateY(${rate * 0.1}px)`;
    }
    
    ticking = false;
  }
  
  window.addEventListener('scroll', () => {
    if (!ticking) {
      requestAnimationFrame(updateParallax);
      ticking = true;
    }
  });
}

function setupPageTransitions() {
  const body = document.body;
  body.classList.add('page-transition');
  requestAnimationFrame(() => body.classList.add('page-enter'));

  const navLinks = document.querySelectorAll('.nav-links a');
  navLinks.forEach((link) => {
    link.addEventListener('click', (event) => {
      const href = link.getAttribute('href');
      if (!href || href.startsWith('#') || href.startsWith('mailto:')) return;
      if (href === window.location.pathname.split('/').pop()) return;

      event.preventDefault();
      body.classList.remove('page-enter');
      body.classList.add('page-exit');

      setTimeout(() => {
        window.location.href = href;
      }, 260);
    });
  });
}

window.addEventListener('click', (event) => {
  const modal = document.getElementById('formModal');
  if (modal && event.target === modal) {
    closeForm();
  }
});

window.addEventListener('resize', () => {
  const links = document.querySelector('.nav-links');
  const toggle = document.querySelector('.nav-toggle');
  if (window.innerWidth > 860 && links?.classList.contains('open')) {
    links.classList.remove('open');
    toggle?.classList.remove('open');
  }
});

window.addEventListener('DOMContentLoaded', () => {
  initializeNavigation();
  setGreeting();
  createHomeFeatures();
  initTiltCard();
  initScrollAnimations();
  initSmoothScrolling();
  initParallaxEffect();
});
