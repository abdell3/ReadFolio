import Experience, { IExperience } from '../Models/Experience';

export class ExperienceRepository {
  async findAll(): Promise<IExperience[]> {
    return Experience.find().sort({ startDate: -1 });
  }

  async findById(id: string): Promise<IExperience | null> {
    return Experience.findById(id);
  }

  async create(experienceData: Partial<IExperience>): Promise<IExperience> {
    const experience = new Experience(experienceData);
    return experience.save();
  }

  async update(id: string, experienceData: Partial<IExperience>): Promise<IExperience | null> {
    return Experience.findByIdAndUpdate(id, experienceData, { new: true });
  }

  async delete(id: string): Promise<boolean> {
    const result = await Experience.findByIdAndDelete(id);
    return result !== null;
  }
}

export default new ExperienceRepository();

