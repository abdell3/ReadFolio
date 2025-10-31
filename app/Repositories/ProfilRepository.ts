import Profil, { IProfil } from '../Models/Profil';

export class ProfilRepository {
  async find(): Promise<IProfil | null> {
    return Profil.findOne();
  }

  async create(profilData: Partial<IProfil>): Promise<IProfil> {
    const profil = new Profil(profilData);
    return profil.save();
  }

  async update(id: string, profilData: Partial<IProfil>): Promise<IProfil | null> {
    return Profil.findByIdAndUpdate(id, profilData, { new: true });
  }
}

export default new ProfilRepository();

