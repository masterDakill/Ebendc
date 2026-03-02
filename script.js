/**
 * Ebenisterie Daniel Chamberland - JavaScript Moderne 2026
 * Three.js 3D Scene + GSAP Animations + Advanced Interactions
 */

class EbenisterieApp {
  constructor() {
    this.content = null;
    this.lightboxOpen = false;
    this.currentImageIndex = 0;
    this.galleryImages = [];
    this.mouse = { x: 0, y: 0 };
    this.isDesktop = window.innerWidth > 768;
    this.prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    this.init();
  }

  async init() {
    try {
      // Loading screen
      this.initLoading();

      // Load content
      await this.loadContent();

      // Core
      this.initNavigation();
      this.initScrollReveal();
      this.initLazyLoading();
      this.initLightbox();
      this.initBackToTop();
      this.initForms();
      this.initFAQ();

      // Premium effects (desktop only)
      if (this.isDesktop && !this.prefersReducedMotion) {
        this.initCustomCursor();
        this.initMagneticButtons();
        this.init3DScene();
        this.initParallax();
      }

      // GSAP animations
      if (!this.prefersReducedMotion && typeof gsap !== 'undefined') {
        this.initGSAPAnimations();
      }

      // Hide loading
      this.hideLoading();

    } catch (error) {
      console.error('Init error:', error);
      this.hideLoading();
    }
  }

  // ===== LOADING =====
  initLoading() {
    const bar = document.getElementById('loading-bar');
    if (bar) {
      let progress = 0;
      const interval = setInterval(() => {
        progress += Math.random() * 25;
        if (progress >= 90) {
          clearInterval(interval);
          progress = 90;
        }
        bar.style.width = progress + '%';
      }, 200);
      this._loadingInterval = interval;
    }
  }

  hideLoading() {
    clearInterval(this._loadingInterval);
    const bar = document.getElementById('loading-bar');
    const loading = document.getElementById('loading');
    if (bar) bar.style.width = '100%';
    setTimeout(() => {
      if (loading) loading.classList.add('loaded');
    }, 500);
  }

  // ===== CONTENT =====
  async loadContent() {
    try {
      const response = await fetch('./assets/content.json');
      this.content = await response.json();
    } catch {
      this.content = {
        projects: [],
        company: {
          name: "Ebenisterie Daniel Chamberland",
          email: "eben.dc@ccapcable.com",
          phone: "(418) 563-6781"
        }
      };
    }
  }

