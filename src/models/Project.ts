import mongoose, { Schema, Document } from "mongoose";

export interface IProject extends Document {
  title: string;
  client: string;
  description: string;
  thumbnail: string; // Card thumbnail (4:5, 400x500) - for work page cards
  heroImage: string; // Main horizontal image (16:9, 1920x1080)
  squareImages: string[]; // Exactly 2 square images (1:1, 800x800)
  galleryImages: string[]; // Additional gallery images
  industryName: string;
  companyName: string;
  solution: string;
  show_in_home_page: boolean;
  challenges: string[];
  createdAt: Date;
  updatedAt: Date;
}

const ProjectSchema = new Schema<IProject>(
  {
    title: { type: String, required: true },
    client: { type: String, required: true },
    description: { type: String, required: true },
    thumbnail: { type: String, required: true }, // Card thumbnail (4:5, 400x500)
    heroImage: { type: String, required: true }, // Main banner (16:9, 1920x1080)
    squareImages: { type: [String], required: true }, // Exactly 2 square images
    galleryImages: { type: [String], default: [] },
    industryName: { type: String, required: true },
    companyName: { type: String, required: true },
    solution: { type: String, required: true },
    show_in_home_page: { type: Boolean, default: false },
    challenges: { type: [String], required: true },
  },
  { timestamps: true }
);

export default mongoose.models.Project ||
  mongoose.model<IProject>("Project", ProjectSchema);
