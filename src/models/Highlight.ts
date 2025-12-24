import mongoose, { Schema, Document } from "mongoose";

export interface IHighlight extends Document {
  imageDesktop: string; // Horizontal/Landscape for laptop
  imageMobile: string; // Vertical/Portrait for mobile
  title: string;
  subtitle: string;
  order: number;
  isActive: boolean;
  createdAt: Date;
}

const HighlightSchema = new Schema<IHighlight>({
  imageDesktop: { type: String, required: true },
  imageMobile: { type: String, required: true },
  title: { type: String, required: true },
  subtitle: { type: String, required: true },
  order: { type: Number, default: 0 },
  isActive: { type: Boolean, default: true },
  createdAt: { type: Date, default: Date.now },
});

// Delete the cached model if it exists to pick up schema changes
if (mongoose.models.Highlight) {
  delete mongoose.models.Highlight;
}

export default mongoose.model<IHighlight>("Highlight", HighlightSchema);