  // ===== NAVIGATION =====
  initNavigation() {
    const toggle = document.getElementById('nav-toggle');
    const menu = document.getElementById('nav-menu');
    const overlay = document.getElementById('nav-overlay');
    const navbar = document.getElementById('navbar');
    const links = document.querySelectorAll('.nav-link');

    if (toggle && menu) {
      const toggleMenu = () => {
        const isOpen = menu.classList.toggle('is-open');
        toggle.classList.toggle('is-open');
        if (overlay) overlay.classList.toggle('is-open');
        toggle.setAttribute('aria-expanded', isOpen);
        document.body.style.overflow = isOpen ? 'hidden' : '';
      };

      toggle.addEventListener('click', toggleMenu);
      if (overlay) overlay.addEventListener('click', toggleMenu);

      links.forEach(link => {
        link.addEventListener('click', () => {
          if (menu.classList.contains('is-open')) toggleMenu();
        });
      });

      document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && menu.classList.contains('is-open')) toggleMenu();
      });
    }

    // Navbar scroll
    if (navbar) {
      let ticking = false;
      window.addEventListener('scroll', () => {
        if (!ticking) {
          requestAnimationFrame(() => {
            navbar.classList.toggle('scrolled', window.scrollY > 50);
            ticking = false;
          });
          ticking = true;
        }
      });
    }
  }

  // ===== CUSTOM CURSOR =====
  initCustomCursor() {
    const cursor = document.getElementById('cursor');
    if (!cursor) return;

    document.addEventListener('mousemove', (e) => {
      cursor.style.left = e.clientX + 'px';
      cursor.style.top = e.clientY + 'px';
      this.mouse.x = e.clientX;
      this.mouse.y = e.clientY;
    });

    // Hover state
    const hoverElements = document.querySelectorAll('a, button, .card, .project-card, .filter-btn');
    hoverElements.forEach(el => {
      el.addEventListener('mouseenter', () => cursor.classList.add('hover'));
      el.addEventListener('mouseleave', () => cursor.classList.remove('hover'));
    });

    // Click state
    document.addEventListener('mousedown', () => cursor.classList.add('click'));
    document.addEventListener('mouseup', () => cursor.classList.remove('click'));
  }

  // ===== MAGNETIC BUTTONS =====
  initMagneticButtons() {
    document.querySelectorAll('.btn-magnetic').forEach(btn => {
      btn.addEventListener('mousemove', (e) => {
        const rect = btn.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;
        btn.style.transform = `translate(${x * 0.2}px, ${y * 0.2}px)`;
      });

      btn.addEventListener('mouseleave', () => {
        btn.style.transform = '';
      });
    });
  }

  // ===== THREE.JS 3D SCENE =====
  init3DScene() {
    const canvas = document.getElementById('canvas-3d');
    if (!canvas || typeof THREE === 'undefined') return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    // Floating wood particles
    const particleCount = 80;
    const particles = new THREE.Group();

    for (let i = 0; i < particleCount; i++) {
      const size = Math.random() * 0.15 + 0.03;
      const geometry = new THREE.BoxGeometry(size, size * 0.3, size * 0.1);
      const material = new THREE.MeshBasicMaterial({
        color: new THREE.Color().setHSL(0.08 + Math.random() * 0.05, 0.5 + Math.random() * 0.3, 0.3 + Math.random() * 0.3),
        transparent: true,
        opacity: Math.random() * 0.3 + 0.05
      });

      const mesh = new THREE.Mesh(geometry, material);
      mesh.position.set(
        (Math.random() - 0.5) * 20,
        (Math.random() - 0.5) * 20,
        (Math.random() - 0.5) * 15
      );
      mesh.rotation.set(
        Math.random() * Math.PI,
        Math.random() * Math.PI,
        Math.random() * Math.PI
      );
      mesh.userData = {
        speedX: (Math.random() - 0.5) * 0.003,
        speedY: (Math.random() - 0.5) * 0.003,
        speedZ: (Math.random() - 0.5) * 0.001,
        rotSpeedX: (Math.random() - 0.5) * 0.005,
        rotSpeedY: (Math.random() - 0.5) * 0.005,
      };
      particles.add(mesh);
    }

    scene.add(particles);

    // Ambient golden glow
    const glowGeometry = new THREE.SphereGeometry(2, 32, 32);
    const glowMaterial = new THREE.MeshBasicMaterial({
      color: 0xc48f59,
      transparent: true,
      opacity: 0.03
    });
    const glow = new THREE.Mesh(glowGeometry, glowMaterial);
    glow.position.set(3, 2, -5);
    scene.add(glow);

    camera.position.z = 8;

    // Mouse influence
    let mouseX = 0, mouseY = 0;
    document.addEventListener('mousemove', (e) => {
      mouseX = (e.clientX / window.innerWidth - 0.5) * 2;
      mouseY = (e.clientY / window.innerHeight - 0.5) * 2;
    });

    // Animation loop
    const animate = () => {
      requestAnimationFrame(animate);

      particles.children.forEach(p => {
        p.position.x += p.userData.speedX;
        p.position.y += p.userData.speedY;
        p.position.z += p.userData.speedZ;
        p.rotation.x += p.userData.rotSpeedX;
        p.rotation.y += p.userData.rotSpeedY;

        // Wrap around
        if (p.position.x > 10) p.position.x = -10;
        if (p.position.x < -10) p.position.x = 10;
        if (p.position.y > 10) p.position.y = -10;
        if (p.position.y < -10) p.position.y = 10;
      });

      // Mouse parallax
      particles.rotation.y += (mouseX * 0.05 - particles.rotation.y) * 0.02;
      particles.rotation.x += (mouseY * 0.03 - particles.rotation.x) * 0.02;

      // Subtle glow animation
      glow.scale.setScalar(1 + Math.sin(Date.now() * 0.001) * 0.1);

      renderer.render(scene, camera);
    };

    animate();

    // Resize
    window.addEventListener('resize', () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    });
  }

  // ===== SCROLL REVEAL =====
  initScrollReveal() {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
        }
      });
    }, {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    });

    document.querySelectorAll('.reveal, .reveal-left, .reveal-right, .reveal-scale, .process-step').forEach(el => {
      observer.observe(el);
    });
  }

  // ===== GSAP ANIMATIONS =====
  initGSAPAnimations() {
    gsap.registerPlugin(ScrollTrigger);

    // Hero title reveal
    gsap.from('.hero-title .line-inner', {
      y: '100%',
      opacity: 0,
      duration: 1.2,
      stagger: 0.15,
      ease: 'power4.out',
      delay: 0.8
    });

    // Hero elements
    gsap.from('.hero-badge', {
      y: 20,
      opacity: 0,
      duration: 0.8,
      ease: 'power3.out',
      delay: 0.4
    });

    gsap.from('.hero-subtitle', {
      y: 30,
      opacity: 0,
      duration: 0.8,
      ease: 'power3.out',
      delay: 1.3
    });

    gsap.from('.hero-actions', {
      y: 30,
      opacity: 0,
      duration: 0.8,
      ease: 'power3.out',
      delay: 1.5
    });

    gsap.from('.hero-scroll-indicator', {
      opacity: 0,
      duration: 1,
      delay: 2
    });

    // Section headers
    gsap.utils.toArray('.section-header').forEach(header => {
      gsap.from(header.children, {
        scrollTrigger: {
          trigger: header,
          start: 'top 80%',
        },
        y: 40,
        opacity: 0,
        duration: 0.8,
        stagger: 0.15,
        ease: 'power3.out'
      });
    });

    // Stats counter animation
    gsap.utils.toArray('.about-stat-number').forEach(stat => {
      const target = stat.textContent;
      const num = parseInt(target);
      if (isNaN(num)) return;

      const suffix = target.replace(/[0-9]/g, '');

      ScrollTrigger.create({
        trigger: stat,
        start: 'top 85%',
        onEnter: () => {
          gsap.from(stat, {
            textContent: 0,
            duration: 2,
            ease: 'power2.out',
            snap: { textContent: 1 },
            onUpdate: function() {
              stat.textContent = Math.round(parseFloat(stat.textContent)) + suffix;
            }
          });
        },
        once: true
      });
    });
  }

  // ===== PARALLAX =====
  initParallax() {
    if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') return;

    gsap.utils.toArray('.about-image-wrapper').forEach(wrapper => {
      gsap.to(wrapper.querySelector('img'), {
        y: -40,
        ease: 'none',
        scrollTrigger: {
          trigger: wrapper,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 1
        }
      });
    });
  }

  // ===== LAZY LOADING =====
  initLazyLoading() {
    const imageObserver = new IntersectionObserver((entries, obs) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const img = entry.target;
          const src = img.getAttribute('data-src');
          if (!src) return;

          const loader = new Image();
          loader.onload = () => {
            img.src = src;
            img.classList.add('loaded');
            img.removeAttribute('data-src');
          };
          loader.onerror = () => {
            img.src = this.generatePlaceholder(img.width || 400, img.height || 300);
            img.classList.add('loaded');
          };
          loader.src = src;
          obs.unobserve(img);
        }
      });
    }, { rootMargin: '200px' });

    document.querySelectorAll('img[data-src]').forEach(img => {
      imageObserver.observe(img);
    });
  }

  generatePlaceholder(w, h) {
    const canvas = document.createElement('canvas');
    canvas.width = w;
    canvas.height = h;
    const ctx = canvas.getContext('2d');

    const gradient = ctx.createLinearGradient(0, 0, w, h);
    gradient.addColorStop(0, '#1a1a1a');
    gradient.addColorStop(0.5, '#222');
    gradient.addColorStop(1, '#1a1a1a');
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, w, h);

    ctx.fillStyle = '#c48f59';
    ctx.globalAlpha = 0.3;
    ctx.font = `${Math.min(w, h) / 6}px serif`;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText('DC', w / 2, h / 2);

    return canvas.toDataURL();
  }

  // ===== LIGHTBOX =====
  initLightbox() {
    this.createLightboxHTML();

    document.addEventListener('click', (e) => {
      const img = e.target.closest('.gallery-img, .project-image img');
      if (img) {
        e.preventDefault();
        this.openLightbox(img);
      }
    });

    document.addEventListener('keydown', (e) => {
      if (!this.lightboxOpen) return;
      if (e.key === 'Escape') this.closeLightbox();
      if (e.key === 'ArrowLeft') this.prevImage();
      if (e.key === 'ArrowRight') this.nextImage();
    });

    this.initLightboxTouch();
  }

  createLightboxHTML() {
    const html = `
      <div class="lightbox" id="lightbox" aria-hidden="true" role="dialog" aria-modal="true">
        <div class="lightbox-container">
          <button class="lightbox-close" aria-label="Fermer"><span>&times;</span></button>
          <button class="lightbox-prev" aria-label="Precedente"><span>&#8249;</span></button>
          <button class="lightbox-next" aria-label="Suivante"><span>&#8250;</span></button>
          <div class="lightbox-content">
            <img class="lightbox-img" alt="" />
            <div class="lightbox-info">
              <h3 class="lightbox-title"></h3>
              <p class="lightbox-description"></p>
              <div class="lightbox-counter"><span class="current">1</span> / <span class="total">1</span></div>
            </div>
          </div>
        </div>
      </div>`;
    document.body.insertAdjacentHTML('beforeend', html);

    const lb = document.getElementById('lightbox');
    lb.addEventListener('click', (e) => {
      if (e.target === lb || e.target.closest('.lightbox-close')) this.closeLightbox();
      else if (e.target.closest('.lightbox-prev')) this.prevImage();
      else if (e.target.closest('.lightbox-next')) this.nextImage();
    });
  }

  openLightbox(img) {
    const lb = document.getElementById('lightbox');
    this.galleryImages = Array.from(document.querySelectorAll('.gallery-img, .project-image img'));
    this.currentImageIndex = this.galleryImages.indexOf(img);
    this.lightboxOpen = true;
    document.body.style.overflow = 'hidden';
    lb.classList.add('active');
    lb.setAttribute('aria-hidden', 'false');
    this.updateLightbox();
  }

  closeLightbox() {
    const lb = document.getElementById('lightbox');
    this.lightboxOpen = false;
    document.body.style.overflow = '';
    lb.classList.remove('active');
    lb.setAttribute('aria-hidden', 'true');
  }

  prevImage() {
    if (this.currentImageIndex > 0) { this.currentImageIndex--; this.updateLightbox(); }
  }

  nextImage() {
    if (this.currentImageIndex < this.galleryImages.length - 1) { this.currentImageIndex++; this.updateLightbox(); }
  }

  updateLightbox() {
    const lb = document.getElementById('lightbox');
    const img = this.galleryImages[this.currentImageIndex];
    lb.querySelector('.lightbox-img').src = img.src || img.getAttribute('data-src');
    lb.querySelector('.lightbox-img').alt = img.alt || '';
    lb.querySelector('.lightbox-title').textContent = img.getAttribute('data-title') || '';
    lb.querySelector('.lightbox-description').textContent = img.getAttribute('data-description') || '';
    lb.querySelector('.current').textContent = this.currentImageIndex + 1;
    lb.querySelector('.total').textContent = this.galleryImages.length;
    lb.querySelector('.lightbox-prev').style.display = this.currentImageIndex > 0 ? 'flex' : 'none';
    lb.querySelector('.lightbox-next').style.display = this.currentImageIndex < this.galleryImages.length - 1 ? 'flex' : 'none';
  }

  initLightboxTouch() {
    const lb = document.getElementById('lightbox');
    let startX = 0;

    lb.addEventListener('touchstart', (e) => { startX = e.touches[0].clientX; });
    lb.addEventListener('touchend', (e) => {
      if (!this.lightboxOpen) return;
      const delta = startX - e.changedTouches[0].clientX;
      if (Math.abs(delta) > 50) {
        delta > 0 ? this.nextImage() : this.prevImage();
      }
    });
  }

  // ===== FORMS =====
  initForms() {
    document.querySelectorAll('form').forEach(form => {
      form.addEventListener('submit', (e) => {
        e.preventDefault();
        this.handleFormSubmit(form);
      });

      form.querySelectorAll('input, textarea, select').forEach(input => {
        input.addEventListener('blur', () => this.validateField(input));
        input.addEventListener('input', () => this.clearFieldError(input));
      });
    });
  }

  handleFormSubmit(form) {
    let valid = true;
    form.querySelectorAll('input, textarea, select').forEach(f => {
      if (!this.validateField(f)) valid = false;
    });

    if (valid) {
      const data = new FormData(form);
      const subject = `Demande de projet - ${data.get('nom') || 'Nouveau contact'}`;
      let body = 'Nouvelle demande depuis le site web\n\n';
      for (const [k, v] of data.entries()) {
        if (v.trim()) body += `${k}: ${v}\n`;
      }
      body += '\n---\nEnvoye depuis ebenisteriechamberland.com';
      window.location.href = `mailto:${this.content.company.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

      const msg = document.createElement('div');
      msg.style.cssText = 'background:rgba(196,143,89,0.1);border:1px solid rgba(196,143,89,0.2);color:var(--primary-light);padding:1rem;border-radius:12px;margin:1rem 0;text-align:center;';
      msg.textContent = 'Votre client email va s\'ouvrir automatiquement.';
      form.parentNode.insertBefore(msg, form);
      setTimeout(() => msg.remove(), 5000);
    }
  }

  validateField(field) {
    const value = field.value.trim();
    this.clearFieldError(field);

    if (field.hasAttribute('required') && !value) {
      this.showFieldError(field, 'Ce champ est requis');
      return false;
    }
    if (field.type === 'email' && value && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
      this.showFieldError(field, 'Adresse email invalide');
      return false;
    }
    if (field.type === 'tel' && value && !/^[\d\s\-\+\(\)\.]+$/.test(value)) {
      this.showFieldError(field, 'Numero invalide');
      return false;
    }
    return true;
  }

  showFieldError(field, msg) {
    field.style.borderColor = '#e74c3c';
    const div = document.createElement('div');
    div.className = 'field-error';
    div.textContent = msg;
    div.style.cssText = 'color:#e74c3c;font-size:0.8rem;margin-top:0.25rem;';
    field.parentNode.appendChild(div);
  }

  clearFieldError(field) {
    field.style.borderColor = '';
    const err = field.parentNode.querySelector('.field-error');
    if (err) err.remove();
  }

  // ===== FAQ ACCORDION =====
  initFAQ() {
    document.querySelectorAll('.faq-question').forEach(btn => {
      btn.addEventListener('click', () => {
        const item = btn.closest('.faq-item');
        const wasActive = item.classList.contains('active');

        // Close all
        document.querySelectorAll('.faq-item.active').forEach(i => i.classList.remove('active'));

        // Open clicked (if it wasn't already open)
        if (!wasActive) item.classList.add('active');
      });
    });
  }

  // ===== BACK TO TOP =====
  initBackToTop() {
    const btn = document.getElementById('back-to-top');
    if (!btn) return;

    let ticking = false;
    window.addEventListener('scroll', () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          btn.classList.toggle('visible', window.scrollY > 500);
          ticking = false;
        });
        ticking = true;
      }
    });

    btn.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }
}

// ===== INIT =====
document.addEventListener('DOMContentLoaded', () => {
  new EbenisterieApp();
});
