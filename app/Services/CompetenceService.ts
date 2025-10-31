import { ICompetence } from '../Models/Competence';
import competenceRepository from '../Repositories/CompetenceRepository';

export class CompetenceService {
  async getCompetences(): Promise<ICompetence[]> {
    return competenceRepository.findAll();
  }

  async getCompetence(id: string): Promise<ICompetence | null> {
    return competenceRepository.findById(id);
  }

  async createCompetence(input: Partial<ICompetence>): Promise<ICompetence> {
    if (input.level && (input.level < 1 || input.level > 5)) {
      throw new Error('Level must be between 1 and 5');
    }
    return competenceRepository.create(input);
  }

  async updateCompetence(id: string, input: Partial<ICompetence>): Promise<ICompetence | null> {
    if (input.level && (input.level < 1 || input.level > 5)) {
      throw new Error('Level must be between 1 and 5');
    }
    return competenceRepository.update(id, input);
  }

  async deleteCompetence(id: string): Promise<boolean> {
    return competenceRepository.delete(id);
  }
}

export default new CompetenceService();

