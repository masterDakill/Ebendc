#!/bin/bash

# Script d'aide pour ajouter des images au site
# Ébénisterie Daniel Chamberland

echo "🪵 === Ébénisterie Daniel Chamberland - Ajout d'Images ==="
echo ""

# Couleurs pour le terminal
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

# Dossiers
IMG_DIR="/home/user/webapp/assets/img"
PROJETS_DIR="$IMG_DIR/projets"
LOGOS_DIR="$IMG_DIR/logos"
HERO_DIR="$IMG_DIR/hero"

echo -e "${BLUE}📁 Structure des dossiers:${NC}"
echo "   📂 $PROJETS_DIR   → Photos de réalisations"
echo "   📂 $LOGOS_DIR     → Votre logo"
echo "   📂 $HERO_DIR      → Image d'accueil"
echo ""

# Menu principal
echo -e "${YELLOW}Que voulez-vous faire?${NC}"
echo "1) Télécharger une image depuis une URL"
echo "2) Lister les images actuelles"
echo "3) Renommer une image"
echo "4) Voir l'espace disponible"
echo "5) Afficher le guide complet"
echo "0) Quitter"
echo ""
read -p "Votre choix (0-5): " choice

case $choice in
    1)
        echo ""
        echo -e "${GREEN}📥 Téléchargement d'image${NC}"
        echo ""
        echo "Dans quel dossier?"
        echo "1) Projets (réalisations)"
        echo "2) Logo"
        echo "3) Hero (image d'accueil)"
        read -p "Choix: " folder_choice
        
        case $folder_choice in
            1) TARGET_DIR=$PROJETS_DIR ;;
            2) TARGET_DIR=$LOGOS_DIR ;;
            3) TARGET_DIR=$HERO_DIR ;;
            *) echo -e "${RED}Choix invalide${NC}"; exit 1 ;;
        esac
        
        read -p "URL de l'image: " image_url
        read -p "Nom du fichier (ex: cuisine-noyer-1.jpg): " filename
        
        echo ""
        echo -e "${BLUE}Téléchargement en cours...${NC}"
        
        if curl -f -o "$TARGET_DIR/$filename" "$image_url"; then
            echo -e "${GREEN}✓ Image téléchargée avec succès!${NC}"
            echo "   📁 $TARGET_DIR/$filename"
            ls -lh "$TARGET_DIR/$filename"
        else
            echo -e "${RED}✗ Erreur lors du téléchargement${NC}"
        fi
        ;;
        
    2)
        echo ""
        echo -e "${GREEN}📋 Images actuelles:${NC}"
        echo ""
        echo -e "${BLUE}=== PROJETS ===${NC}"
        ls -lh $PROJETS_DIR 2>/dev/null || echo "   (vide)"
        echo ""
        echo -e "${BLUE}=== LOGOS ===${NC}"
        ls -lh $LOGOS_DIR 2>/dev/null || echo "   (vide)"
        echo ""
        echo -e "${BLUE}=== HERO ===${NC}"
        ls -lh $HERO_DIR 2>/dev/null || echo "   (vide)"
        ;;
        
    3)
        echo ""
        echo -e "${GREEN}✏️  Renommer une image${NC}"
        echo ""
        read -p "Chemin complet de l'image actuelle: " old_path
        read -p "Nouveau nom: " new_name
        
        new_path="$(dirname $old_path)/$new_name"
        
        if [ -f "$old_path" ]; then
            mv "$old_path" "$new_path"
            echo -e "${GREEN}✓ Image renommée!${NC}"
            echo "   $old_path"
            echo "   → $new_path"
        else
            echo -e "${RED}✗ Fichier introuvable${NC}"
        fi
        ;;
        
    4)
        echo ""
        echo -e "${GREEN}💾 Espace disque:${NC}"
        df -h $IMG_DIR
        echo ""
        echo -e "${BLUE}Taille des dossiers d'images:${NC}"
        du -sh $IMG_DIR/*
        ;;
        
    5)
        echo ""
        cat /home/user/webapp/GUIDE-IMAGES.md
        ;;
        
    0)
        echo -e "${BLUE}Au revoir! 🪵${NC}"
        exit 0
        ;;
        
    *)
        echo -e "${RED}Choix invalide${NC}"
        exit 1
        ;;
esac

echo ""
echo -e "${YELLOW}Appuyez sur Entrée pour continuer...${NC}"
read
