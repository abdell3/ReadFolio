import { gql } from 'apollo-server-express';

export const typeDefs = gql`
  scalar Date

  enum Role {
    ADMIN
    VISITOR
  }

  type User {
    id: ID!
    username: String!
    role: Role!
    createdAt: Date!
    updatedAt: Date!
  }

  type SocialLink {
    platform: String!
    url: String!
  }

  input SocialLinkInput {
    platform: String!
    url: String!
  }

  type Contact {
    email: String!
    phone: String
    location: String
  }

  input ContactInput {
    email: String!
    phone: String
    location: String
  }

  type Profil {
    id: ID!
    fullname: String!
    title: String!
    bio: String!
    avatarUrl: String
    socialLinks: [SocialLink!]!
    contact: Contact!
    createdAt: Date!
    updatedAt: Date!
  }

  type Projet {
    id: ID!
    title: String!
    summary: String!
    description: String!
    repoUrl: String
    liveUrl: String
    category: String!
    technologies: [Technologie!]!
    tags: [String!]!
    images: [String!]!
    dateStart: Date!
    dateEnd: Date
    featured: Boolean!
    createdAt: Date!
    updatedAt: Date!
  }

  type Competence {
    id: ID!
    name: String!
    level: Int!
    createdAt: Date!
    updatedAt: Date!
  }

  type Experience {
    id: ID!
    title: String!
    company: String!
    startDate: Date!
    endDate: Date
    description: String!
    location: String
    createdAt: Date!
    updatedAt: Date!
  }

  type Technologie {
    id: ID!
    name: String!
    category: String!
    logoUrl: String
    createdAt: Date!
    updatedAt: Date!
  }

  type Portfolio {
    profil: Profil
    projets: [Projet!]!
    competences: [Competence!]!
    experiences: [Experience!]!
    technologies: [Technologie!]!
  }

  type AuthPayload {
    token: String!
    userId: ID!
    role: String!
  }

  input UpdateProfilInput {
    fullname: String
    title: String
    bio: String
    avatarUrl: String
    socialLinks: [SocialLinkInput!]
    contact: ContactInput
  }

  input CreateProjetInput {
    title: String!
    summary: String!
    description: String!
    repoUrl: String
    liveUrl: String
    category: String!
    technologies: [ID!]!
    tags: [String!]!
    images: [String!]!
    dateStart: Date!
    dateEnd: Date
    featured: Boolean
  }

  input UpdateProjetInput {
    title: String
    summary: String
    description: String
    repoUrl: String
    liveUrl: String
    category: String
    technologies: [ID!]
    tags: [String!]
    images: [String!]
    dateStart: Date
    dateEnd: Date
    featured: Boolean
  }

  input CreateCompetenceInput {
    name: String!
    level: Int!
  }

  input UpdateCompetenceInput {
    name: String
    level: Int
  }

  input CreateExperienceInput {
    title: String!
    company: String!
    startDate: Date!
    endDate: Date
    description: String!
    location: String
  }

  input UpdateExperienceInput {
    title: String
    company: String
    startDate: Date
    endDate: Date
    description: String
    location: String
  }

  input CreateTechnologieInput {
    name: String!
    category: String!
    logoUrl: String
  }

  input UpdateTechnologieInput {
    name: String
    category: String
    logoUrl: String
  }

  type Query {
    getPortfolio: Portfolio!
    getProfil: Profil
    getProjets(limit: Int, skip: Int): [Projet!]!
    getCompetences: [Competence!]!
    getExperiences: [Experience!]!
    getTechnologies: [Technologie!]!
  }

  type Mutation {
    login(username: String!, password: String!): AuthPayload!
    updateProfil(input: UpdateProfilInput!): Profil!
    createProjet(input: CreateProjetInput!): Projet!
    updateProjet(id: ID!, input: UpdateProjetInput!): Projet!
    deleteProjet(id: ID!): Boolean!
    createCompetence(input: CreateCompetenceInput!): Competence!
    updateCompetence(id: ID!, input: UpdateCompetenceInput!): Competence!
    deleteCompetence(id: ID!): Boolean!
    createExperience(input: CreateExperienceInput!): Experience!
    updateExperience(id: ID!, input: UpdateExperienceInput!): Experience!
    deleteExperience(id: ID!): Boolean!
    createTechnologie(input: CreateTechnologieInput!): Technologie!
    updateTechnologie(id: ID!, input: UpdateTechnologieInput!): Technologie!
    deleteTechnologie(id: ID!): Boolean!
  }
`;

