import { IExperience } from '../models/Experience';
import experienceRepository from '../repositories/ExperienceRepository';

export class ExperienceService {
  async getExperiences(): Promise<IExperience[]> {
    return experienceRepository.findAll();
  }

  async getExperience(id: string): Promise<IExperience | null> {
    return experienceRepository.findById(id);
  }

  async createExperience(input: Partial<IExperience>): Promise<IExperience> {
    return experienceRepository.create(input);
  }

  async updateExperience(id: string, input: Partial<IExperience>): Promise<IExperience | null> {
    return experienceRepository.update(id, input);
  }

  async deleteExperience(id: string): Promise<boolean> {
    return experienceRepository.delete(id);
  }
}

export default new ExperienceService();

