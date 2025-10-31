import Competence, { ICompetence } from '../Models/Competence';

export class CompetenceRepository {
  async findAll(): Promise<ICompetence[]> {
    return Competence.find().sort({ name: 1 });
  }

  async findById(id: string): Promise<ICompetence | null> {
    return Competence.findById(id);
  }

  async create(competenceData: Partial<ICompetence>): Promise<ICompetence> {
    const competence = new Competence(competenceData);
    return competence.save();
  }

  async update(id: string, competenceData: Partial<ICompetence>): Promise<ICompetence | null> {
    return Competence.findByIdAndUpdate(id, competenceData, { new: true });
  }

  async delete(id: string): Promise<boolean> {
    const result = await Competence.findByIdAndDelete(id);
    return result !== null;
  }
}

export default new CompetenceRepository();

