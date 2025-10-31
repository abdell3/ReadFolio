import { IProjet } from '../Models/Projet';
import projetRepository from '../Repositories/ProjetRepository';

export class ProjetService {
  async getProjets(limit?: number, skip?: number): Promise<IProjet[]> {
    return projetRepository.findAll(limit, skip);
  }

  async getProjet(id: string): Promise<IProjet | null> {
    return projetRepository.findById(id);
  }

  async createProjet(input: Partial<IProjet>): Promise<IProjet> {
    return projetRepository.create(input);
  }

  async updateProjet(id: string, input: Partial<IProjet>): Promise<IProjet | null> {
    return projetRepository.update(id, input);
  }

  async deleteProjet(id: string): Promise<boolean> {
    return projetRepository.delete(id);
  }
}

export default new ProjetService();

