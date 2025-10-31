import { IProfil } from '../Models/Profil';
import profilRepository from '../Repositories/ProfilRepository';

export class ProfilService {
  async getProfil(): Promise<IProfil | null> {
    return profilRepository.find();
  }

  async updateProfil(input: Partial<IProfil>): Promise<IProfil | null> {
    const existing = await profilRepository.find();
    
    if (!existing) {
      return profilRepository.create(input);
    }

    return profilRepository.update((existing._id as any).toString(), input);
  }
}

export default new ProfilService();

