# Chat Room Application

Une application de chat en temps réel avec authentification sécurisée via cookies et JSON Web Tokens (JWT). Les utilisateurs peuvent s'inscrire, se connecter et accéder à une seule salle de chat pour échanger des messages en temps réel.

## Fonctionnalités

- **Enregistrement et Authentification des Utilisateurs** : Processus d'inscription et de connexion sécurisé avec authentification JWT.
- **Gestion de Session par Cookies** : Utilisation de cookies HTTP-only pour la gestion des sessions utilisateur.
- **Chat en Temps Réel** : Une salle de chat unique avec diffusion en temps réel des messages.

## Technologies Utilisées

- **Backend** : FastAPI pour l'API et la logique serveur
- **Base de Données** : PostgreSQL pour la gestion des utilisateurs et l'historique des messages
- **Authentification** : JSON Web Tokens (JWT) et cookies pour la gestion des sessions
- **Communication en Temps Réel** : WebSocket

## Installation et Configuration

### Prérequis

- node 

### Étapes d'Installation

1. **Cloner le Dépôt**
   ```bash
   git clone https://github.com/votreutilisateur/chat-room-app.git
   cd chat-room-app
2. **Installer les Dépendances**
   ```bash
   pip install -r requirements.txt
3. **Configurer les Variables d’Environnement**
   ```bash
   DATABASE_URL=your_postgresql_connection_string

4. **Démarrer l’Application**
   ```bash
   npm start

Le serveur sera disponible sur http://localhost:8000.

