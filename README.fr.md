# DigiShoppingCard PWA 🪪

Une application web progressive (PWA) moderne, rapide et sécurisée pour numériser vos cartes de fidélité.

## ✨ Caractéristiques
- **Scan Rapide**: Ajoutez des cartes en scannant le code-barres avec votre appareil photo.
- **Recherche Rapide**: Trouvez instantanément votre carte en tapant le nom du magasin dans la barre de recherche.
- **Catégories**: Organisez votre collection en regroupant les cartes par Courses, Mode, High-Tech, Santé, et plus encore.
- **Partage QR (QR Transfer)**: Partagez instantanément vos cartes avec votre famille et vos amis en générant un code QR qui peut être scanné directement depuis l'application d'un autre utilisateur.
- **Géolocalizzazione Intelligente**: L'application apprend où vous utilisez vos cartes et les affiche en haut de la liste lorsque vous êtes à proximité du magasin.
- **Design Premium**: Interface mobile optimisée avec mode sombre, animations fluides et icônes nettes.
- **Fonctionnement Hors ligne**: Fonctionne sans connexion internet une fois installée sur votre appareil.

## 🔒 Sécurité et Confidentialité (Conforme RGPD)
L'application est conçue selon le principe de **Privacy by Design** :

- **Local-First**: Toutes les données de vos cartes sont enregistrées exclusivement dans le `localStorage` de votre navigateur. Aucune donnée n'est envoyée à des serveurs centraux.
- **Sauvegarde Chiffrée**: Les sauvegardes exportées peuvent être protégées par un chiffrement **AES-256-GCM**. Les données ne sont en clair que sur votre appareil ; si elles sont protégées par mot de passe, elles voyagent chiffrées sur Internet (ex: vers iCloud ou Google Drive).
- **Protection XSS**: Le rendu des données utilise des méthodes sécurisées (`textContent`) pour prévenir les attaques par injection de script.
- **Transparence**: La géolocalisation utilise OpenStreetMap pour vérifier les magasins à proximité. Aucune donnée identifiant l'utilisateur n'est envoyée.
- **Prêt pour le RGPD**: Pas de profilage, pas d'inscription requise. L'utilisateur a un contrôle total (droit à l'oubli et portabilité) sur ses informations.

## 🚀 Stack Technique
- **Vanilla JavaScript**: Zéro framework lourd pour une performance maximale.
- **Vite**: Pour un build rapide et optimisé.
- **Lucide Icons**: Icônes vectorielles élégantes et nettes.
- **BWIP-JS**: Génération de codes-barres de haute précision.
- **HTML5-QRCode**: Moteur de scan robuste et fiable.
- **GitHub Pages**: Hébergement statique sécurisé et résilient.

## 📱 Installation
Ouvrez [https://skinny1973.github.io/digishoppingcard/](https://skinny1973.github.io/digishoppingcard/) sur votre smartphone et utilisez la fonction "Ajouter à l'écran d'accueil" de votre navigateur.
