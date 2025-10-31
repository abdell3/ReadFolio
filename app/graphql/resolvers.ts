import profilService from '../Services/ProfilService';
import projetService from '../Services/ProjetService';
import competenceService from '../Services/CompetenceService';
import experienceService from '../Services/ExperienceService';
import technologieService from '../Services/TechnologieService';
import authService from '../Services/AuthService';
import { requireAdmin, AuthContext } from '../http/Middlewares/auth.middleware';

export const resolvers = {
  Query: {
    getPortfolio: async () => {
      const [profil, projets, competences, experiences, technologies] = await Promise.all([
        profilService.getProfil(),
        projetService.getProjets(),
        competenceService.getCompetences(),
        experienceService.getExperiences(),
        technologieService.getTechnologies(),
      ]);

      return {
        profil,
        projets,
        competences,
        experiences,
        technologies,
      };
    },

    getProfil: async () => {
      return profilService.getProfil();
    },

    getProjets: async (_: any, { limit, skip }: { limit?: number; skip?: number }) => {
      return projetService.getProjets(limit, skip);
    },

    getCompetences: async () => {
      return competenceService.getCompetences();
    },

    getExperiences: async () => {
      return experienceService.getExperiences();
    },

    getTechnologies: async () => {
      return technologieService.getTechnologies();
    },
  },

  Mutation: {
    login: async (_: any, { username, password }: { username: string; password: string }) => {
      return authService.login(username, password);
    },

    updateProfil: async (_: any, args: any, context: AuthContext) => {
      requireAdmin(context);
      const result = await profilService.updateProfil(args.input);
      if (!result) throw new Error('Failed to update profil');
      return result;
    },

    createProjet: async (_: any, args: any, context: AuthContext) => {
      requireAdmin(context);
      return projetService.createProjet(args.input);
    },

    updateProjet: async (_: any, args: any, context: AuthContext) => {
      requireAdmin(context);
      const result = await projetService.updateProjet(args.id, args.input);
      if (!result) throw new Error('Projet not found');
      return result;
    },

    deleteProjet: async (_: any, { id }: { id: string }, context: AuthContext) => {
      requireAdmin(context);
      return projetService.deleteProjet(id);
    },

    createCompetence: async (_: any, args: any, context: AuthContext) => {
      requireAdmin(context);
      return competenceService.createCompetence(args.input);
    },

    updateCompetence: async (_: any, args: any, context: AuthContext) => {
      requireAdmin(context);
      const result = await competenceService.updateCompetence(args.id, args.input);
      if (!result) throw new Error('Competence not found');
      return result;
    },

    deleteCompetence: async (_: any, { id }: { id: string }, context: AuthContext) => {
      requireAdmin(context);
      return competenceService.deleteCompetence(id);
    },

    createExperience: async (_: any, args: any, context: AuthContext) => {
      requireAdmin(context);
      return experienceService.createExperience(args.input);
    },

    updateExperience: async (_: any, args: any, context: AuthContext) => {
      requireAdmin(context);
      const result = await experienceService.updateExperience(args.id, args.input);
      if (!result) throw new Error('Experience not found');
      return result;
    },

    deleteExperience: async (_: any, { id }: { id: string }, context: AuthContext) => {
      requireAdmin(context);
      return experienceService.deleteExperience(id);
    },

    createTechnologie: async (_: any, args: any, context: AuthContext) => {
      requireAdmin(context);
      return technologieService.createTechnologie(args.input);
    },

    updateTechnologie: async (_: any, args: any, context: AuthContext) => {
      requireAdmin(context);
      const result = await technologieService.updateTechnologie(args.id, args.input);
      if (!result) throw new Error('Technologie not found');
      return result;
    },

    deleteTechnologie: async (_: any, { id }: { id: string }, context: AuthContext) => {
      requireAdmin(context);
      return technologieService.deleteTechnologie(id);
    },
  },

  Date: {
    parseValue: (value: any) => new Date(value),
    serialize: (value: any) => (value instanceof Date ? value.toISOString() : null),
  },
};

