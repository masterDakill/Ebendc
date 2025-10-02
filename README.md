# 🪵 Ébénisterie Daniel Chamberland - Site Premium

> **Site vitrine haut de gamme pour l'atelier d'ébénisterie Daniel Chamberland**  
> Design premium inspiré des cuisinistes de luxe type Simon Cuisine

[![Demo](https://img.shields.io/badge/Demo-Live-success)](https://8080-imjntyyno3ntbpsg56dt6-6532622b.e2b.dev)
[![HTML5](https://img.shields.io/badge/HTML5-E34F26?logo=html5&logoColor=white)](https://developer.mozilla.org/en-US/docs/Web/HTML)
[![CSS3](https://img.shields.io/badge/CSS3-1572B6?logo=css3&logoColor=white)](https://developer.mozilla.org/en-US/docs/Web/CSS)
[![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?logo=javascript&logoColor=black)](https://developer.mozilla.org/en-US/docs/Web/JavaScript)
[![No Framework](https://img.shields.io/badge/Framework-None-green)]()

## 🎯 **Fonctionnalités Principales**

### 💎 **Design Premium**
- **Style haut de gamme** inspiré Simon Cuisine
- **Palette harmonieuse** : beige chaud, anthracite, noyer, cuivré
- **Mode sombre automatique** (prefers-color-scheme)
- **Typographie Google Fonts** : Montserrat (titres) + Source Sans 3 (textes)
- **Micro-animations** subtiles et transitions fluides (150-250ms)

### 📱 **Expérience Utilisateur**
- **Navigation sticky** responsive avec menu hamburger mobile
- **Galerie lightbox** avec navigation clavier (←→, ESC) et touch (swipe)
- **Lazy loading intelligent** avec placeholders canvas générés
- **Formulaire avancé** avec validation temps réel et UX soignée
- **Accessibilité AA** : ARIA, landmarks, navigation clavier

### ⚡ **Performance Optimisée**
- **Aucun framework** : HTML/CSS/JS pur
- **CSS optimisé** : 17KB avec variables CSS et grid moderne
- **JavaScript moderne** : 26KB, ES6+, classes, async/await
- **Images WebP** avec srcset responsive et fallbacks
- **Intersection Observer** pour animations performantes

## 📁 **Structure du Projet**

```
ébénisterie-daniel-chamberland/
├── 📄 index.html              # Accueil avec hero plein écran
├── 📄 realisations.html       # Galerie projets avec filtres
├── 📄 a-propos.html          # Portrait Daniel + valeurs
├── 📄 processus.html         # 5 étapes illustrées
├── 📄 contact.html           # Formulaire + infos complètes
├── 🎨 style.css              # CSS premium (17KB)
├── ⚙️ script.js              # JavaScript moderne (26KB)
├── 📊 sitemap.xml            # SEO optimisé
├── 🤖 robots.txt             # Directives crawl
└── 📁 assets/
    ├── 📋 content.json       # Données projets/témoignages
    ├── 🎨 logo.svg           # Logo vectoriel
    ├── 🌟 favicon.svg        # Favicon moderne
    └── 📁 img/               # Images projets (WebP)
```

## 🎨 **Design System**

### Palette de Couleurs
```css
:root {
  --bg: #f7f3ee;              /* Beige chaud principal */
  --text: #1f1f1f;            /* Anthracite textes */
  --primary: #7a5230;         /* Noyer signature */
  --accent: #c48f59;          /* Cuivré accent */
  
  /* Mode sombre automatique via @media (prefers-color-scheme: dark) */
}
```

### Typographie
- **Titres** : Montserrat (600/700/800) - Élégance moderne
- **Textes** : Source Sans 3 (300/400/600) - Lisibilité optimale
- **Échelle harmonieuse** : clamp() pour responsive fluide

### Composants
- **Boutons** : Border-radius 14px, ombres subtiles, états hover
- **Cartes** : Élévation progressive, transitions 250ms
- **Navigation** : Sticky backdrop-blur, indicateurs actifs
- **Formulaires** : États focus soignés, validation visuelle

## 🔧 **Fonctionnalités Techniques**

### JavaScript Moderne (ES6+)
```javascript
class EbenisterieApp {
  // ✅ Architecture orientée objet
  // ✅ Async/await pour fetch API
  // ✅ Intersection Observer pour animations
  // ✅ Touch events pour mobile
  // ✅ Throttling/debouncing pour performance
  // ✅ Gestion d'état propre
}
```

### CSS Avancé
- **CSS Grid** + **Flexbox** pour layouts complexes
- **Custom Properties** pour thématisation
- **Container queries** ready
- **Logical properties** pour i18n
- **Cascade layers** structure

### Optimisations Performance
- **Lazy loading** natif + Intersection Observer fallback
- **Preconnect** Google Fonts
- **Resource hints** critiques
- **Image placeholders** générés dynamiquement
- **Throttling** événements scroll/resize

## 📊 **Contenu & SEO**

### Données Structurées
```json
{
  "@type": "LocalBusiness",
  "name": "Ébénisterie Daniel Chamberland",
  "description": "Atelier d'ébénisterie haut de gamme...",
  "address": "350, rue Boyle, Charlesbourg, QC G2M 1H9",
  "telephone": "(418) 563-6781",
  "email": "eben.dc@ccapcable.com"
}
```

### 6 Projets Documentés
1. **Cuisine noyer moderne** - Design contemporain, îlot central
2. **Manteau foyer pierre/chêne** - Alliance tradition/modernité  
3. **Meuble TV suspendu** - Minimalisme, technologie intégrée
4. **Walk-in luxueux** - Organisation optimale, finitions haut de gamme
5. **Bibliothèque complexe** - Architecture sur mesure, échelle coulissante
6. **Vanité spa** - Teck marine, double vasque, résistance humidité

### SEO Complet
- **Schema.org JSON-LD** (LocalBusiness + Organization)
- **Open Graph** + **Twitter Cards**
- **Sitemap XML** structuré
- **Meta descriptions** optimisées
- **Alt texts** descriptifs
- **Robots.txt** configuré

## 📞 **Informations Entreprise**

**Ébénisterie Daniel Chamberland**
- 📍 **Adresse** : 350, rue Boyle, Charlesbourg, QC G2M 1H9
- ☎️ **Téléphone** : [(418) 563-6781](tel:+14185636781)
- 📠 **Fax** : (418) 849-7710
- ✉️ **Courriel** : [eben.dc@ccapcable.com](mailto:eben.dc@ccapcable.com)

**Horaires**
- 🕐 **Lun-Ven** : 7h30 - 16h30
- 🕐 **Samedi** : Sur rendez-vous
- 🕐 **Dimanche** : Fermé

**Spécialités**
- 🏠 Cuisines sur mesure haut de gamme
- 🔥 Manteaux de foyer personnalisés  
- 📚 Mobilier architectural complexe
- 🛁 Vanités et rangements étanches

## 🚀 **Déploiement**

### GitHub Pages
```bash
# Le site est prêt pour GitHub Pages
# Structure racine avec .nojekyll
git push origin main
# Activer Pages dans Settings > Pages > Deploy from branch: main
```

### Autres Plateformes
- **Netlify** : Drag & drop ou connexion GitHub
- **Vercel** : Import automatique avec détection
- **Cloudflare Pages** : CI/CD intégré

### Intégrations Futures
- **Formspree** : Remplacer `action="mailto:"` par endpoint Formspree
- **CMS Headless** : Structure content.json compatible Strapi/Contentful
- **Analytics** : Interface préparée pour Google Analytics 4
- **Newsletter** : Integration Mailchimp/ConvertKit ready

## 🛠️ **Développement Local**

### Démarrage Rapide
```bash
# Cloner le repository
git clone <repository-url>
cd ebenisterie-daniel-chamberland

# Serveur local (choix multiple)
python -m http.server 8080
# ou
npx serve .
# ou  
php -S localhost:8080
```

### Architecture Modulaire
```javascript
// Structure extensible
EbenisterieApp/
├── Navigation     // Menu responsive + états actifs
├── Lightbox      // Galerie avec navigation complète  
├── Forms         // Validation + soumission
├── Animations    // Intersection Observer + transitions
├── LazyLoading   // Images + placeholders
└── Utils         // Throttle, debounce, helpers
```

## ✨ **Améliorations Futures**

### Phase 2 Envisagée
- [ ] **Service Worker** pour cache offline
- [ ] **Web App Manifest** (PWA)
- [ ] **Images réelles** haute résolution (WebP + AVIF)
- [ ] **Page projet détail** dynamique
- [ ] **Système de filtres** avancé réalisations
- [ ] **Témoignages** carrousel automatique
- [ ] **Contact** intégration calendly
- [ ] **Blog** section conseils/actualités

### Optimisations Techniques
- [ ] **Critical CSS** inlining
- [ ] **Image sprites** pour icônes
- [ ] **Compression Brotli** serveur
- [ ] **HTTP/3** support
- [ ] **WebP/AVIF** conversion automatique
- [ ] **Lighthouse** score 100/100

## 👥 **Crédits**

**Développement** : Assistant IA spécialisé  
**Design** : Inspiré Simon Cuisine & tendances 2024  
**Entreprise** : Ébénisterie Daniel Chamberland, Charlesbourg  
**Technologies** : HTML5, CSS3, JavaScript ES6+, aucun framework

---

## 🔗 **Liens Utiles**

- 🌐 **[Demo Live](https://8080-imjntyyno3ntbpsg56dt6-6532622b.e2b.dev)**
- 📧 **[Contact Entreprise](mailto:eben.dc@ccapcable.com)**
- ☎️ **[Téléphone Direct](tel:+14185636781)**
- 📍 **[Google Maps](https://maps.google.com/?q=350+rue+Boyle+Charlesbourg+QC)**

> **Site web premium créé avec passion pour l'artisanat québécois d'exception** 🍁✨