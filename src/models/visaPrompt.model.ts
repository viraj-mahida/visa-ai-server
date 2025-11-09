import type { InferSchemaType, Model } from "mongoose";
import mongoose, { model, Schema } from "mongoose";

const VisaPromptSchema = new Schema({
  country: {
    type: String,
    required: true
  },
  visa: {
    type: String,
    required: true
  },
  prompt: {
    type: String,
    required: true
  }
}, { timestamps: true })

type IVisaPrompt = InferSchemaType<typeof VisaPromptSchema>;

export const VisaPrompt = (mongoose.models.VisaPrompt ?? model<IVisaPrompt>("VisaPrompt", VisaPromptSchema)) as Model<IVisaPrompt>;