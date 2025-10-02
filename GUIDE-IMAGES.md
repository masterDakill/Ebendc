# 📸 Guide d'Ajout d'Images - Ébénisterie Daniel Chamberland

## 📁 Structure des Dossiers

Vos images doivent être placées dans:
```
/home/user/webapp/assets/img/
├── logos/          → Votre logo (versions différentes)
├── hero/           → Image principale page d'accueil
└── projets/        → Photos de vos réalisations
```

---

## 🎯 ÉTAPE 1: Préparer Vos Images

### **Logo (assets/img/logos/)**
- **Nom suggéré:** `logo-dc.svg` ou `logo-dc.png`
- **Format:** SVG (vectoriel) ou PNG (transparent)
- **Taille:** Minimum 200x200px, idéalement 500x500px
- **Usage:** Navigation, footer, favicon

**Variations possibles:**
- `logo-light.png` → Logo pour fond clair
- `logo-dark.png` → Logo pour fond foncé
- `logo-square.png` → Version carrée pour réseaux sociaux

### **Image Hero (assets/img/hero/)**
- **Nom suggéré:** `hero-atelier.jpg` ou `hero-workshop.jpg`
- **Format:** JPG ou WebP
- **Taille:** 1920x1080px minimum (Full HD)
- **Ratio:** 16:9 pour meilleur affichage
- **Usage:** Grande image d'accueil en haut de la page
- **Sujet:** Photo de votre atelier, d'une belle réalisation, ou vous au travail

### **Photos de Projets (assets/img/projets/)**

Pour chaque projet, avoir **4-6 photos** sous différents angles:

#### **Projet 1: Cuisine Noyer**
```
cuisine-noyer-1.jpg  → Vue d'ensemble
cuisine-noyer-2.jpg  → Détail des tiroirs/portes
cuisine-noyer-3.jpg  → Îlot central
cuisine-noyer-4.jpg  → Détail finitions/bois
cuisine-noyer-5.jpg  → Vue avec éclairage
```

#### **Projet 2: Manteau Foyer**
```
manteau-pierre-1.jpg → Vue frontale complète
manteau-pierre-2.jpg → Détail du bois
manteau-pierre-3.jpg → Détail de la pierre
manteau-pierre-4.jpg → Vue d'ambiance avec feu
```

#### **Projet 3: Meuble TV**
```
meuble-tv-1.jpg → Vue d'ensemble
meuble-tv-2.jpg → Détail du bois
meuble-tv-3.jpg → Portes ouvertes/rangements
meuble-tv-4.jpg → Vue de côté
meuble-tv-5.jpg → Détail finitions
```

#### **Projet 4: Walk-in (Garde-robe)**
```
garde-robe-1.jpg → Vue d'entrée
garde-robe-2.jpg → Rangements vêtements
garde-robe-3.jpg → Tiroirs/accessoires
garde-robe-4.jpg → Vue complète organisée
```

#### **Projet 5: Bibliothèque**
```
bibliotheque-1.jpg → Vue complète du sol au plafond
bibliotheque-2.jpg → Détail des étagères
bibliotheque-3.jpg → Bureau intégré
bibliotheque-4.jpg → Échelle coulissante
bibliotheque-5.jpg → Livres installés
```

#### **Projet 6: Vanité Salle de Bain**
```
vanite-spa-1.jpg → Vue complète double vasque
vanite-spa-2.jpg → Détail du marbre
vanite-spa-3.jpg → Tiroirs ouverts
vanite-spa-4.jpg → Vue avec miroirs/éclairage
```

---

## 🔧 ÉTAPE 2: Formats et Optimisation

### **Formats Acceptés**
- ✅ **JPG/JPEG** → Photos de projets
- ✅ **PNG** → Logo avec transparence
- ✅ **SVG** → Logo vectoriel (meilleur)
- ✅ **WebP** → Format moderne (recommandé)

### **Tailles Recommandées**
- **Logo:** 200-500px
- **Hero:** 1920x1080px (Full HD)
- **Photos projets:** 1200-1600px de largeur
- **Poids:** Maximum 500KB par image (idéalement 200-300KB)

