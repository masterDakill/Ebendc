/**
 * Ébénisterie Daniel Chamberland - JavaScript Premium
 * Fonctionnalités modernes sans frameworks
 */

class EbenisterieApp {
  constructor() {
    this.content = null;
    this.currentProject = null;
    this.lightboxOpen = false;
    this.currentImageIndex = 0;
    this.touchStartX = 0;
    this.touchStartY = 0;
    
    this.init();
  }

  async init() {
    try {
      // Charger le contenu
      await this.loadContent();
      
      // Initialiser les composants
      this.initNavigation();
      this.initScrollEffects();
      this.initLazyLoading();
      this.initForms();
      this.initLightbox();
      this.initSmoothScroll();
      this.initBackToTop();
      
      // Initialiser les pages spécifiques
      this.initPageSpecific();
      
      console.log('🪵 Ébénisterie Daniel Chamberland - Site initialisé');
    } catch (error) {
      console.error('Erreur lors de l\'initialisation:', error);
    }
  }

  // ===== CHARGEMENT CONTENU =====
  async loadContent() {
    try {
      const response = await fetch('./assets/content.json');
      this.content = await response.json();
    } catch (error) {
      console.warn('Contenu non trouvé, utilisation des données par défaut');
      this.content = this.getDefaultContent();
    }
  }

  getDefaultContent() {
    return {
      projects: [],
      company: {
        name: "Ébénisterie Daniel Chamberland",
        tagline: "Sur-mesure d'exception, de la conception à l'installation",
        phone: "(418) 563-6781",
        email: "eben.dc@ccapcable.com"
      }
    };
  }

