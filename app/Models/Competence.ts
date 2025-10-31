import mongoose, { Schema, Document } from 'mongoose';

export interface ICompetence extends Document {
  name: string;
  level: number;
  createdAt: Date;
  updatedAt: Date;
}

const CompetenceSchema: Schema = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    level: {
      type: Number,
      required: true,
      min: 1,
      max: 5,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model<ICompetence>('Competence', CompetenceSchema);

