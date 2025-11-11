import Projet, { IProjet } from '../Models/Projet';

export class ProjetRepository {
  async findAll(limit?: number, skip?: number): Promise<IProjet[]> {
    let query = Projet.find().populate('technologies').sort({ createdAt: -1 });
    
    if (skip) {
      query = query.skip(skip);
    }
    if (limit) {
      query = query.limit(limit);
    }
    return query;
  }

  async findById(id: string): Promise<IProjet | null> {
    return Projet.findById(id).populate('technologies');
  }

  async create(projetData: Partial<IProjet>): Promise<IProjet> {
    const projet = new Projet(projetData);
    return projet.save();
  }

  async update(id: string, projetData: Partial<IProjet>): Promise<IProjet | null> {
    return Projet.findByIdAndUpdate(id, projetData, { new: true }).populate('technologies');
  }

  async delete(id: string): Promise<boolean> {
    const result = await Projet.findByIdAndDelete(id);
    return result !== null;
  }
}

export default new ProjetRepository();

