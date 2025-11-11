import mongoose, { Schema, Document } from 'mongoose';

export interface ISocialLink {
  platform: string;
  url: string;
}

export interface IContact {
  email: string;
  phone?: string;
  location?: string;
}

export interface IProfil extends Document {
  fullname: string;
  title: string;
  bio: string;
  avatarUrl?: string;
  socialLinks: ISocialLink[];
  contact: IContact;
  createdAt: Date;
  updatedAt: Date;
}

const SocialLinkSchema: Schema = new Schema({
  platform: { 
    type: String, 
    required: true 
  },
  url: { 
    type: String, 
    required: true 
  },
});

const ContactSchema: Schema = new Schema({
  email: { 
    type: String, 
    required: true 
  },
  phone: { 
    type: String 
  },
  location: { 
    type: String 
  },
});

const ProfilSchema: Schema = new Schema(
  {
    fullname: {
      type: String,
      required: true,
      trim: true,
    },
    title: {
      type: String,
      required: true,
      trim: true,
    },
    bio: {
      type: String,
      required: true,
    },
    avatarUrl: {
      type: String,
    },
    socialLinks: [SocialLinkSchema],
    contact: {
      type: ContactSchema,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model<IProfil>('Profil', ProfilSchema);

