import { ITechnologie } from '../models/Technologie';
import technologieRepository from '../repositories/TechnologieRepository';

export class TechnologieService {
  async getTechnologies(): Promise<ITechnologie[]> {
    return technologieRepository.findAll();
  }

  async getTechnologie(id: string): Promise<ITechnologie | null> {
    return technologieRepository.findById(id);
  }

  async createTechnologie(input: Partial<ITechnologie>): Promise<ITechnologie> {
    return technologieRepository.create(input);
  }

  async updateTechnologie(id: string, input: Partial<ITechnologie>): Promise<ITechnologie | null> {
    return technologieRepository.update(id, input);
  }

  async deleteTechnologie(id: string): Promise<boolean> {
    return technologieRepository.delete(id);
  }
}

export default new TechnologieService();