### **Noms de Fichiers**
- ❌ **Éviter:** `IMG_1234.jpg`, `Photo 05-10-2024.jpg`
- ✅ **Bon:** `cuisine-noyer-1.jpg`, `logo-dc.png`
- **Format:** minuscules, tirets, sans espaces, sans accents

---

## 🚀 ÉTAPE 3: Méthodes d'Ajout

### **Méthode A: Vous Me Donnez les URLs**

1. **Uploadez vos images sur GenSpark** (bouton upload dans le chat)
2. **Copiez les URLs générées**
3. **Dites-moi où les placer:**
   ```
   "Voici mon logo: https://page.gensparksite.com/v1/base64_upload/xxxxx"
   "Voici 5 photos cuisine: [liste des URLs]"
   "Photo 1 = vue d'ensemble, Photo 2 = détail tiroirs, etc."
   ```
4. **Je les télécharge et optimise automatiquement**

### **Méthode B: Via Terminal/Frame**

Si vous pouvez accéder au terminal:
```bash
# Naviguer vers le dossier projets
cd /home/user/webapp/assets/img/projets

# Télécharger une image depuis une URL
curl -o cuisine-noyer-1.jpg "https://votre-url-image.com/photo.jpg"
```

### **Méthode C: Glisser-Déposer (Frame)**

Si votre environnement le permet:
1. Ouvrir le dossier `/home/user/webapp/assets/img/projets`
2. Glisser-déposer vos fichiers directement
3. Renommer selon la convention

---

## 📝 ÉTAPE 4: Mise à Jour du Site

Une fois vos images ajoutées, je dois mettre à jour:

### **1. Logo (automatique)**
```html
<!-- Le logo sera automatiquement utilisé dans: -->
- Navigation (toutes les pages)
- Footer
- Favicon
```

### **2. Image Hero**
```html
<!-- Page d'accueil, section hero -->
<div class="hero-bg" style="background-image: url('./assets/img/hero/hero-atelier.jpg')">
```

### **3. Photos Projets**
Le fichier `content.json` sera automatiquement mis à jour avec vos nouvelles images.

---

## 💡 EXEMPLE COMPLET

### **Scénario: Vous avez 3 photos de cuisine**

**Vous me dites:**
```
"Voici 3 photos de ma cuisine en noyer:
1. https://page.gensparksite.com/v1/base64_upload/abc123 (vue d'ensemble)
2. https://page.gensparksite.com/v1/base64_upload/def456 (détail îlot)
3. https://page.gensparksite.com/v1/base64_upload/ghi789 (détail tiroirs)
"
```

**Je fais:**
```bash
# Télécharge les 3 images
curl -o assets/img/projets/cuisine-noyer-1.jpg "URL1"
curl -o assets/img/projets/cuisine-noyer-2.jpg "URL2"
curl -o assets/img/projets/cuisine-noyer-3.jpg "URL3"

# Met à jour le site automatiquement
# Les images apparaissent dans la galerie
```

---

## ✅ CHECKLIST FINALE

Avant d'ajouter vos images, vérifiez:

- [ ] **Qualité:** Photos nettes, bien éclairées, professionnelles
- [ ] **Format:** JPG pour photos, PNG/SVG pour logo
- [ ] **Taille:** Pas trop lourdes (max 500KB)
- [ ] **Noms:** Descriptifs et sans espaces
- [ ] **Quantité:** 4-6 photos par projet minimum
- [ ] **Variété:** Vues d'ensemble + détails + ambiance

---

## 🎯 PRÊT À COMMENCER?

**Dites-moi:**
1. **Avez-vous vos images prêtes?**
2. **Quel format? (URLs / Fichiers locaux)**
3. **Quel projet en premier?** (Logo / Hero / Projets)

Je m'occupe du reste! 🪵✨

---

## 📞 Besoin d'Aide?

- **Optimisation d'images?** → Je peux les compresser automatiquement
- **Conversion de format?** → Je peux convertir JPG → WebP
- **Renommage en masse?** → Je peux renommer automatiquement
- **Redimensionnement?** → Je peux ajuster les dimensions

**Dites-moi ce dont vous avez besoin!** 😊
