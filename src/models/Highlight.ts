import mongoose, { Schema, Document } from "mongoose";

export interface IHighlight extends Document {
  image: string;
  title: string;
  subtitle: string;
  order: number;
  isActive: boolean;
  createdAt: Date;
}

const HighlightSchema = new Schema<IHighlight>({
  image: { type: String, required: true },
  title: { type: String, required: true },
  subtitle: { type: String, required: true },
  order: { type: Number, default: 0 },
  isActive: { type: Boolean, default: true },
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.models.Highlight ||
  mongoose.model<IHighlight>("Highlight", HighlightSchema);
