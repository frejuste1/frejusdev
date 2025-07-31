# 💼 FrejusDev Fullstack

FrejusDev est mon portail professionnel intelligent : un mélange de vitrine, d’agent d'accueil et de business developer automatisé 💼✨  
Un projet fullstack qui incarne l’autonomie, la créativité et la performance numérique.

---

## 🎯 Objectif

Construire un écosystème web modulaire, rapide et scalable permettant de :

- Gérer du contenu dynamique (CMS headless-like)
- Intégrer des services backend intelligents (API REST/GraphQL)
- Mettre en place des interfaces modernes et accessibles
- Déployer automatiquement sur le cloud (CI/CD)
- Exploiter la donnée (dashboards, analytics)

---

## 🧩 Stack technique

### Frontend

- ⚛️ **React** + **Vite**
- 🎨 **Tailwind CSS** (avec design system modulable)
- 🔌 **Axios** pour les appels API
- 🌍 **React Router**, **React Hook Form**, **Zod**, **Framer Motion**, etc.

### Backend

- 🛠️ **Node.js** + **Express**
- 🗄️ **MongoDB** avec **Mongoose**
- 🔐 Authentification JWT (ou OAuth2 plus tard)
- 🧠 Services modulaires (contact, mailer, simulateur IA)
- 🧪 **Jest**, **Supertest**, **Postman** pour tests

---

## 🏗️ Structure du projet

```bash
frejusdev/
│
├── frontend/               # React + Vite app
│   ├── public/
│   └── src/
│       ├── components/     # UI réutilisable
│       ├── pages/          # Pages et routes
│       ├── styles/         # Fichiers CSS ou Tailwind config
│       ├── hooks/          # Custom React hooks
│       ├── utils/          # Fonctions utilitaires
│       ├── layouts/        # Layouts principaux
│       ├── services/       # Appels API
│       ├── App.jsx
│       ├── index.css
│       ├── App.css
│       └── main.jsx
│   ├── .gitignore
│   ├── index.html
│   ├── vite.config.js
│   ├── package.json
│   └── README.md

├── backend/                # Express app
│   ├── src/
│   │   ├── models/         # Schémas Mongoose
│   │   ├── routes/         # Définition des routes API
│   │   ├── services/       # Logique métier
│   │   ├── controllers/    # Méthodes des endpoints
│   │   ├── middlewares/    # Authentification, erreurs, etc.
│   │   ├── config/         # Connexion DB, options diverses
│   │   ├── utils/          # Fonctions utiles globales
│   │   └── index.js
│   ├── .gitignore
│   ├── .env
│   ├── server.js
│   ├── package.json
│   └── README.md
│
├── .gitignore
└── README.md
```

## 🌟 Fonctionnalités prévues

- 🧠 **Simulateur de devis intelligent** :
    - Upload de cahier des charges
    - Analyse automatique via Gemini
    - Génération de devis personnalisé selon ton tarif et ton workflow
    - Possibilité de valider, enregistrer ou contacter 

- 📬 **Espace contact** : 
    - Formulaire dynamique
    - Envoi de mails (Resend.)
    - Stockage des leads (MongoDB)

- ⚙️ **Espace admin privé** :
    - Authentification JWT
    - Gestion des projets, devis, messages, offres

- 📤 **Upload d’images** :
    - Intégration avec Cloudinary ou Uploadcare
    - Système de preview & compression

- 🖼️ Page portfolio dynamique :
    - Projets injectés via API
    - Filtrage, animation, preview mobile/web

- 🔐 **Sécurité** :
    - Protection contre les injections, XSS
    - Rate-limiting et logs de requêtes

## 🔧 Déploiement (gratuit au départ)

| Besoin               | Outil gratuit                                  |
| -------------------- | ---------------------------------------------- |
| Hébergement Frontend | **Vercel**                                     |
| Hébergement Backend  | **Render**                                     |
| DB Mongo             | **MongoDB Atlas Free Tier**                    |
| Mail                 | **Resend**                                     |
| Upload               | **Cloudinary Free**                            |
| IA Devis             | **Gemini API** (via Google Cloud)              |

## 🧠 Vision

> "Je ne code pas seulement un portfolio. Je construis une machine à créer des connexions, à qualifier des projets, à automatiser la rencontre entre besoin et solution."

---

Ce projet est la première brique d’un système plus large, où le développeur devient aussi conseiller, prestataire, et automate bienveillant.

## 📄 Licence

MIT — © 2025 Kei Prince Frejuste
Tu peux utiliser, forker, contribuer. Mais n'oublie pas d’honorer l’âme du projet : l’audace bien codée.

---