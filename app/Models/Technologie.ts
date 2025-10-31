import mongoose, { Schema, Document } from 'mongoose';

export interface ITechnologie extends Document {
  name: string;
  category: string;
  logoUrl?: string;
  createdAt: Date;
  updatedAt: Date;
}

const TechnologieSchema: Schema = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    category: {
      type: String,
      required: true,
      trim: true,
    },
    logoUrl: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model<ITechnologie>('Technologie', TechnologieSchema);

