import mongoose, { Schema, Document } from "mongoose";

export interface IMessage extends Document {
  fullName: string;
  companyName: string;
  phone?: string;
  email: string;
  message: string;
  source: "home" | "contact"; // Track where the message came from
  createdAt: Date;
}

const MessageSchema = new Schema<IMessage>(
  {
    fullName: { type: String, required: true },
    companyName: { type: String, required: true },
    phone: { type: String },
    email: { type: String, required: true },
    message: { type: String, required: true },
    source: { type: String, enum: ["home", "contact"], default: "contact" },
  },
  { timestamps: true }
);

export default mongoose.models.Message ||
  mongoose.model<IMessage>("Message", MessageSchema);
