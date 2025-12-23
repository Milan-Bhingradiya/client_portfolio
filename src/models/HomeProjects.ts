import mongoose, { Schema, Document } from "mongoose";

export interface IHomeProjects extends Document {
  project1: string;
  project2: string;
  project3: string;
}

const HomeProjectsSchema = new Schema<IHomeProjects>({
  project1: { type: String, required: true },
  project2: { type: String, required: true },
  project3: { type: String, required: true },
});

export default mongoose.models.HomeProjects || mongoose.model<IHomeProjects>("HomeProjects", HomeProjectsSchema);

