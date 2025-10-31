import Technologie, { ITechnologie } from '../Models/Technologie';

export class TechnologieRepository {
  async findAll(): Promise<ITechnologie[]> {
    return Technologie.find().sort({ category: 1, name: 1 });
  }

  async findById(id: string): Promise<ITechnologie | null> {
    return Technologie.findById(id);
  }

  async create(technologieData: Partial<ITechnologie>): Promise<ITechnologie> {
    const technologie = new Technologie(technologieData);
    return technologie.save();
  }

  async update(id: string, technologieData: Partial<ITechnologie>): Promise<ITechnologie | null> {
    return Technologie.findByIdAndUpdate(id, technologieData, { new: true });
  }

  async delete(id: string): Promise<boolean> {
    const result = await Technologie.findByIdAndDelete(id);
    return result !== null;
  }
}

export default new TechnologieRepository();

