# Ébénisterie Daniel Chamberland

Site web statique élégant et responsive pour présenter l'entreprise d'ébénisterie Daniel Chamberland, spécialisée en manteaux de foyer, meubles sur mesure et armoires.

## 🌟 Caractéristiques

- **Design responsive** : Optimisé pour mobile, tablette et desktop
- **Navigation fluide** : Menu fixe avec défilement fluide vers les sections
- **Palette de couleurs naturelles** : Inspirée du bois (brun, beige, anthracite)
- **Animations subtiles** : Effets au survol et animations d'apparition
- **Formulaire de contact** : Avec validation en temps réel et intégration mailto
- **Performance optimisée** : Code pur HTML/CSS/JS sans frameworks lourds

## 📁 Structure du projet

```
/
├── index.html              # Page principale
├── css/
│   └── style.css          # Styles CSS avec design responsive
├── js/
│   └── script.js          # JavaScript pour interactions
├── images/                # Dossier pour les futures images
└── README.md             # Documentation
```

## 🎨 Sections du site

### 1. **Accueil (Hero)**
- Bannière avec slogan accrocheur
- Boutons d'appel à l'action
- Design visuel impactant

### 2. **Nos Réalisations**
- Galerie responsive en grille
- Effets au survol avec descriptions
- Images placeholder avec icônes thématiques

### 3. **À Propos**
- Présentation de Daniel Chamberland
- Valeurs de l'entreprise (4 piliers)
- Citation inspirante
- Portrait placeholder

### 4. **Contact**
- Formulaire avec validation
- Informations de contact complètes
- Intégration mailto pour envoi d'emails

### 5. **Footer**
- Coordonnées de l'entreprise
- Liens vers les réseaux sociaux
- Navigation rapide

## 🎯 Fonctionnalités techniques

### Navigation
- Menu fixe en haut de page
- Navigation mobile avec menu hamburger
- Défilement fluide entre les sections
- Mise à jour automatique du lien actif

### Responsive Design
- Grille CSS Grid et Flexbox
- Breakpoints optimisés : 768px, 1024px
- Images et textes adaptatifs
- Menu mobile ergonomique

### Interactions JavaScript
- Validation de formulaire en temps réel
- Animations d'apparition au défilement
- Gestion des états hover et focus
- Performance optimisée avec throttling

### Accessibilité
- Navigation au clavier
- Contrastes respectant les standards
- Attributs ARIA appropriés
- Support des préférences d'animation réduite

## 🚀 Déploiement

### GitHub Pages
1. Pusher le code vers un repository GitHub
2. Aller dans Settings > Pages
3. Sélectionner "Deploy from a branch"
4. Choisir la branche `main` et le dossier `/` (root)

### Autres plateformes
- **Netlify** : Glisser-déposer le dossier ou connecter le repo GitHub
- **Vercel** : Import depuis GitHub avec détection automatique
- **GitHub Codespaces** : Développement dans le cloud

## 🎨 Personnalisation

### Couleurs (CSS Variables)
```css
:root {
    --primary-brown: #8B4513;    /* Brun principal */
    --light-brown: #D2B48C;      /* Beige clair */
    --dark-brown: #654321;       /* Brun foncé */
    --anthracite: #2F2F2F;       /* Anthracite */
    --accent-gold: #CD853F;      /* Accent doré */
    --warm-beige: #F5E6D3;       /* Beige chaud */
    --cream: #FFF8E7;            /* Crème */
}
```

### Typographie
- **Titres** : Playfair Display (serif, élégant)
- **Corps** : Open Sans (sans-serif, lisible)

### Images
Remplacer les placeholders dans le dossier `/images/` :
- Logo de l'entreprise
- Photos des réalisations (6 images recommandées)
- Portrait de Daniel Chamberland

## 📱 Compatibilité

- ✅ Chrome 80+
- ✅ Firefox 75+
- ✅ Safari 13+
- ✅ Edge 80+
- ✅ Appareils mobiles iOS/Android

## 📞 Contact entreprise

**Ébénisterie Daniel Chamberland**
- 📍 350 rue Boyle, Charlesbourg, QC G2M 1H9
- ☎️ (418) 563-6781
- 📠 (418) 849-7710 (Fax)
- ✉️ eben.dc@ccapcable.com

## 🛠️ Développement

### Prérequis
Aucun ! Site en HTML/CSS/JS pur, ouvrez simplement `index.html` dans un navigateur.

### Pour le développement local
```bash
# Serveur local simple avec Python
python -m http.server 8000

# Ou avec Node.js (si installé)
npx serve .

# Ou avec PHP (si installé)
php -S localhost:8000
```

### Optimisations futures
- [ ] Ajouter de vraies images haute qualité
- [ ] Intégrer un CMS headless (optionnel)
- [ ] Ajouter Google Analytics
- [ ] Optimiser le SEO avec métadonnées enrichies
- [ ] Ajouter un sitemap.xml
- [ ] Intégrer un service de newsletter

---

**Créé avec passion pour l'artisanat québécois** 🪵✨