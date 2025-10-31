# CodeFolio - API GraphQL pour Portfolio Personnel

API backend GraphQL moderne développée en Node.js (TypeScript), Express et MongoDB pour gérer le contenu d'un portfolio personnel.

## 📋 Fonctionnalités

- **GraphQL API** avec Apollo Server
- **Authentification JWT** avec rôles (ADMIN/VISITOR)
- **MongoDB** avec Mongoose ODM
- **Architecture en couches** : Controllers, Services, Repositories
- **Sécurité** : Helmet, CORS, Rate Limiting
- **Docker** : Conteneurisation prête à l'emploi

## 🏗️ Structure du Projet

```
CodeFolio/
├── app/
│   ├── config/          # Configuration (DB, environnement)
│   ├── models/          # Schémas Mongoose
│   ├── repositories/    # Accès à la base de données
│   ├── services/        # Logique métier
│   ├── graphql/         # Schéma GraphQL (typeDefs + resolvers)
│   └── http/
│       └── Middlewares/ # Authentification
├── scripts/
│   └── seedAdmin.ts     # Script pour créer un admin
├── index.ts             # Point d'entrée
├── Dockerfile
├── docker-compose.yml
└── package.json
```

## 🚀 Installation

### Prérequis

- Node.js 20+
- MongoDB ou Docker
- npm ou yarn

### Installation locale

1. **Cloner le projet**
   ```bash
   git clone <repo-url>
   cd ReadFolio
   ```

2. **Installer les dépendances**
   ```bash
   npm install
   ```

3. **Configurer l'environnement**
   Créez un fichier `.env` à la racine :
   ```env
   PORT=4000
   NODE_ENV=development
   MONGODB_URI=mongodb://localhost:27017/codefolio
   JWT_SECRET=your-super-secret-jwt-key-change-in-production
   JWT_EXPIRES_IN=8h
   ADMIN_USERNAME=admin
   ADMIN_PASSWORD=admin123
   ```

4. **Lancer MongoDB**
   - Local : Assurez-vous que MongoDB est démarré
   - Docker : `docker-compose up mongodb -d`

5. **Créer un utilisateur admin**
   ```bash
   npm run seed:admin
   ```

6. **Lancer le serveur**
   ```bash
   npm run dev
   ```

   Le serveur sera accessible sur : `http://localhost:4000/graphql`

### Installation avec Docker

1. **Construire et lancer les conteneurs**
   ```bash
   docker-compose up --build
   ```

2. **Créer un utilisateur admin**
   ```bash
   npm run seed:admin
   ```

## 📚 Modèles de Données

### User
- `username` : Identifiant unique
- `passwordHash` : Mot de passe haché
- `role` : ADMIN ou VISITOR

### Profil
- `fullname` : Nom complet
- `title` : Titre professionnel
- `bio` : Biographie
- `avatarUrl` : URL de l'avatar
- `socialLinks` : Liens sociaux
- `contact` : Informations de contact

### Projet
- `title` : Titre du projet
- `summary` : Résumé
- `description` : Description détaillée
- `repoUrl` : URL du repo Git
- `liveUrl` : URL du projet en ligne
- `category` : Catégorie
- `technologies` : Array de technologies
- `tags` : Tags associés
- `images` : Images du projet
- `dateStart/dateEnd` : Dates
- `featured` : Projet mis en avant

### Competence
- `name` : Nom de la compétence
- `level` : Niveau (1-5)

### Experience
- `title` : Titre du poste
- `company` : Entreprise
- `startDate/endDate` : Dates
- `description` : Description
- `location` : Localisation

### Technologie
- `name` : Nom de la technologie
- `category` : Catégorie
- `logoUrl` : URL du logo

## 🔐 Authentification

### Login

```graphql
mutation {
  login(username: "admin", password: "admin123") {
    token
    userId
    role
  }
}
```

### Utilisation du token

Ajoutez le header suivant à vos requêtes GraphQL :

```
Authorization: Bearer <your-token>
```

## 📖 Exemples de Requêtes GraphQL

### Queries Publiques

#### Obtenir tout le portfolio
```graphql
query {
  getPortfolio {
    profil {
      fullname
      title
      bio
      avatarUrl
    }
    projets {
      title
      summary
      category
      technologies {
        name
        category
      }
    }
    competences {
      name
      level
    }
    experiences {
      title
      company
      startDate
    }
    technologies {
      name
      category
      logoUrl
    }
  }
}
```

#### Obtenir les projets
```graphql
query {
  getProjets(limit: 10, skip: 0) {
    id
    title
    summary
    featured
    technologies {
      name
    }
  }
}
```

### Mutations Protégées (ADMIN uniquement)

#### Mettre à jour le profil
```graphql
mutation {
  updateProfil(input: {
    fullname: "John Doe"
    title: "Full Stack Developer"
    bio: "Passionate developer"
    contact: {
      email: "john@example.com"
      location: "Paris, France"
    }
    socialLinks: [
      { platform: "GitHub", url: "https://github.com/john" }
      { platform: "LinkedIn", url: "https://linkedin.com/in/john" }
    ]
  }) {
    id
    fullname
    title
  }
}
```

#### Créer un projet
```graphql
mutation {
  createProjet(input: {
    title: "Mon Projet"
    summary: "Un projet incroyable"
    description: "Description détaillée..."
    category: "Web Development"
    technologies: ["tech-id-1", "tech-id-2"]
    tags: ["react", "nodejs"]
    images: ["https://example.com/image.jpg"]
    dateStart: "2024-01-01"
    featured: true
  }) {
    id
    title
    featured
  }
}
```

#### Créer une compétence
```graphql
mutation {
  createCompetence(input: {
    name: "React"
    level: 5
  }) {
    id
    name
    level
  }
}
```

#### Créer une expérience
```graphql
mutation {
  createExperience(input: {
    title: "Développeur Full Stack"
    company: "Tech Corp"
    startDate: "2024-01-01"
    description: "Développement d'applications web"
    location: "Paris"
  }) {
    id
    title
    company
  }
}
```

#### Créer une technologie
```graphql
mutation {
  createTechnologie(input: {
    name: "React"
    category: "frontend"
    logoUrl: "https://example.com/logo.png"
  }) {
    id
    name
    category
  }
}
```

#### Mettre à jour / Supprimer
```graphql
# Mettre à jour
mutation {
  updateProjet(id: "projet-id", input: {
    title: "Nouveau titre"
  }) {
    id
    title
  }
}

# Supprimer
mutation {
  deleteProjet(id: "projet-id")
}
```

## 🛠️ Scripts Disponibles

- `npm run dev` : Lancer en mode développement
- `npm run build` : Compiler TypeScript
- `npm start` : Lancer en production
- `npm run seed:admin` : Créer un utilisateur admin

## 🔒 Sécurité

- **JWT** : Token d'authentification valide 8h
- **Helmet** : Headers de sécurité HTTP
- **CORS** : Gestion des requêtes cross-origin
- **Rate Limiting** : 100 requêtes par 15 minutes
- **Bcrypt** : Hachage des mots de passe
- **Validation** : Validation des inputs côté serveur

## 📝 Licence

MIT

## 👨‍💻 Auteur

Développé avec ❤️ pour un portfolio personnel moderne et professionnel.

