import mongoose, { Schema, Document } from "mongoose";

export interface IProject extends Document {
  title: string;
  client: string;
  description: string;
  images: string[];
  industryName: string;
  companyName: string;
  solution: string;
  show_in_home_page: boolean;
  challenges: string[];
}

const ProjectSchema = new Schema<IProject>({
  title: { type: String, required: true },
  client: { type: String, required: true },
  description: { type: String, required: true },
  images: { type: [String], required: true },
  industryName: { type: String, required: true },
  companyName: { type: String, required: true },
  solution: { type: String, required: true },
  show_in_home_page: { type: Boolean, default: false },
  challenges: { type: [String], required: true },
});

export default mongoose.models.Project ||
  mongoose.model<IProject>("Project", ProjectSchema);
