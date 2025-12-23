import mongoose, { Schema, Document } from "mongoose";

export interface IMessage extends Document {
  title: string;
  description: string;
  email: string;
  createdAt: Date;
}

const MessageSchema = new Schema<IMessage>({
  title: { type: String, required: true },
  description: { type: String, required: true },
  email: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.models.Message || mongoose.model<IMessage>("Message", MessageSchema);

