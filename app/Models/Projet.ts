import mongoose, { Schema, Document } from 'mongoose';

export interface IProjet extends Document {
  title: string;
  summary: string;
  description: string;
  repoUrl?: string;
  liveUrl?: string;
  category: string;
  technologies: mongoose.Types.ObjectId[];
  tags: string[];
  images: string[];
  dateStart: Date;
  dateEnd?: Date;
  featured: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const ProjetSchema: Schema = new Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    summary: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    repoUrl: {
      type: String,
    },
    liveUrl: {
      type: String,
    },
    category: {
      type: String,
      required: true,
      trim: true,
    },
    technologies: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Technologie',
      },
    ],
    tags: [String],
    images: [String],
    dateStart: {
      type: Date,
      required: true,
    },
    dateEnd: {
      type: Date,
    },
    featured: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model<IProjet>('Projet', ProjetSchema);