  // ===== NAVIGATION =====
  initNavigation() {
    const navToggle = document.querySelector('.nav-toggle');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');
    const navbar = document.querySelector('.navbar');

    // Menu mobile
    if (navToggle && navMenu) {
      navToggle.addEventListener('click', () => {
        navToggle.classList.toggle('is-open');
        navMenu.classList.toggle('is-open');
        
        // Accessibility
        const isOpen = navMenu.classList.contains('is-open');
        navToggle.setAttribute('aria-expanded', isOpen);
        navMenu.setAttribute('aria-hidden', !isOpen);
      });

      // Fermer le menu au clic sur un lien
      navLinks.forEach(link => {
        link.addEventListener('click', () => {
          navToggle.classList.remove('is-open');
          navMenu.classList.remove('is-open');
          navToggle.setAttribute('aria-expanded', false);
          navMenu.setAttribute('aria-hidden', true);
        });
      });

      // Fermer le menu avec Escape
      document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && navMenu.classList.contains('is-open')) {
          navToggle.classList.remove('is-open');
          navMenu.classList.remove('is-open');
          navToggle.setAttribute('aria-expanded', false);
          navMenu.setAttribute('aria-hidden', true);
        }
      });
    }

    // Navbar sticky avec scroll
    if (navbar) {
      let scrollTimeout;
      window.addEventListener('scroll', () => {
        clearTimeout(scrollTimeout);
        scrollTimeout = setTimeout(() => {
          if (window.scrollY > 100) {
            navbar.classList.add('scrolled');
          } else {
            navbar.classList.remove('scrolled');
          }
        }, 10);
      });
    }

    // Navigation active
    this.updateActiveNavigation();
    window.addEventListener('scroll', this.throttle(() => {
      this.updateActiveNavigation();
    }, 100));
  }

  updateActiveNavigation() {
    const sections = document.querySelectorAll('section[id], main[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    
    let currentSection = '';
    
    sections.forEach(section => {
      const sectionTop = section.offsetTop - 100;
      const sectionHeight = section.offsetHeight;
      
      if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
        currentSection = section.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('active');
      const href = link.getAttribute('href');
      if (href === `#${currentSection}` || 
          (currentSection === '' && href === './') ||
          (window.location.pathname.includes(href.replace('./', '')) && href !== './')) {
        link.classList.add('active');
      }
    });
  }

  // ===== EFFETS SCROLL =====
  initScrollEffects() {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -10% 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.style.opacity = '1';
          entry.target.style.transform = 'translateY(0)';
        }
      });
    }, observerOptions);

    // Observer tous les éléments animables
    document.querySelectorAll('.card, .project-card, .process-step, .testimonial-card').forEach(el => {
      el.style.opacity = '0';
      el.style.transform = 'translateY(30px)';
      el.style.transition = 'opacity 0.6s cubic-bezier(0.4, 0, 0.2, 1), transform 0.6s cubic-bezier(0.4, 0, 0.2, 1)';
      observer.observe(el);
    });
  }

  // ===== LAZY LOADING =====
  initLazyLoading() {
    if ('IntersectionObserver' in window) {
      const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const img = entry.target;
            this.loadImage(img);
            observer.unobserve(img);
          }
        });
      });

      document.querySelectorAll('img[data-src]').forEach(img => {
        imageObserver.observe(img);
      });
    } else {
      // Fallback pour les navigateurs anciens
      document.querySelectorAll('img[data-src]').forEach(img => {
        this.loadImage(img);
      });
    }
  }

  loadImage(img) {
    const src = img.getAttribute('data-src');
    if (!src) return;

    const imageToLoad = new Image();
    imageToLoad.onload = () => {
      img.src = src;
      img.classList.add('loaded');
      img.removeAttribute('data-src');
    };
    imageToLoad.onerror = () => {
      img.src = this.generatePlaceholder(img.width || 400, img.height || 300);
      img.classList.add('loaded');
    };
    imageToLoad.src = src;
  }

  generatePlaceholder(width, height) {
    const canvas = document.createElement('canvas');
    canvas.width = width;
    canvas.height = height;
    const ctx = canvas.getContext('2d');
    
    // Dégradé bois
    const gradient = ctx.createLinearGradient(0, 0, width, height);
    gradient.addColorStop(0, '#f7f3ee');
    gradient.addColorStop(0.5, '#e8e2d8');
    gradient.addColorStop(1, '#d4c4b0');
    
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, width, height);
    
    // Icône ébénisterie
    ctx.fillStyle = '#7a5230';
    ctx.font = `${Math.min(width, height) / 8}px Arial`;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText('🪵', width / 2, height / 2);
    
    return canvas.toDataURL();
  }

  // ===== LIGHTBOX GALERIE =====
  initLightbox() {
    // Créer la structure HTML de la lightbox
    this.createLightboxHTML();
    
    // Event listeners pour ouvrir la lightbox
    document.addEventListener('click', (e) => {
      const galleryImg = e.target.closest('.gallery-img, .project-image img');
      if (galleryImg) {
        e.preventDefault();
        this.openLightbox(galleryImg);
      }
    });

    // Event listeners pour la navigation
    document.addEventListener('keydown', (e) => {
      if (!this.lightboxOpen) return;
      
      switch(e.key) {
        case 'Escape':
          this.closeLightbox();
          break;
        case 'ArrowLeft':
          this.previousImage();
          break;
        case 'ArrowRight':
          this.nextImage();
          break;
      }
    });

    // Touch events pour mobile
    this.initTouchEvents();
  }

  createLightboxHTML() {
    const lightboxHTML = `
      <div class="lightbox" id="lightbox" aria-hidden="true" role="dialog" aria-modal="true">
        <div class="lightbox-overlay"></div>
        <div class="lightbox-container">
          <button class="lightbox-close" aria-label="Fermer la galerie">
            <span>&times;</span>
          </button>
          <button class="lightbox-prev" aria-label="Image précédente">
            <span>&#8249;</span>
          </button>
          <button class="lightbox-next" aria-label="Image suivante">
            <span>&#8250;</span>
          </button>
          <div class="lightbox-content">
            <img class="lightbox-img" alt="" />
            <div class="lightbox-info">
              <h3 class="lightbox-title"></h3>
              <p class="lightbox-description"></p>
              <div class="lightbox-counter">
                <span class="current">1</span> / <span class="total">1</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    `;

    document.body.insertAdjacentHTML('beforeend', lightboxHTML);

    // Ajouter les styles CSS pour la lightbox
    const lightboxStyles = `
      <style>
        .lightbox {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: rgba(0, 0, 0, 0.9);
          z-index: 1050;
          display: flex;
          align-items: center;
          justify-content: center;
          opacity: 0;
          visibility: hidden;
          transition: all 0.3s ease;
        }
        
        .lightbox.active {
          opacity: 1;
          visibility: visible;
        }
        
        .lightbox-container {
          position: relative;
          max-width: 90vw;
          max-height: 90vh;
          display: flex;
          align-items: center;
        }
        
        .lightbox-content {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 1rem;
        }
        
        .lightbox-img {
          max-width: 80vw;
          max-height: 70vh;
          object-fit: contain;
          border-radius: 8px;
        }
        
        .lightbox-info {
          text-align: center;
          color: white;
          max-width: 600px;
        }
        
        .lightbox-title {
          font-size: 1.5rem;
          margin-bottom: 0.5rem;
          color: var(--accent);
        }
        
        .lightbox-description {
          margin-bottom: 1rem;
          opacity: 0.9;
        }
        
        .lightbox-counter {
          font-size: 0.9rem;
          opacity: 0.7;
        }
        
        .lightbox-close,
        .lightbox-prev,
        .lightbox-next {
          position: absolute;
          background: rgba(255, 255, 255, 0.1);
          border: none;
          color: white;
          width: 50px;
          height: 50px;
          border-radius: 50%;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 24px;
          transition: all 0.2s ease;
          backdrop-filter: blur(10px);
        }
        
        .lightbox-close:hover,
        .lightbox-prev:hover,
        .lightbox-next:hover {
          background: rgba(255, 255, 255, 0.2);
          transform: scale(1.1);
        }
        
        .lightbox-close {
          top: 20px;
          right: 20px;
        }
        
        .lightbox-prev {
          left: 20px;
          top: 50%;
          transform: translateY(-50%);
        }
        
        .lightbox-next {
          right: 20px;
          top: 50%;
          transform: translateY(-50%);
        }
        
        @media (max-width: 768px) {
          .lightbox-img {
            max-width: 95vw;
            max-height: 60vh;
          }
          
          .lightbox-close,
          .lightbox-prev,
          .lightbox-next {
            width: 40px;
            height: 40px;
            font-size: 20px;
          }
        }
      </style>
    `;
    
    document.head.insertAdjacentHTML('beforeend', lightboxStyles);

    // Event listeners pour les boutons
    document.getElementById('lightbox').addEventListener('click', (e) => {
      if (e.target.classList.contains('lightbox-overlay') || e.target.closest('.lightbox-close')) {
        this.closeLightbox();
      } else if (e.target.closest('.lightbox-prev')) {
        this.previousImage();
      } else if (e.target.closest('.lightbox-next')) {
        this.nextImage();
      }
    });
  }

  openLightbox(imgElement) {
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = lightbox.querySelector('.lightbox-img');
    const lightboxTitle = lightbox.querySelector('.lightbox-title');
    const lightboxDesc = lightbox.querySelector('.lightbox-description');
    
    // Trouver toutes les images de la galerie
    this.galleryImages = Array.from(document.querySelectorAll('.gallery-img, .project-image img'));
    this.currentImageIndex = this.galleryImages.indexOf(imgElement);
    
    this.lightboxOpen = true;
    document.body.style.overflow = 'hidden';
    
    lightbox.classList.add('active');
    lightbox.setAttribute('aria-hidden', 'false');
    
    this.updateLightboxContent();
    
    // Focus management
    lightbox.focus();
  }

  closeLightbox() {
    const lightbox = document.getElementById('lightbox');
    
    this.lightboxOpen = false;
    document.body.style.overflow = '';
    
    lightbox.classList.remove('active');
    lightbox.setAttribute('aria-hidden', 'true');
  }

  previousImage() {
    if (this.currentImageIndex > 0) {
      this.currentImageIndex--;
      this.updateLightboxContent();
    }
  }

  nextImage() {
    if (this.currentImageIndex < this.galleryImages.length - 1) {
      this.currentImageIndex++;
      this.updateLightboxContent();
    }
  }

  updateLightboxContent() {
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = lightbox.querySelector('.lightbox-img');
    const lightboxTitle = lightbox.querySelector('.lightbox-title');
    const lightboxDesc = lightbox.querySelector('.lightbox-description');
    const currentCounter = lightbox.querySelector('.current');
    const totalCounter = lightbox.querySelector('.total');
    const prevBtn = lightbox.querySelector('.lightbox-prev');
    const nextBtn = lightbox.querySelector('.lightbox-next');
    
    const currentImg = this.galleryImages[this.currentImageIndex];
    
    lightboxImg.src = currentImg.src || currentImg.getAttribute('data-src');
    lightboxImg.alt = currentImg.alt || '';
    
    lightboxTitle.textContent = currentImg.getAttribute('data-title') || '';
    lightboxDesc.textContent = currentImg.getAttribute('data-description') || '';
    
    currentCounter.textContent = this.currentImageIndex + 1;
    totalCounter.textContent = this.galleryImages.length;
    
    // Gérer la visibilité des boutons
    prevBtn.style.display = this.currentImageIndex > 0 ? 'flex' : 'none';
    nextBtn.style.display = this.currentImageIndex < this.galleryImages.length - 1 ? 'flex' : 'none';
  }

  initTouchEvents() {
    const lightbox = document.getElementById('lightbox');
    
    lightbox.addEventListener('touchstart', (e) => {
      this.touchStartX = e.touches[0].clientX;
      this.touchStartY = e.touches[0].clientY;
    });
    
    lightbox.addEventListener('touchend', (e) => {
      if (!this.lightboxOpen) return;
      
      const touchEndX = e.changedTouches[0].clientX;
      const touchEndY = e.changedTouches[0].clientY;
      const deltaX = this.touchStartX - touchEndX;
      const deltaY = this.touchStartY - touchEndY;
      
      // Swipe horizontal
      if (Math.abs(deltaX) > Math.abs(deltaY) && Math.abs(deltaX) > 50) {
        if (deltaX > 0) {
          this.nextImage();
        } else {
          this.previousImage();
        }
      }
      
      // Swipe vertical vers le bas pour fermer
      if (deltaY < -100) {
        this.closeLightbox();
      }
    });
  }

  // ===== FORMULAIRES =====
  initForms() {
    const forms = document.querySelectorAll('form');
    
    forms.forEach(form => {
      form.addEventListener('submit', (e) => {
        e.preventDefault();
        this.handleFormSubmit(form);
      });
      
      // Validation en temps réel
      const inputs = form.querySelectorAll('input, textarea, select');
      inputs.forEach(input => {
        input.addEventListener('blur', () => this.validateField(input));
        input.addEventListener('input', () => this.clearFieldError(input));
      });
    });
  }

  handleFormSubmit(form) {
    const inputs = form.querySelectorAll('input, textarea, select');
    let isValid = true;
    
    inputs.forEach(input => {
      if (!this.validateField(input)) {
        isValid = false;
      }
    });
    
    if (isValid) {
      // Créer le mailto
      const formData = new FormData(form);
      const emailBody = this.createEmailBody(formData);
      const subject = `Demande de projet - ${formData.get('nom') || 'Nouveau contact'}`;
      
      const mailtoLink = `mailto:${this.content.company.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(emailBody)}`;
      
      // Ouvrir le client email
      window.location.href = mailtoLink;
      
      // Afficher un message de succès
      this.showSuccessMessage(form);
    }
  }

  validateField(field) {
    const value = field.value.trim();
    let isValid = true;
    let errorMessage = '';
    
    // Nettoyer les erreurs précédentes
    this.clearFieldError(field);
    
    // Validation selon le type
    if (field.hasAttribute('required') && !value) {
      errorMessage = 'Ce champ est requis';
      isValid = false;
    } else if (field.type === 'email' && value) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(value)) {
        errorMessage = 'Adresse email invalide';
        isValid = false;
      }
    } else if (field.type === 'tel' && value) {
      const phoneRegex = /^[\d\s\-\+\(\)\.]+$/;
      if (!phoneRegex.test(value)) {
        errorMessage = 'Numéro de téléphone invalide';
        isValid = false;
      }
    }
    
    if (!isValid) {
      this.showFieldError(field, errorMessage);
    }
    
    return isValid;
  }

  showFieldError(field, message) {
    field.classList.add('error');
    
    const errorDiv = document.createElement('div');
    errorDiv.className = 'field-error';
    errorDiv.textContent = message;
    errorDiv.style.cssText = `
      color: #dc3545;
      font-size: 0.875rem;
      margin-top: 0.25rem;
    `;
    
    field.parentNode.appendChild(errorDiv);
  }

  clearFieldError(field) {
    field.classList.remove('error');
    const errorDiv = field.parentNode.querySelector('.field-error');
    if (errorDiv) {
      errorDiv.remove();
    }
  }

  createEmailBody(formData) {
    let body = `Nouvelle demande depuis le site web\n\n`;
    
    for (const [key, value] of formData.entries()) {
      if (value.trim()) {
        const fieldName = key.charAt(0).toUpperCase() + key.slice(1);
        body += `${fieldName}: ${value}\n`;
      }
    }
    
    body += `\n---\nEnvoyé depuis ebenisteriechamberland.com`;
    
    return body;
  }

  showSuccessMessage(form) {
    const successDiv = document.createElement('div');
    successDiv.className = 'success-message';
    successDiv.innerHTML = `
      <div style="
        background: #d4edda;
        color: #155724;
        padding: 1rem;
        border-radius: 8px;
        margin: 1rem 0;
        border: 1px solid #c3e6cb;
      ">
        ✅ Votre demande a été préparée. Votre client email va s'ouvrir automatiquement.
      </div>
    `;
    
    form.parentNode.insertBefore(successDiv, form);
    
    setTimeout(() => {
      successDiv.remove();
    }, 5000);
  }

  // ===== DÉFILEMENT FLUIDE =====
  initSmoothScroll() {
    document.addEventListener('click', (e) => {
      const link = e.target.closest('a[href^="#"]');
      if (link) {
        e.preventDefault();
        const targetId = link.getAttribute('href').substring(1);
        const targetElement = document.getElementById(targetId);
        
        if (targetElement) {
          const navHeight = document.querySelector('.navbar')?.offsetHeight || 0;
          const targetPosition = targetElement.offsetTop - navHeight - 20;
          
          window.scrollTo({
            top: targetPosition,
            behavior: 'smooth'
          });
        }
      }
    });
  }

  // ===== RETOUR EN HAUT =====
  initBackToTop() {
    const backToTop = this.createBackToTopButton();
    
    window.addEventListener('scroll', this.throttle(() => {
      if (window.scrollY > 500) {
        backToTop.classList.add('visible');
      } else {
        backToTop.classList.remove('visible');
      }
    }, 100));
    
    backToTop.addEventListener('click', () => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }

  createBackToTopButton() {
    const button = document.createElement('button');
    button.className = 'back-to-top';
    button.innerHTML = '↑';
    button.setAttribute('aria-label', 'Retour en haut de la page');
    
    button.style.cssText = `
      position: fixed;
      bottom: 2rem;
      right: 2rem;
      width: 50px;
      height: 50px;
      border-radius: 50%;
      background: var(--primary);
      color: white;
      border: none;
      cursor: pointer;
      font-size: 1.5rem;
      box-shadow: var(--shadow-lg);
      transition: all 0.3s ease;
      opacity: 0;
      visibility: hidden;
      z-index: 1000;
    `;
    
    const style = document.createElement('style');
    style.textContent = `
      .back-to-top.visible {
        opacity: 1 !important;
        visibility: visible !important;
      }
      .back-to-top:hover {
        background: var(--primary-light) !important;
        transform: translateY(-2px) !important;
      }
    `;
    document.head.appendChild(style);
    
    document.body.appendChild(button);
    return button;
  }

  // ===== PAGES SPÉCIFIQUES =====
  initPageSpecific() {
    const path = window.location.pathname;
    
    if (path.includes('realisations') || path === '/') {
      this.initProjectsPage();
    }
    
    if (path.includes('projet')) {
      this.initProjectDetailPage();
    }
  }

  async initProjectsPage() {
    const projectsContainer = document.querySelector('.projects-grid');
    if (projectsContainer && this.content.projects) {
      this.renderProjects(projectsContainer);
    }
  }

  renderProjects(container) {
    container.innerHTML = this.content.projects.map(project => `
      <article class="project-card">
        <div class="project-image">
          <img 
            data-src="./assets/img/${project.images[0]}" 
            alt="${project.title}"
            class="gallery-img"
            data-title="${project.title}"
            data-description="${project.subtitle}"
          />
          <div class="project-overlay"></div>
        </div>
        <div class="project-info">
          <span class="project-category">${project.category}</span>
          <h3 class="project-title">
            <a href="projet.html?id=${project.id}">${project.title}</a>
          </h3>
          <p class="project-subtitle">${project.subtitle}</p>
        </div>
      </article>
    `).join('');
    
    // Réinitialiser le lazy loading pour les nouvelles images
    this.initLazyLoading();
  }

  async initProjectDetailPage() {
    const urlParams = new URLSearchParams(window.location.search);
    const projectId = urlParams.get('id');
    
    if (projectId && this.content.projects) {
      const project = this.content.projects.find(p => p.id === projectId);
      if (project) {
        this.renderProjectDetail(project);
      }
    }
  }

  renderProjectDetail(project) {
    // Mise à jour du titre de la page
    document.title = `${project.title} - ${this.content.company.name}`;
    
    // Rendering du contenu du projet...
    // (Cette partie serait complétée dans la page projet.html)
  }

  // ===== UTILITAIRES =====
  throttle(func, limit) {
    let inThrottle;
    return function() {
      const args = arguments;
      const context = this;
      if (!inThrottle) {
        func.apply(context, args);
        inThrottle = true;
        setTimeout(() => inThrottle = false, limit);
      }
    };
  }

  debounce(func, wait, immediate) {
    let timeout;
    return function() {
      const context = this;
      const args = arguments;
      const later = function() {
        timeout = null;
        if (!immediate) func.apply(context, args);
      };
      const callNow = immediate && !timeout;
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
      if (callNow) func.apply(context, args);
    };
  }

  // ===== ANALYTICS ET PERFORMANCE =====
  trackEvent(category, action, label) {
    // Interface pour Google Analytics ou autre
    if (typeof gtag !== 'undefined') {
      gtag('event', action, {
        event_category: category,
        event_label: label
      });
    }
    console.log(`Event: ${category} - ${action} - ${label}`);
  }

  // ===== DÉTECTION FEATURES =====
  supportsWebP() {
    return new Promise((resolve) => {
      const webP = new Image();
      webP.onload = webP.onerror = () => resolve(webP.height === 2);
      webP.src = 'data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA';
    });
  }
}

// ===== INITIALISATION =====
document.addEventListener('DOMContentLoaded', () => {
  new EbenisterieApp();
});

// ===== SERVICE WORKER (OPTIONNEL) =====
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('./sw.js')
      .then((registration) => {
        console.log('SW registered: ', registration);
      })
      .catch((registrationError) => {
        console.log('SW registration failed: ', registrationError);
      });
  });
}