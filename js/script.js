// ===== JavaScript pour Ébénisterie Daniel Chamberland =====

// Attendre que le DOM soit chargé
document.addEventListener('DOMContentLoaded', function() {
    // ===== Variables globales =====
    const navbar = document.querySelector('.navbar');
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');
    
    // ===== Navigation sticky et transparence =====
    function handleScroll() {
        const scrollY = window.scrollY;
        
        if (scrollY > 100) {
            navbar.style.background = 'rgba(47, 47, 47, 0.98)';
            navbar.style.backdropFilter = 'blur(15px)';
        } else {
            navbar.style.background = 'rgba(47, 47, 47, 0.95)';
            navbar.style.backdropFilter = 'blur(10px)';
        }
    }
    
    // ===== Menu hamburger mobile =====
    function toggleMobileMenu() {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
        
        // Animer les barres du hamburger
        const bars = hamburger.querySelectorAll('.bar');
        if (hamburger.classList.contains('active')) {
            bars[0].style.transform = 'rotate(-45deg) translate(-5px, 6px)';
            bars[1].style.opacity = '0';
            bars[2].style.transform = 'rotate(45deg) translate(-5px, -6px)';
        } else {
            bars[0].style.transform = 'none';
            bars[1].style.opacity = '1';
            bars[2].style.transform = 'none';
        }
    }
    
    // ===== Défilement fluide vers les sections =====
    function smoothScrollToSection(targetId) {
        const targetSection = document.querySelector(targetId);
        if (targetSection) {
            const navbarHeight = navbar.offsetHeight;
            const targetPosition = targetSection.offsetTop - navbarHeight;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    }
    
    // ===== Gestion des liens de navigation =====
    function handleNavLinkClick(e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        
        // Fermer le menu mobile si ouvert
        if (navMenu.classList.contains('active')) {
            toggleMobileMenu();
        }
        
        // Défilement fluide
        smoothScrollToSection(targetId);
        
        // Mettre à jour la classe active
        updateActiveNavLink(targetId);
    }
    
    // ===== Mise à jour du lien actif =====
    function updateActiveNavLink(targetId) {
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === targetId) {
                link.classList.add('active');
            }
        });
    }
    
    // ===== Détection de la section visible =====
    function updateActiveNavOnScroll() {
        const sections = document.querySelectorAll('section[id]');
        const scrollPos = window.scrollY + navbar.offsetHeight + 100;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            
            if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
                updateActiveNavLink(`#${sectionId}`);
            }
        });
    }
    
    // ===== Animation d'apparition des éléments =====
    function animateOnScroll() {
        const animatedElements = document.querySelectorAll('.gallery-item, .value-item, .info-item');
        const windowHeight = window.innerHeight;
        const scrollTop = window.scrollY;
        
        animatedElements.forEach(element => {
            const elementTop = element.offsetTop;
            const elementHeight = element.offsetHeight;
            
            // Déclencher l'animation quand l'élément est à 80% visible
            if (scrollTop + windowHeight > elementTop + (elementHeight * 0.2)) {
                if (!element.classList.contains('animated')) {
                    element.classList.add('fade-in-up', 'animated');
                }
            }
        });
    }
    
    // ===== Amélioration du formulaire de contact =====
    function enhanceContactForm() {
        const form = document.querySelector('form');
        const inputs = form.querySelectorAll('input, select, textarea');
        
        // Validation en temps réel
        inputs.forEach(input => {
            input.addEventListener('blur', function() {
                validateField(this);
            });
            
            input.addEventListener('input', function() {
                clearFieldError(this);
            });
        });
        
        // Soumission du formulaire
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            let isValid = true;
            inputs.forEach(input => {
                if (!validateField(input)) {
                    isValid = false;
                }
            });
            
            if (isValid) {
                // Créer l'email avec les données du formulaire
                const formData = new FormData(form);
                const emailBody = createEmailBody(formData);
                const emailSubject = `Demande de renseignements - ${formData.get('nom')}`;
                
                // Ouvrir le client de messagerie
                const mailtoLink = `mailto:eben.dc@ccapcable.com?subject=${encodeURIComponent(emailSubject)}&body=${encodeURIComponent(emailBody)}`;
                window.location.href = mailtoLink;
                
                // Afficher un message de confirmation
                showSuccessMessage();
            }
        });
    }
    
    // ===== Validation des champs =====
    function validateField(field) {
        const fieldGroup = field.closest('.form-group');
        const errorElement = fieldGroup.querySelector('.error-message');
        let isValid = true;
        let errorMessage = '';
        
        // Supprimer l'ancien message d'erreur
        if (errorElement) {
            errorElement.remove();
        }
        
        // Validation selon le type de champ
        if (field.hasAttribute('required') && !field.value.trim()) {
            errorMessage = 'Ce champ est obligatoire';
            isValid = false;
        } else if (field.type === 'email' && field.value.trim()) {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(field.value.trim())) {
                errorMessage = 'Veuillez entrer une adresse courriel valide';
                isValid = false;
            }
        } else if (field.type === 'tel' && field.value.trim()) {
            const phoneRegex = /^[\d\s\-\+\(\)]+$/;
            if (!phoneRegex.test(field.value.trim())) {
                errorMessage = 'Veuillez entrer un numéro de téléphone valide';
                isValid = false;
            }
        }
        
        // Afficher l'erreur si nécessaire
        if (!isValid) {
            showFieldError(fieldGroup, errorMessage);
            field.classList.add('error');
        } else {
            field.classList.remove('error');
        }
        
        return isValid;
    }
    
    // ===== Afficher une erreur de champ =====
    function showFieldError(fieldGroup, message) {
        const errorElement = document.createElement('span');
        errorElement.className = 'error-message';
        errorElement.textContent = message;
        errorElement.style.color = '#e74c3c';
        errorElement.style.fontSize = '0.85rem';
        errorElement.style.marginTop = '0.5rem';
        errorElement.style.display = 'block';
        
        fieldGroup.appendChild(errorElement);
    }
    
    // ===== Effacer l'erreur d'un champ =====
    function clearFieldError(field) {
        const fieldGroup = field.closest('.form-group');
        const errorElement = fieldGroup.querySelector('.error-message');
        
        if (errorElement) {
            errorElement.remove();
        }
        field.classList.remove('error');
    }
    
    // ===== Créer le corps de l'email =====
    function createEmailBody(formData) {
        const nom = formData.get('nom') || '';
        const courriel = formData.get('courriel') || '';
        const telephone = formData.get('telephone') || 'Non spécifié';
        const projet = formData.get('projet') || 'Non spécifié';
        const message = formData.get('message') || '';
        
        return `
Bonjour,

Vous avez reçu une nouvelle demande de renseignements depuis le site web.

INFORMATIONS DU CLIENT:
------------------------
Nom: ${nom}
Courriel: ${courriel}
Téléphone: ${telephone}
Type de projet: ${projet}

MESSAGE:
--------
${message}

Cordialement,
Système de contact - Ébénisterie Daniel Chamberland
        `.trim();
    }
    
    // ===== Afficher un message de succès =====
    function showSuccessMessage() {
        const form = document.querySelector('form');
        const successMessage = document.createElement('div');
        successMessage.className = 'success-message';
        successMessage.innerHTML = `
            <p><i class="fas fa-check-circle"></i> Votre demande a été préparée. Votre client de messagerie va s'ouvrir.</p>
        `;
        successMessage.style.cssText = `
            background-color: #d4edda;
            color: #155724;
            padding: 1rem;
            border-radius: 8px;
            margin-bottom: 1rem;
            border: 1px solid #c3e6cb;
        `;
        
        form.parentNode.insertBefore(successMessage, form);
        
        // Supprimer le message après 5 secondes
        setTimeout(() => {
            if (successMessage.parentNode) {
                successMessage.parentNode.removeChild(successMessage);
            }
        }, 5000);
    }
    
    // ===== Gestion du redimensionnement de fenêtre =====
    function handleResize() {
        // Fermer le menu mobile si la fenêtre devient plus large
        if (window.innerWidth > 768 && navMenu.classList.contains('active')) {
            toggleMobileMenu();
        }
    }
    
    // ===== Performance: Throttle pour les événements scroll =====
    function throttle(func, limit) {
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
    
    // ===== Initialisation des événements =====
    function initEventListeners() {
        // Événements de défilement (avec throttling pour la performance)
        window.addEventListener('scroll', throttle(() => {
            handleScroll();
            updateActiveNavOnScroll();
            animateOnScroll();
        }, 16)); // ~60fps
        
        // Événement de redimensionnement
        window.addEventListener('resize', throttle(handleResize, 250));
        
        // Menu hamburger
        if (hamburger) {
            hamburger.addEventListener('click', toggleMobileMenu);
        }
        
        // Liens de navigation
        navLinks.forEach(link => {
            link.addEventListener('click', handleNavLinkClick);
        });
        
        // Fermer le menu mobile en cliquant à l'extérieur
        document.addEventListener('click', function(e) {
            if (navMenu.classList.contains('active') && 
                !navMenu.contains(e.target) && 
                !hamburger.contains(e.target)) {
                toggleMobileMenu();
            }
        });
        
        // Améliorer le formulaire de contact
        enhanceContactForm();
    }
    
    // ===== Initialisation au chargement =====
    function init() {
        // Appeler les fonctions d'initialisation
        initEventListeners();
        handleScroll(); // État initial de la navbar
        animateOnScroll(); // Animation initiale des éléments
        
        // Ajouter des styles CSS dynamiques pour les animations
        addDynamicStyles();
        
        console.log('Ébénisterie Daniel Chamberland - Site web initialisé avec succès');
    }
    
    // ===== Ajouter des styles CSS dynamiques =====
    function addDynamicStyles() {
        const style = document.createElement('style');
        style.textContent = `
            .error {
                border-color: #e74c3c !important;
                box-shadow: 0 0 0 3px rgba(231, 76, 60, 0.1) !important;
            }
            
            .animated {
                opacity: 1 !important;
                transform: translateY(0) !important;
            }
            
            .gallery-item, .value-item, .info-item {
                opacity: 0;
                transform: translateY(30px);
                transition: opacity 0.6s ease, transform 0.6s ease;
            }
            
            .nav-link.active::after {
                width: 100% !important;
            }
        `;
        document.head.appendChild(style);
    }
    
    // Lancer l'initialisation
    init();
});

// ===== Fonctions utilitaires globales =====

// Fonction pour précharger les images (optionnel, si des vraies images sont ajoutées plus tard)
function preloadImages(imageUrls) {
    imageUrls.forEach(url => {
        const img = new Image();
        img.src = url;
    });
}

// Fonction pour détecter si l'utilisateur préfère des animations réduites
function respectsReducedMotion() {
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

// Ajuster les animations selon les préférences de l'utilisateur
if (respectsReducedMotion()) {
    document.documentElement.style.setProperty('--transition', 'none');
}